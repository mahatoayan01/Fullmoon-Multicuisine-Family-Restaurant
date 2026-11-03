import React, { createContext, useContext, useState, useEffect } from "react";
import { RESTAURANT_CONFIG } from "../config/restaurant";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "fullmoon_cart_items_v1";
const ORDER_TYPE_KEY = "fullmoon_cart_order_type_v1";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orderType, setOrderType] = useState(() => {
    try {
      return localStorage.getItem(ORDER_TYPE_KEY) || "delivery";
    } catch {
      return "delivery";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDER_TYPE_KEY, orderType);
    } catch (e) {
      console.error("Failed to save order type to localStorage", e);
    }
  }, [orderType]);

  const addToCart = (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          isVeg: product.isVeg,
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  // Delivery fee logic
  const isDelivery = orderType === "delivery";
  const deliveryFee =
    isDelivery && subtotal > 0 && subtotal < RESTAURANT_CONFIG.orderSettings.freeDeliveryThreshold
      ? RESTAURANT_CONFIG.orderSettings.deliveryFee
      : 0;

  // Packaging charge (applicable for delivery and takeaway)
  const packagingCharge =
    orderType !== "dine-in" && subtotal > 0
      ? RESTAURANT_CONFIG.orderSettings.packagingCharge
      : 0;

  // 5% GST
  const taxes = subtotal > 0 ? Math.round(subtotal * 0.05 * 100) / 100 : 0;

  const total = Math.round((subtotal + deliveryFee + packagingCharge + taxes) * 100) / 100;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        orderType,
        setOrderType,
        subtotal,
        deliveryFee,
        packagingCharge,
        taxes,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
