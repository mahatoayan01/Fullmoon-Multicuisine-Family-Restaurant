import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Phone, 
  MapPin, 
  Clock, 
  User, 
  UtensilsCrossed 
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { RESTAURANT_CONFIG } from "../config/restaurant";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount } = useCart();
  const { isOwner, currentUser } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Order Online", path: "/order" },
    { name: "Location & Hours", path: "/location" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top micro announcement bar */}
      <div className="bg-night-950/95 border-b border-brand-500/10 text-xs text-slate-300 py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-brand-400" />
              Old Alwal, Secunderabad (Meenakshi Estate)
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-brand-400" />
              Open Daily: 12:00 PM – 11:00 PM
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href={`tel:${RESTAURANT_CONFIG.contact.primaryPhoneRaw}`} 
              className="flex items-center gap-1.5 text-brand-400 hover:text-brand-300 transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5" />
              {RESTAURANT_CONFIG.contact.primaryPhone}
            </a>
            <span className="text-slate-600">|</span>
            <Link 
              to={currentUser ? "/owner/dashboard" : "/owner/login"} 
              className="flex items-center gap-1 hover:text-brand-400 text-slate-400 transition-colors text-xs"
            >
              <User className="w-3 h-3" />
              {isOwner ? "Owner Portal" : "Owner Login"}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav 
        className={`transition-all duration-300 ${
          scrolled 
            ? "bg-night-900/95 backdrop-blur-md shadow-lg shadow-black/40 border-b border-brand-500/20 py-3" 
            : "bg-night-900/80 backdrop-blur-sm border-b border-white/5 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* Moon Logo Emblem */}
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-brand-600 via-brand-500 to-amber-200 p-0.5 shadow-glow group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
              <div className="w-full h-full bg-night-950 rounded-full flex items-center justify-center overflow-hidden">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-brand-500 to-amber-200 opacity-90 shadow-inner flex items-center justify-center">
                  <UtensilsCrossed className="w-3.5 h-3.5 text-night-950 stroke-[2.5]" />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-brand-400 transition-colors">
                Fullmoon
              </span>
              <span className="text-[10px] tracking-widest uppercase text-brand-400 font-semibold -mt-1">
                Multicuisine Family Resto
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    isActive 
                      ? "text-brand-400 font-semibold" 
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-500 rounded-full shadow-glow" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Action CTAs: Cart & Order */}
          <div className="flex items-center gap-3">
            {/* Cart Icon Link */}
            <Link
              to="/order"
              aria-label="View Cart"
              className="relative p-2.5 rounded-xl bg-night-800 hover:bg-night-700 text-slate-200 hover:text-brand-400 transition-all border border-brand-500/20"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-brand-500 to-amber-600 text-night-950 font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Direct Order Button */}
            <Link
              to="/menu"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-semibold text-night-950 bg-gradient-to-r from-brand-400 to-brand-500 hover:from-brand-300 hover:to-brand-400 shadow-glow transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Explore Menu
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-night-800 border border-slate-700/50"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden bg-night-900/98 border-b border-brand-500/20 px-4 pt-3 pb-6 mt-3 space-y-3 shadow-2xl animate-fadeIn">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? "bg-brand-500/15 text-brand-400 font-semibold"
                        : "text-slate-300 hover:bg-night-800 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link
                to={currentUser ? "/owner/dashboard" : "/owner/login"}
                className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-400 hover:bg-night-800 hover:text-brand-400 flex items-center gap-2"
              >
                <User className="w-4 h-4 text-brand-400" />
                {isOwner ? "Owner Dashboard" : "Owner Portal Login"}
              </Link>
            </div>

            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <a
                href={`tel:${RESTAURANT_CONFIG.contact.primaryPhoneRaw}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-night-800 text-brand-400 font-semibold text-sm border border-brand-500/30"
              >
                <Phone className="w-4 h-4" />
                Call: {RESTAURANT_CONFIG.contact.primaryPhone}
              </a>
              <Link
                to="/order"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-brand-400 to-brand-500 text-night-950 font-bold text-sm shadow-glow"
              >
                <ShoppingBag className="w-4 h-4" />
                Order Online Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
