import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Bike, 
  Store, 
  Utensils, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  Banknote, 
  ArrowRight, 
  Phone, 
  MapPin, 
  AlertCircle,
  Loader2,
  Sparkles
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { RESTAURANT_CONFIG } from "../config/restaurant";
import { createOrder, recordPayment } from "../services/firebase";
import { processPayment } from "../services/paymentService";

export default function OrderPage() {
  const { 
    items, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    orderType, 
    setOrderType, 
    subtotal, 
    deliveryFee, 
    packagingCharge, 
    taxes, 
    total,
    itemCount
  } = useCart();

  // Customer form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    landmark: "",
    notes: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("razorpay"); // 'razorpay' | 'cod'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Form validations
    if (!formData.name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number for order updates.");
      return;
    }
    if (orderType === "delivery" && !formData.address.trim()) {
      setErrorMessage("Please provide your delivery address in Alwal / Secunderabad.");
      return;
    }

    if (subtotal < RESTAURANT_CONFIG.orderSettings.minimumOrderValue) {
      setErrorMessage(`Minimum order value is ₹${RESTAURANT_CONFIG.orderSettings.minimumOrderValue}. Please add more items.`);
      return;
    }

    setIsSubmitting(true);

    try {
      const generatedOrderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;

      // 1. Process payment via service (Razorpay test mode / COD)
      const paymentResult = await processPayment({
        method: paymentMethod,
        amount: total,
        orderId: generatedOrderId,
        customer: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
        },
      });

      if (!paymentResult.success) {
        throw new Error("Payment was not completed. Please try again.");
      }

      // 2. Prepare order record
      const fullOrder = {
        id: generatedOrderId,
        orderType,
        customer: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email || "N/A",
          address: orderType === "delivery" ? `${formData.address} ${formData.landmark ? `(Landmark: ${formData.landmark})` : ""}` : "Pickup / Dine-in at Restaurant",
          notes: formData.notes || "None",
        },
        items: items.map((i) => ({
          id: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          isVeg: i.isVeg,
        })),
        subtotal,
        deliveryFee,
        packagingCharge,
        taxes,
        total,
        status: "New",
        paymentMethod: paymentResult.method,
        paymentStatus: paymentResult.status,
        paymentId: paymentResult.paymentId,
      };

      // 3. Save Order and Payment to Firestore (with local fallback)
      await createOrder(fullOrder);
      await recordPayment({
        id: paymentResult.paymentId,
        orderId: generatedOrderId,
        amount: total,
        method: paymentResult.method,
        status: paymentResult.status,
        customerName: formData.name,
        customerPhone: formData.phone,
      });

      // 4. Set confirmation and clear cart
      setConfirmedOrder(fullOrder);
      clearCart();
    } catch (err) {
      console.error("Checkout error:", err);
      setErrorMessage(err.message || "Failed to process your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // -------------------------------------------------------------
  // Order Confirmation View
  // -------------------------------------------------------------
  if (confirmedOrder) {
    return (
      <div className="py-12 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-night-900 border border-brand-500/30 p-8 sm:p-10 shadow-2xl space-y-8">
          
          {/* Header Badge */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-glow">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-400 block">
              Order Confirmed & Received!
            </span>
            <h1 className="font-serif text-3xl font-extrabold text-white">
              Thank You, {confirmedOrder.customer.name}!
            </h1>
            <p className="text-slate-300 text-sm max-w-md mx-auto">
              Our kitchen has received your order and our chefs are getting it ready fresh.
            </p>
          </div>

          {/* Key Order Meta Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-night-850 border border-slate-800 text-center">
            <div>
              <span className="text-[11px] text-slate-400 block">Order ID</span>
              <span className="font-mono text-sm font-bold text-brand-400">{confirmedOrder.id}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Order Type</span>
              <span className="text-sm font-bold text-white capitalize">{confirmedOrder.orderType}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Payment</span>
              <span className="text-xs font-semibold text-emerald-400">{confirmedOrder.paymentStatus}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Est. Time</span>
              <span className="text-sm font-bold text-white">{RESTAURANT_CONFIG.orderSettings.estimatedDeliveryMins} mins</span>
            </div>
          </div>

          {/* Itemized Receipt */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-bold text-white">Ordered Items</h3>
            <div className="divide-y divide-slate-800 rounded-2xl bg-night-850 border border-slate-800 p-4">
              {confirmedOrder.items.map((item, idx) => (
                <div key={idx} className="py-2.5 flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-xs font-mono">{item.quantity}x</span>
                    <span className="text-white font-medium">{item.name}</span>
                  </div>
                  <span className="text-slate-300 font-semibold">₹{item.price * item.quantity}</span>
                </div>
              ))}

              <div className="pt-3 mt-2 space-y-1.5 text-xs text-slate-400 border-t border-slate-800">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{confirmedOrder.subtotal}</span>
                </div>
                {confirmedOrder.deliveryFee > 0 && (
                  <div className="flex justify-between">
                    <span>Delivery Charge</span>
                    <span>₹{confirmedOrder.deliveryFee}</span>
                  </div>
                )}
                {confirmedOrder.packagingCharge > 0 && (
                  <div className="flex justify-between">
                    <span>Packaging Charge</span>
                    <span>₹{confirmedOrder.packagingCharge}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span>₹{confirmedOrder.taxes}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-slate-700">
                  <span>Grand Total</span>
                  <span className="text-brand-400">₹{confirmedOrder.total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={`tel:${RESTAURANT_CONFIG.contact.primaryPhoneRaw}`}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-night-800 hover:bg-night-700 text-brand-400 font-semibold text-sm border border-brand-500/30 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call Restaurant for Status</span>
            </a>
            <Link
              to="/menu"
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-500 to-amber-500 text-night-950 font-bold text-sm shadow-glow transition-all"
            >
              <span>Explore More Food</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Empty Cart View
  // -------------------------------------------------------------
  if (items.length === 0) {
    return (
      <div className="py-20 max-w-lg mx-auto px-4 text-center space-y-5">
        <div className="w-20 h-20 rounded-full bg-night-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-white">Your Food Cart is Empty</h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          Looks like you haven't added any of Fullmoon’s famous Apollo fish, biryanis, or tandoori kebabs yet.
        </p>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-400 to-brand-500 text-night-950 font-bold text-sm shadow-glow"
        >
          <Utensils className="w-4 h-4" />
          <span>Browse Full Menu</span>
        </Link>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Active Checkout Form & Cart Review
  // -------------------------------------------------------------
  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="mb-8 space-y-1">
        <span className="text-xs font-bold text-brand-400 uppercase tracking-widest block">
          Checkout & Confirmation
        </span>
        <h1 className="font-serif text-3xl font-extrabold text-white">
          Complete Your Order
        </h1>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Order Type & Customer Details */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. Order Type Selection */}
          <div className="rounded-3xl bg-night-900 border border-slate-800 p-6 space-y-4">
            <h2 className="font-serif text-lg font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 text-xs flex items-center justify-center font-bold">
                1
              </span>
              <span>How would you like to receive your food?</span>
            </h2>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setOrderType("delivery")}
                className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                  orderType === "delivery"
                    ? "bg-brand-500/15 border-brand-500 text-brand-300 shadow-glow"
                    : "bg-night-850 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <Bike className="w-5 h-5" />
                <span className="text-xs font-bold">Home Delivery</span>
              </button>

              <button
                type="button"
                onClick={() => setOrderType("takeaway")}
                className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                  orderType === "takeaway"
                    ? "bg-brand-500/15 border-brand-500 text-brand-300 shadow-glow"
                    : "bg-night-850 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <Store className="w-5 h-5" />
                <span className="text-xs font-bold">Takeaway Pickup</span>
              </button>

              <button
                type="button"
                onClick={() => setOrderType("dine-in")}
                className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                  orderType === "dine-in"
                    ? "bg-brand-500/15 border-brand-500 text-brand-300 shadow-glow"
                    : "bg-night-850 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <Utensils className="w-5 h-5" />
                <span className="text-xs font-bold">Dine-in Order</span>
              </button>
            </div>
          </div>

          {/* 2. Customer Details Form */}
          <form id="checkout-form" onSubmit={handleCheckout} className="rounded-3xl bg-night-900 border border-slate-800 p-6 space-y-4">
            <h2 className="font-serif text-lg font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 text-xs flex items-center justify-center font-bold">
                2
              </span>
              <span>Customer Information</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-night-800 text-white placeholder-slate-500 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Mobile Phone (10 Digits) *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="e.g. 98490 12345"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-night-800 text-white placeholder-slate-500 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Email Address (Optional, for receipt)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-night-800 text-white placeholder-slate-500 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none"
              />
            </div>

            {orderType === "delivery" && (
              <>
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Complete Delivery Address in Alwal / Secunderabad *</label>
                  <textarea
                    name="address"
                    required
                    rows="2"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="House/Flat No., Building/Apartment, Colony/Street..."
                    className="w-full px-3.5 py-2 rounded-xl bg-night-800 text-white placeholder-slate-500 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Nearest Landmark (Optional)</label>
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleInputChange}
                    placeholder="e.g. Near Meenakshi Estate Gate / Loyola Academy"
                    className="w-full px-3.5 py-2 rounded-xl bg-night-800 text-white placeholder-slate-500 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </>
            )}

            {orderType === "takeaway" && (
              <div className="p-3.5 rounded-xl bg-night-850 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Pickup Location:</p>
                  <p>{RESTAURANT_CONFIG.address.fullAddress}</p>
                  <p className="text-brand-400 font-medium mt-1">Ready for pickup in ~25-30 minutes.</p>
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Special Cooking / Delivery Notes</label>
              <input
                type="text"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="e.g. Extra spicy, no onions, extra green chutney..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-night-800 text-white placeholder-slate-500 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none"
              />
            </div>
          </form>

          {/* 3. Payment Method Selection */}
          <div className="rounded-3xl bg-night-900 border border-slate-800 p-6 space-y-4">
            <h2 className="font-serif text-lg font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 text-xs flex items-center justify-center font-bold">
                3
              </span>
              <span>Payment Option</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                onClick={() => setPaymentMethod("razorpay")}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                  paymentMethod === "razorpay"
                    ? "bg-brand-500/15 border-brand-500 shadow-glow"
                    : "bg-night-850 border-slate-800"
                }`}
              >
                <div className="p-2 rounded-xl bg-brand-500/20 text-brand-400 mt-0.5">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Razorpay (UPI / Cards)</p>
                  <p className="text-xs text-slate-400 mt-0.5">Google Pay, PhonePe, Paytm, Cards, NetBanking</p>
                  <span className="inline-block mt-2 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                    Fast & Secure (Test Mode)
                  </span>
                </div>
              </label>

              <label
                onClick={() => setPaymentMethod("cod")}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                  paymentMethod === "cod"
                    ? "bg-brand-500/15 border-brand-500 shadow-glow"
                    : "bg-night-850 border-slate-800"
                }`}
              >
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 mt-0.5">
                  <Banknote className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">
                    {orderType === "delivery" ? "Cash on Delivery" : "Pay at Restaurant Counter"}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">Pay via Cash or UPI when your food arrives.</p>
                </div>
              </label>
            </div>
          </div>

        </div>

        {/* Right Column: Order Summary & Item Review */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-night-900 border border-slate-800 p-6 space-y-5 sticky top-28 shadow-xl">
            
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-brand-400" />
                <span>Order Summary ({itemCount} items)</span>
              </h3>
              <button
                onClick={clearCart}
                className="text-xs text-slate-400 hover:text-red-400 transition-colors"
              >
                Clear Cart
              </button>
            </div>

            {/* Cart Items Stepper List */}
            <div className="divide-y divide-slate-800 max-h-72 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${item.isVeg ? "bg-emerald-500" : "bg-red-500"}`} />
                    <div>
                      <p className="text-sm font-semibold text-white leading-tight">{item.name}</p>
                      <p className="text-xs text-slate-400">₹{item.price} each</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 bg-night-800 border border-slate-700 rounded-lg px-2 py-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="text-brand-400 hover:text-white p-0.5"
                        aria-label="Decrease"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="text-brand-400 hover:text-white p-0.5"
                        aria-label="Increase"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="text-sm font-bold text-white min-w-[3.5rem] text-right">
                      ₹{item.price * item.quantity}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-500 hover:text-red-400 p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 pt-3 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-white">₹{subtotal}</span>
              </div>

              {orderType === "delivery" && (
                <div className="flex justify-between">
                  <span>Delivery Partner Fee</span>
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-400 font-semibold">FREE (Above ₹500)</span>
                  ) : (
                    <span>₹{deliveryFee}</span>
                  )}
                </div>
              )}

              {packagingCharge > 0 && (
                <div className="flex justify-between">
                  <span>Hygienic Packaging</span>
                  <span>₹{packagingCharge}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Restaurant GST (5%)</span>
                <span>₹{taxes}</span>
              </div>

              <div className="flex justify-between text-base font-extrabold text-white pt-3 border-t border-slate-700">
                <span>Grand Total</span>
                <span className="text-brand-400 text-lg">₹{total}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              form="checkout-form"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-400 to-brand-500 hover:from-brand-300 hover:to-brand-400 text-night-950 font-extrabold text-base shadow-glow flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing Order...</span>
                </>
              ) : (
                <>
                  <span>Place Order • ₹{total}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <p className="text-[11px] text-slate-500 text-center">
              By placing your order, you agree to Fullmoon’s dining & delivery terms.
            </p>

          </div>
        </div>

      </div>

    </div>
  );
}
