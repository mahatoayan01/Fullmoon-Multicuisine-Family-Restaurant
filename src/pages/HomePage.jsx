import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Sparkles, 
  ArrowRight, 
  Phone, 
  Star, 
  UtensilsCrossed, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Flame, 
  CheckCircle2, 
  ChevronRight, 
  ExternalLink, 
  Instagram, 
  Navigation, 
  Heart, 
  Users, 
  Award,
  CalendarCheck
} from "lucide-react";
import { RESTAURANT_CONFIG } from "../config/restaurant";
import { MENU_ITEMS } from "../data/menu";
import { CUSTOMER_REVIEWS } from "../data/reviews";
import { INSTAGRAM_POSTS } from "../data/instagram";
import DishCard from "../components/DishCard";
import LightboxModal from "../components/LightboxModal";

// Verified Gallery Images showing dining ambience and culinary art
const GALLERY_IMAGES = [
  {
    id: "gal-1",
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=80",
    title: "Warm & Cozy Family Dining Room",
    category: "Ambience"
  },
  {
    id: "gal-2",
    url: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=1200&auto=format&fit=crop&q=80",
    title: "Crispy Apollo Fish (House Special)",
    category: "Specialties"
  },
  {
    id: "gal-3",
    url: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=1200&auto=format&fit=crop&q=80",
    title: "Charcoal Clay Tandoor Roasted Kebabs",
    category: "Tandoori"
  },
  {
    id: "gal-4",
    url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1200&auto=format&fit=crop&q=80",
    title: "Royal Hyderabadi Dum Biryani Feast",
    category: "Biryani"
  },
  {
    id: "gal-5",
    url: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&auto=format&fit=crop&q=80",
    title: "Fiery Dragon Chicken Sizzler",
    category: "Indo-Chinese"
  },
  {
    id: "gal-6",
    url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1200&auto=format&fit=crop&q=80",
    title: "Gulab Jamun with Rich Cream & Ice Cream",
    category: "Desserts"
  }
];

