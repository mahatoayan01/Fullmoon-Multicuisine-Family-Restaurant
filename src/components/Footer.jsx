import React from "react";
import { Link } from "react-router-dom";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ExternalLink, 
  UtensilsCrossed, 
  Heart,
  ShieldCheck,
  Navigation
} from "lucide-react";
import { RESTAURANT_CONFIG } from "../config/restaurant";

export default function Footer() {
  return (
    <footer className="bg-night-950 border-t border-brand-500/15 pt-16 pb-24 md:pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: About & Identity */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-600 via-brand-500 to-amber-200 p-0.5 shadow-glow flex items-center justify-center">
                <div className="w-full h-full bg-night-950 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-brand-500 to-amber-200 flex items-center justify-center">
                    <UtensilsCrossed className="w-3.5 h-3.5 text-night-950 stroke-[2.5]" />
                  </div>
                </div>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-white block">Fullmoon</span>
                <span className="text-[10px] tracking-wider uppercase text-brand-400 font-semibold block">Multicuisine Restaurant</span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-slate-300">
              A premier multicuisine dining destination in Old Alwal, Secunderabad. Celebrating the joy of good food with authentic Andhra starters, sizzling tandoor, royal biryanis, and warm family hospitality.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={RESTAURANT_CONFIG.socials.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-lg bg-night-800 hover:bg-emerald-600/20 hover:text-emerald-400 border border-slate-700/60 flex items-center justify-center transition-colors text-slate-300"
              >
                <span className="text-xs font-bold">WA</span>
              </a>
              <a
                href={RESTAURANT_CONFIG.socials.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-night-800 hover:bg-pink-600/20 hover:text-pink-400 border border-slate-700/60 flex items-center justify-center transition-colors text-slate-300"
              >
                <span className="text-xs font-bold">IG</span>
              </a>
              <a
                href={RESTAURANT_CONFIG.socials.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-night-800 hover:bg-blue-600/20 hover:text-blue-400 border border-slate-700/60 flex items-center justify-center transition-colors text-slate-300"
              >
                <span className="text-xs font-bold">FB</span>
              </a>
              <a
                href={RESTAURANT_CONFIG.googleMaps.listingUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Maps"
                className="w-9 h-9 rounded-lg bg-night-800 hover:bg-brand-500/20 hover:text-brand-400 border border-slate-700/60 flex items-center justify-center transition-colors text-slate-300"
              >
                <Navigation className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-white tracking-wide">Quick Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-brand-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-brand-400 transition-colors">Our Full Menu</Link>
              </li>
              <li>
                <Link to="/order" className="hover:text-brand-400 transition-colors">Order Online</Link>
              </li>
              <li>
                <Link to="/location" className="hover:text-brand-400 transition-colors">Location & Directions</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-400 transition-colors">Contact & Reservations</Link>
              </li>
              <li>
                <Link to="/owner/login" className="hover:text-brand-400 text-slate-400 flex items-center gap-1.5 transition-colors">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
                  Owner Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Dining */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-white tracking-wide">Opening Hours</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-200 font-medium">Monday – Sunday (All 7 Days)</p>
                  <p className="text-brand-400 font-semibold">12:00 PM – 11:00 PM</p>
                </div>
              </div>
              <div className="pt-2 text-xs text-slate-400 space-y-1">
                <p>• Lunch Service: 12:00 PM – 4:00 PM</p>
                <p>• Evening & Dinner: 6:30 PM – 11:00 PM</p>
                <p>• Dine-in • Takeaway • Doorstep Delivery</p>
              </div>
            </div>
          </div>

          {/* Col 4: Location & Contact */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-white tracking-wide">Visit Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-1" />
                <address className="not-italic text-slate-300 leading-snug">
                  {RESTAURANT_CONFIG.address.line1},<br />
                  {RESTAURANT_CONFIG.address.line2},<br />
                  {RESTAURANT_CONFIG.address.city}, {RESTAURANT_CONFIG.address.state} — {RESTAURANT_CONFIG.address.pincode}
                </address>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <div className="flex flex-col">
                  <a href={`tel:${RESTAURANT_CONFIG.contact.primaryPhoneRaw}`} className="hover:text-brand-400 text-slate-200 font-medium">
                    {RESTAURANT_CONFIG.contact.primaryPhone}
                  </a>
                  <a href={`tel:${RESTAURANT_CONFIG.contact.secondaryPhoneRaw}`} className="hover:text-brand-400 text-xs text-slate-400">
                    {RESTAURANT_CONFIG.contact.secondaryPhone}
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={RESTAURANT_CONFIG.googleMaps.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 border border-brand-500/30 text-xs font-semibold transition-all"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Get Google Maps Directions
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {RESTAURANT_CONFIG.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted for exceptional dining experiences in Alwal, Secunderabad.
          </p>
        </div>

      </div>
    </footer>
  );
}
