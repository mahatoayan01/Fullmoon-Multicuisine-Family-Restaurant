import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, ShoppingBag, MessageCircle, Utensils } from "lucide-react";
import { useCart } from "../context/CartContext";
import { RESTAURANT_CONFIG } from "../config/restaurant";

export default function StickyMobileBar() {
  const { itemCount, subtotal } = useCart();
  const location = useLocation();

  // Hide on order confirmation and dashboard pages if needed, but show on general browsing
  if (location.pathname.startsWith("/owner")) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-night-950/95 backdrop-blur-lg border-t border-brand-500/20 px-3 py-2.5 shadow-[0_-5px_20px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        
        {/* Quick Call Button */}
        <a
          href={`tel:${RESTAURANT_CONFIG.contact.primaryPhoneRaw}`}
          aria-label="Call Restaurant"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-night-800 text-slate-100 font-semibold text-xs border border-slate-700/80 active:scale-95 transition-transform"
        >
          <Phone className="w-3.5 h-3.5 text-brand-400" />
          <span>Call Now</span>
        </a>

        {/* WhatsApp Quick Message */}
        <a
          href={RESTAURANT_CONFIG.socials.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Message"
          className="flex items-center justify-center p-2.5 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 active:scale-95 transition-transform"
        >
          <MessageCircle className="w-4 h-4" />
        </a>

        {/* Order Online / Cart CTA */}
        <Link
          to={itemCount > 0 ? "/order" : "/menu"}
          className="flex-[1.6] flex items-center justify-between py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-400 to-brand-500 text-night-950 font-bold text-xs shadow-glow active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-1.5">
            {itemCount > 0 ? (
              <ShoppingBag className="w-4 h-4" />
            ) : (
              <Utensils className="w-4 h-4" />
            )}
            <span>{itemCount > 0 ? "View Cart" : "Order Online"}</span>
          </div>

          {itemCount > 0 && (
            <div className="flex items-center gap-1.5 bg-night-950/20 px-2 py-0.5 rounded-lg text-[11px]">
              <span>{itemCount} item{itemCount > 1 ? "s" : ""}</span>
              <span>•</span>
              <span>₹{subtotal}</span>
            </div>
          )}
        </Link>

      </div>
    </div>
  );
}
