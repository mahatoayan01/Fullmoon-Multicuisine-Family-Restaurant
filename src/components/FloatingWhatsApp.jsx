import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { RESTAURANT_CONFIG } from "../config/restaurant";

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-20 md:bottom-8 right-5 z-40 flex items-end gap-2 group">
      {/* Prefilled prompt badge */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-night-900/95 text-slate-100 text-xs py-2 px-3.5 rounded-xl border border-brand-500/30 shadow-xl backdrop-blur-md animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Chat with us on WhatsApp!</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowTooltip(false);
            }}
            className="text-slate-400 hover:text-white ml-1"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={RESTAURANT_CONFIG.socials.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-13 h-13 p-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-[0_4px_20px_rgba(16,185,129,0.4)] hover:shadow-[0_4px_25px_rgba(16,185,129,0.6)] flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95"
      >
        <MessageCircle className="w-6 h-6 stroke-[2.2]" />
      </a>
    </div>
  );
}
