import React from "react";
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Phone, 
  Car, 
  ShieldCheck, 
  ExternalLink,
  UtensilsCrossed,
  CheckCircle2,
  Compass
} from "lucide-react";
import { RESTAURANT_CONFIG } from "../config/restaurant";

export default function LocationPage() {
  const currentHour = new Date().getHours();
  // Open 12:00 PM (12) to 11:00 PM (23)
  const isOpenNow = currentHour >= 12 && currentHour < 23;

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>Location & Visit Information</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Find Us in Old Alwal
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Conveniently located in Meenakshi Estate, Secunderabad. Easy to reach with dedicated parking and a welcoming family dining environment.
        </p>
      </div>

      {/* Main Grid: Details & Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Location Info & Hours */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Address & Quick Actions Card */}
          <div className="rounded-3xl bg-night-900 border border-slate-800 p-6 space-y-5 shadow-xl">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500/20 border border-brand-500/40 text-brand-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white">Full Address</h3>
                <address className="not-italic text-sm text-slate-300 leading-relaxed mt-1">
                  <strong>{RESTAURANT_CONFIG.name}</strong><br />
                  {RESTAURANT_CONFIG.address.line1},<br />
                  {RESTAURANT_CONFIG.address.line2},<br />
                  {RESTAURANT_CONFIG.address.city}, {RESTAURANT_CONFIG.address.state} — {RESTAURANT_CONFIG.address.pincode}, India.
                </address>
                <p className="text-xs text-brand-400 font-medium mt-2">
                  Landmark: {RESTAURANT_CONFIG.address.landmark}
                </p>
              </div>
            </div>

            {/* Direction & Call CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={RESTAURANT_CONFIG.googleMaps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-brand-400 to-brand-500 hover:from-brand-300 hover:to-brand-400 text-night-950 font-bold text-xs shadow-glow transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Driving Directions</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>

              <a
                href={`tel:${RESTAURANT_CONFIG.contact.primaryPhoneRaw}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-night-800 hover:bg-night-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-400" />
                <span>Call Restaurant</span>
              </a>
            </div>
          </div>

          {/* Operating Hours Table */}
          <div className="rounded-3xl bg-night-900 border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-400" />
                <span>Opening Hours</span>
              </h3>

              {isOpenNow ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Open Now
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/30">
                  Closed (Opens 12 PM)
                </span>
              )}
            </div>

            <div className="divide-y divide-slate-800 text-xs">
              {RESTAURANT_CONFIG.hours.schedule.map((item, idx) => (
                <div key={idx} className="py-2.5 flex justify-between items-center">
                  <span className="text-slate-300 font-medium">{item.day}</span>
                  <span className="text-white font-mono font-semibold">{item.hours}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-800">
              Lunch: 12:00 PM – 4:00 PM • Dinner: 6:30 PM – 11:00 PM
            </div>
          </div>

          {/* Parking & Amenities */}
          <div className="rounded-3xl bg-night-900 border border-slate-800 p-6 space-y-3 shadow-xl">
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
              <Car className="w-4 h-4 text-brand-400" />
              <span>Parking & Transit Information</span>
            </h3>
            <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-400 shrink-0 mt-0.5" />
                <span>Dedicated two-wheeler and street four-wheeler parking available right outside.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-400 shrink-0 mt-0.5" />
                <span>Near Loyola Academy Degree & PG College, Old Alwal.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-400 shrink-0 mt-0.5" />
                <span>Easily accessible from Alwal Main Road, Lothkunta, and Secunderabad Junction (~15-20 mins).</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Right Column: Full Embedded Google Map & Visual Details */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="rounded-3xl overflow-hidden border border-brand-500/20 bg-night-900 shadow-2xl h-[520px]">
            <iframe
              title="Fullmoon Multicuisine Family Restaurant Map"
              src={RESTAURANT_CONFIG.googleMaps.embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="p-4 rounded-2xl bg-night-850 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Google Place ID: <code className="text-brand-400 font-mono">{RESTAURANT_CONFIG.googleMaps.placeId}</code></span>
            <a
              href={RESTAURANT_CONFIG.googleMaps.listingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Open in Google Maps App</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
