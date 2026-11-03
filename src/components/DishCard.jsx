import React from "react";
import { Plus, Minus, Flame, Sparkles } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function DishCard({ dish }) {
  const { items, addToCart, updateQuantity } = useCart();
  const cartItem = items.find((i) => i.id === dish.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="group rounded-2xl bg-night-850/90 border border-slate-800/80 hover:border-brand-500/40 p-4 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(245,158,11,0.08)] flex flex-col justify-between">
      <div>
        {/* Image & Badges */}
        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-night-900 mb-3.5">
          <img
            src={dish.imageUrl}
            alt={dish.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night-950/80 via-transparent to-transparent opacity-60" />

          {/* Veg / Non-Veg Icon */}
          <div className="absolute top-2.5 left-2.5 z-10 bg-night-950/85 backdrop-blur-sm p-1 rounded-md border border-white/10 flex items-center justify-center">
            {dish.isVeg ? (
              <span className="w-3.5 h-3.5 rounded-sm border-2 border-emerald-500 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </span>
            ) : (
              <span className="w-3.5 h-3.5 rounded-sm border-2 border-red-500 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              </span>
            )}
          </div>

          {/* Signature / Bestseller Badge */}
          {dish.isSignature ? (
            <div className="absolute top-2.5 right-2.5 z-10 bg-gradient-to-r from-amber-500 to-brand-600 text-night-950 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              <span>Fullmoon Special</span>
            </div>
          ) : dish.isBestseller ? (
            <div className="absolute top-2.5 right-2.5 z-10 bg-night-950/90 text-brand-400 border border-brand-500/30 text-[10px] font-semibold px-2 py-0.5 rounded-full">
              Bestseller
            </div>
          ) : null}

          {/* Spice Rating */}
          {dish.spiceLevel > 0 && (
            <div className="absolute bottom-2 left-2.5 flex items-center gap-0.5 bg-night-950/80 px-1.5 py-0.5 rounded text-[10px] text-amber-400">
              {Array.from({ length: dish.spiceLevel }).map((_, i) => (
                <Flame key={i} className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
              ))}
            </div>
          )}
        </div>

        {/* Dish Info */}
        <div className="space-y-1 mb-3">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-serif text-base font-semibold text-white group-hover:text-brand-300 transition-colors line-clamp-1">
              {dish.name}
            </h3>
          </div>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {dish.description}
          </p>
        </div>
      </div>

      {/* Price & Action Button */}
      <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
        <div className="text-base font-bold text-white flex items-baseline gap-0.5">
          <span className="text-xs text-brand-400 font-normal">₹</span>
          <span>{dish.price}</span>
        </div>

        {quantity > 0 ? (
          <div className="flex items-center gap-2 bg-night-800 border border-brand-500/40 rounded-xl px-2 py-1 shadow-glow">
            <button
              onClick={() => updateQuantity(dish.id, -1)}
              className="p-1 rounded-lg hover:bg-night-700 text-brand-400 active:scale-90 transition-transform"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-bold text-white min-w-[1rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(dish.id, 1)}
              className="p-1 rounded-lg hover:bg-night-700 text-brand-400 active:scale-90 transition-transform"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => addToCart(dish, 1)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-night-800 hover:bg-brand-500 text-slate-200 hover:text-night-950 border border-slate-700/60 hover:border-brand-500 text-xs font-semibold transition-all transform active:scale-95 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        )}
      </div>
    </div>
  );
}

