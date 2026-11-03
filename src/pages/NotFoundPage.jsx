import React from "react";
import { Link } from "react-router-dom";
import { Utensils, Home, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="text-center max-w-md mx-auto space-y-6">
        
        {/* Visual Emblem */}
        <div className="relative w-28 h-28 mx-auto">
          <div className="absolute inset-0 rounded-full bg-brand-500/20 blur-xl animate-pulse" />
          <div className="relative w-full h-full rounded-full bg-night-900 border-2 border-brand-500/40 flex items-center justify-center">
            <span className="font-serif text-4xl font-extrabold text-brand-400">404</span>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-3xl font-bold text-white">Dish or Page Not Found</h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            The page you're searching for seems to have vanished like the morning stars. Let's guide you back to our delicious food!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-night-800 hover:bg-night-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            <Home className="w-4 h-4 text-brand-400" />
            <span>Return Home</span>
          </Link>

          <Link
            to="/menu"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-400 to-brand-500 text-night-950 text-xs font-bold shadow-glow transition-all"
          >
            <Utensils className="w-4 h-4" />
            <span>Explore Menu</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