export default function HomePage() {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);

  // Filter 6-8 popular signature dishes for the homepage
  const signatureDishes = MENU_ITEMS.filter((item) => item.isSignature || item.isBestseller).slice(0, 8);

  const openLightbox = (index) => setActiveLightboxIndex(index);
  const closeLightbox = () => setActiveLightboxIndex(null);
  const nextLightbox = () => setActiveLightboxIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  const prevLightbox = () => setActiveLightboxIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);

  return (
    <div className="space-y-24 md:space-y-32">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden pt-8 pb-16 px-4 sm:px-6 lg:px-8">
        
        {/* Ambient Moonlit Glow Backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-brand-600/20 via-brand-500/15 to-transparent rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold tracking-wide backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Old Alwal’s Premier Multicuisine Destination</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              Savor the Magic of <br />
              <span className="bg-gradient-to-r from-brand-300 via-brand-400 to-amber-200 bg-clip-text text-transparent drop-shadow-sm">
                Authentic Flavors
              </span> <br />
              Under the Full Moon
            </h1>

            {/* Tagline / Subtitle */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              From our legendary <span className="text-brand-300 font-medium">Apollo Fish</span> and charcoal-roasted kebabs to fragrant Hyderabadi Dum Biryani and fiery Chinese sizzlers — crafted for families, friends, and food lovers.
            </p>

            {/* Rating Snapshot */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1">
              <div className="flex items-center gap-1.5 bg-night-850/90 border border-slate-700/80 px-3 py-1.5 rounded-xl">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-white font-bold text-sm">{RESTAURANT_CONFIG.metrics.rating}</span>
                <span className="text-slate-400 text-xs">({RESTAURANT_CONFIG.metrics.reviewCount}+ Google reviews)</span>
              </div>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-400" />
                AC Family Dining & Restobar
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                to="/order"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-400 to-brand-500 hover:from-brand-300 hover:to-brand-400 text-night-950 font-bold text-base shadow-glow transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Order Online Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-night-850 hover:bg-night-800 text-white font-semibold text-base border border-slate-700 hover:border-brand-500/50 transition-all"
              >
                <UtensilsCrossed className="w-4 h-4 text-brand-400" />
                <span>Explore Full Menu</span>
              </Link>

              <a
                href={`tel:${RESTAURANT_CONFIG.contact.primaryPhoneRaw}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-night-900/60 hover:bg-night-800 text-brand-400 font-semibold text-sm border border-brand-500/20 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call / Reserve</span>
              </a>
            </div>

          </div>

          {/* Right Visual Column (Featured Dish & Ambience Collage) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Decorative Ring */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-brand-500/20 via-transparent to-amber-500/20 blur-xl opacity-70" />

              {/* Main Feature Card */}
              <div className="relative rounded-3xl overflow-hidden border border-brand-500/30 bg-night-850 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&auto=format&fit=crop&q=80"
                  alt="Fullmoon Restaurant Ambience"
                  className="w-full h-80 object-cover"
                />
                <div className="p-5 bg-gradient-to-b from-night-900/90 to-night-950">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-[10px] tracking-wider uppercase text-brand-400 font-bold">House Specialty</span>
                      <h3 className="font-serif text-lg font-bold text-white">Fullmoon Apollo Fish</h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-brand-500/20 text-brand-400 text-xs font-bold border border-brand-500/30">
                      ₹360
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    Crispy battered boneless fish tossed with Andhra spices, green chillies, and fragrant curry leaves. Alwal’s all-time customer favorite.
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-brand-400" />
                      12:00 PM – 11:00 PM
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-400" />
                      Meenakshi Estate, Alwal
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Badge (Top-Left) */}
              <div className="absolute -top-4 -left-4 bg-night-900/95 border border-brand-500/40 rounded-2xl p-3 shadow-xl backdrop-blur-md hidden sm:flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Flame className="w-5 h-5 fill-amber-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Charcoal Tandoor</p>
                  <p className="text-[10px] text-slate-400">Authentic wood fire</p>
                </div>
              </div>

              {/* Floating Badge (Bottom-Right) */}
              <div className="absolute -bottom-4 -right-4 bg-night-900/95 border border-brand-500/40 rounded-2xl p-3 shadow-xl backdrop-blur-md hidden sm:flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Family Dining Room</p>
                  <p className="text-[10px] text-slate-400">Dedicated AC comfort</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. ABOUT US SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-night-900 via-night-850 to-night-900 border border-brand-500/20 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left text */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-brand-500" />
                <span>Our Story</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Where Genuine Hospitality Meets Rich Culinary Heritage
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Located in Meenakshi Estate, BHEL Avemachs in Old Alwal, <strong className="text-white">Fullmoon Multicuisine Family Restaurant</strong> has earned a cherished place among local residents for serving flavorful, generous, and hearty meals.
              </p>

              <p className="text-slate-400 text-sm leading-relaxed">
                Whether you are joining us with family for a relaxed weekend lunch in our air-conditioned dining area, gathering with friends over starters and beverages in our restobar section, or ordering fresh takeaway at home — our team is dedicated to authentic preparation, quality ingredients, and consistent taste.
              </p>

              {/* Key Features grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                <div>
                  <span className="font-serif text-2xl font-bold text-brand-400 block">1,250+</span>
                  <span className="text-xs text-slate-400">Happy Customer Reviews</span>
                </div>
                <div>
                  <span className="font-serif text-2xl font-bold text-brand-400 block">7 Days</span>
                  <span className="text-xs text-slate-400">Open 12 PM to 11 PM</span>
                </div>
                <div>
                  <span className="font-serif text-2xl font-bold text-brand-400 block">6+</span>
                  <span className="text-xs text-slate-400">Cuisine Specialties</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/location"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors"
                >
                  <span>Explore our dining space & location</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Photo Collage */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <img
                src="https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop&q=80"
                alt="Clay oven roasting"
                className="rounded-2xl h-44 w-full object-cover border border-slate-700/60 shadow-md"
              />
              <img
                src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80"
                alt="Hyderabadi Dum Biryani"
                className="rounded-2xl h-44 w-full object-cover border border-slate-700/60 shadow-md"
              />
              <img
                src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&auto=format&fit=crop&q=80"
                alt="Crispy Chinese starters"
                className="rounded-2xl h-44 w-full object-cover border border-slate-700/60 shadow-md"
              />
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80"
                alt="Family seating"
                className="rounded-2xl h-44 w-full object-cover border border-slate-700/60 shadow-md"
              />
            </div>

          </div>

        </div>
      </section>

      {/* 3. CUISINE SPECIALTIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-brand-400 uppercase tracking-widest block mb-2">
            Multicuisine Excellence
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Something Extraordinary for Every Taste
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            Our experienced chefs bring together regional Andhra delicacies, slow-cooked Mughlai curries, smoky North Indian tandoor, and vibrant Indo-Chinese dishes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-2xl bg-night-850/80 border border-slate-800 hover:border-brand-500/40 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
              <Flame className="w-6 h-6 fill-amber-500/20" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white mb-2">Tandoori & Kebabs</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Marinated in traditional stone-ground spices and roasted over live wood charcoal. Tandoori Chicken, Achari Tikka & Tangdi Kebabs.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-night-850/80 border border-slate-800 hover:border-brand-500/40 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white mb-2">Apollo Fish & Starters</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Crispy boneless fish, Dragon Chicken, and spicy Paneer 65. Handcrafted appetizers that make every gathering memorable.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-night-850/80 border border-slate-800 hover:border-brand-500/40 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white mb-2">Hyderabadi Biryani</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fragrant aged basmati rice layered with spiced tender chicken or mutton, cooked on traditional dum with mirchi ka salan.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-night-850/80 border border-slate-800 hover:border-brand-500/40 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white mb-2">North Indian & Gravies</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Velvety Butter Chicken, Kadai Paneer, slow-cooked Dal Makhani, paired with hot Butter Garlic Naans straight from the tandoor.
            </p>
          </div>

        </div>
      </section>

      {/* 4. POPULAR / SIGNATURE DISHES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-brand-400 uppercase tracking-widest block mb-2">
              Chef’s Recommendations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Popular & Signature Dishes
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              The dishes our regulars order time and again in Alwal.
            </p>
          </div>

          <Link
            to="/menu"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors"
          >
            <span>View Complete Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 8 Dish Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {signatureDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      </section>

      {/* 5. WHY CHOOSE US (AMENITIES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-night-900 border border-slate-800 p-8 sm:p-12">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h2 className="font-serif text-3xl font-bold text-white">Why Diners Choose Fullmoon</h2>
            <p className="text-slate-400 text-sm mt-2">
              Thoughtfully designed for comfort, taste, and seamless family dining.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESTAURANT_CONFIG.amenities.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3.5 p-4 rounded-xl bg-night-850/60 border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-white text-sm">{item.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PHOTO GALLERY WITH LIGHTBOX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-brand-400 uppercase tracking-widest block mb-2">
            Visual Experience
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
            A Glimpse Inside Fullmoon
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Click on any photo to open high-resolution gallery view.
          </p>
        </div>

        {/* Responsive Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GALLERY_IMAGES.map((img, index) => (
            <div
              key={img.id}
              onClick={() => openLightbox(index)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer bg-night-900 border border-slate-800 hover:border-brand-500/50 transition-all duration-300"
            >
              <img
                src={img.url}
                alt={img.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-950/90 via-night-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-brand-400">{img.category}</span>
                <h4 className="font-serif text-base font-bold text-white">{img.title}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeLightboxIndex !== null && (
          <LightboxModal
            image={GALLERY_IMAGES[activeLightboxIndex]}
            onClose={closeLightbox}
            onNext={nextLightbox}
            onPrev={prevLightbox}
            hasNext={GALLERY_IMAGES.length > 1}
            hasPrev={GALLERY_IMAGES.length > 1}
          />
        )}
      </section>

      {/* 7. CUSTOMER REVIEWS (STEP 4) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Overall Google Rating */}
        <div className="rounded-3xl bg-gradient-to-r from-night-900 via-night-850 to-night-900 border border-brand-500/20 p-8 sm:p-10 mb-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left space-y-2">
              <span className="text-xs font-bold text-brand-400 uppercase tracking-widest block">
                Google Maps Verified Feedback
              </span>
              <h2 className="font-serif text-3xl font-bold text-white">What Our Guests Are Saying</h2>
              <p className="text-slate-400 text-sm max-w-xl">
                Genuine customer reviews extracted directly from our public Google Maps & Justdial listings in Alwal, Secunderabad.
              </p>
            </div>

            {/* Rating Box & Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-3 bg-night-950/90 border border-brand-500/30 px-5 py-3 rounded-2xl">
                <div className="text-center">
                  <span className="font-serif text-3xl font-extrabold text-white block">
                    {RESTAURANT_CONFIG.metrics.rating}
                  </span>
                  <div className="flex text-amber-400 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <div className="text-left text-xs text-slate-300 border-l border-slate-700 pl-3">
                  <p className="font-semibold text-white">Google Rating</p>
                  <p className="text-slate-400">{RESTAURANT_CONFIG.metrics.reviewCount}+ customer reviews</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <a
                  href={RESTAURANT_CONFIG.googleMaps.listingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-night-800 hover:bg-night-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                >
                  <span>Read more on Google</span>
                  <ExternalLink className="w-3.5 h-3.5 text-brand-400" />
                </a>

                <a
                  href={RESTAURANT_CONFIG.googleMaps.writeReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-brand-500/20 hover:bg-brand-500/30 text-brand-300 text-xs font-semibold border border-brand-500/40 transition-colors"
                >
                  <Star className="w-3.5 h-3.5 text-brand-400 fill-brand-400" />
                  <span>Write a Review</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 8 Customer Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-night-850/80 border border-slate-800 hover:border-brand-500/30 flex flex-col justify-between transition-all"
            >
              <div>
                {/* Header: Avatar, Name, Rating */}
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={rev.avatar}
                    alt={rev.authorName}
                    className="w-10 h-10 rounded-full object-cover border border-brand-500/30"
                  />
                  <div>
                    <h4 className="font-semibold text-white text-sm leading-tight">{rev.authorName}</h4>
                    <span className="text-[11px] text-slate-400">{rev.relativeTime}</span>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex text-amber-400 mb-2.5">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xs text-slate-300 leading-relaxed italic line-clamp-4">
                  "{rev.text}"
                </p>
              </div>

              {/* Recommended dish badge */}
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-brand-400 flex items-center justify-between">
                <span className="font-medium text-slate-400">Fav: {rev.recommendedDish}</span>
                <span className="text-[10px] text-slate-400">Verified</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. INSTAGRAM SECTION (STEP 5) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-400 uppercase tracking-widest mb-1">
              <Instagram className="w-3.5 h-3.5" />
              <span>@fullmoon_alwal_official</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Follow Us on Instagram
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Fresh specials, behind-the-scenes tandoor magic, and community stories.
            </p>
          </div>

          <a
            href={RESTAURANT_CONFIG.socials.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 hover:opacity-95 text-white text-xs font-bold shadow-md transition-opacity"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow on Instagram</span>
          </a>
        </div>

        {/* 6 Recent Post Tiles */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-night-900 border border-slate-800 hover:border-pink-500/50 transition-all block"
            >
              <img
                src={post.imageUrl}
                alt={post.dishTag}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Hover overlay with likes and comment count */}
              <div className="absolute inset-0 bg-night-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center gap-2 p-3 text-center">
                <div className="flex items-center gap-3 text-white text-xs font-semibold">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                    {post.likes}
                  </span>
                </div>
                <p className="text-[10px] text-slate-300 line-clamp-2 mt-1">
                  {post.dishTag}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 9. OPENING HOURS & MINI LOCATION BLOCK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-night-900 border border-slate-800 p-8 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold text-brand-400 uppercase tracking-widest block">
                Plan Your Visit
              </span>
              <h2 className="font-serif text-3xl font-bold text-white">
                Visit Us in Old Alwal
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Conveniently situated in Meenakshi Estate, Mangapuram Colony near BHEL Avemachs. Ample vehicle parking and welcoming staff ready to serve you.
              </p>

              <div className="space-y-2 text-sm text-slate-300 pt-2">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
                  <span>{RESTAURANT_CONFIG.address.fullAddress}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-400 shrink-0" />
                  <span>Open Daily: 12:00 PM – 11:00 PM (Monday through Sunday)</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                  <span>{RESTAURANT_CONFIG.contact.primaryPhone} / {RESTAURANT_CONFIG.contact.secondaryPhone}</span>
                </p>
              </div>

              <div className="pt-3 flex flex-wrap gap-3">
                <a
                  href={RESTAURANT_CONFIG.googleMaps.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-night-950 text-xs font-bold transition-all shadow-glow"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Driving Directions</span>
                </a>
                <Link
                  to="/location"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-night-800 hover:bg-night-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                >
                  <span>View Location Page</span>
                </Link>
              </div>
            </div>

            {/* Mini Map preview card */}
            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-brand-500/20 aspect-[16/10] bg-night-950">
              <iframe
                title="Fullmoon Restaurant Location Map"
                src={RESTAURANT_CONFIG.googleMaps.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 10. RESERVATION / CONTACT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-3xl bg-gradient-to-r from-brand-600 via-brand-500 to-amber-500 p-8 sm:p-12 text-night-950 shadow-glow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-night-950">
              Hosting a Family Gathering or Birthday?
            </h3>
            <p className="text-night-950/80 text-sm sm:text-base font-medium max-w-xl">
              Reserve our air-conditioned family section or pre-order bulk biryani packages for your special occasions in Alwal.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <a
              href={`tel:${RESTAURANT_CONFIG.contact.primaryPhoneRaw}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-night-950 text-white font-bold text-sm shadow-xl hover:bg-night-900 transition-all"
            >
              <Phone className="w-4 h-4 text-brand-400" />
              <span>Call: {RESTAURANT_CONFIG.contact.primaryPhone}</span>
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/20 hover:bg-white/30 text-night-950 font-bold text-sm backdrop-blur-sm transition-all"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Inquire Table Booking</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

