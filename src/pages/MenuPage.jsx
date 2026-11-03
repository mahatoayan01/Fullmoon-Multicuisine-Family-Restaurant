import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  X, 
  UtensilsCrossed, 
  ShoppingBag, 
  Sparkles, 
  SlidersHorizontal,
  Flame,
  ArrowRight
} from "lucide-react";
import { MENU_CATEGORIES, MENU_ITEMS } from "../data/menu";
import DishCard from "../components/DishCard";
import { useCart } from "../context/CartContext";

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dietaryFilter, setDietaryFilter] = useState("all"); // 'all' | 'veg' | 'non-veg'
  const [sortBy, setSortBy] = useState("popular"); // 'popular' | 'price-asc' | 'price-desc'

  const { itemCount, subtotal } = useCart();

  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      // Dietary match
      const matchesDiet =
        dietaryFilter === "all" ||
        (dietaryFilter === "veg" && item.isVeg) ||
        (dietaryFilter === "non-veg" && !item.isVeg);

      // Search match
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query);

      return matchesCategory && matchesDiet && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      // Default: signature and bestseller first
      return (b.isSignature ? 1 : 0) - (a.isSignature ? 1 : 0);
    });
  }, [selectedCategory, dietaryFilter, searchQuery, sortBy]);

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Menu Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand-400 uppercase tracking-widest block">
          Fullmoon Dining Experience
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Our Curated Menu
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          From fiery starters and charcoal clay tandoor kebabs to royal Hyderabadi Dum Biryanis and Indo-Chinese favorites. Freshly prepared to order.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="rounded-3xl bg-night-900 border border-slate-800 p-4 sm:p-6 space-y-4 shadow-xl">
        
        {/* Search Bar + Dietary Toggle */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (e.g. Apollo Fish, Biryani, Butter Chicken)..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-night-800 text-white placeholder-slate-400 text-sm border border-slate-700/80 focus:border-brand-500 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Veg / Non-Veg Filters + Sort dropdown */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
            
            {/* Dietary pill buttons */}
            <div className="inline-flex bg-night-800 p-1 rounded-xl border border-slate-700/80">
              <button
                onClick={() => setDietaryFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  dietaryFilter === "all"
                    ? "bg-brand-500 text-night-950 shadow-sm"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setDietaryFilter("veg")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  dietaryFilter === "veg"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Veg Only
              </button>
              <button
                onClick={() => setDietaryFilter("non-veg")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  dietaryFilter === "non-veg"
                    ? "bg-red-600 text-white shadow-sm"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-red-400" />
                Non-Veg
              </button>
            </div>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-night-800 text-slate-200 text-xs font-medium px-3 py-2 rounded-xl border border-slate-700/80 focus:border-brand-500 focus:outline-none"
            >
              <option value="popular">Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>

          </div>

        </div>

        {/* Category Filter Pills (Scrollable) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {MENU_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-gradient-to-r from-brand-500 to-amber-500 text-night-950 shadow-glow"
                    : "bg-night-800/90 hover:bg-night-700 text-slate-300 hover:text-white border border-slate-800"
                }`}
              >
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Result Count and Active Filters description */}
      <div className="flex justify-between items-center text-xs text-slate-400 px-1">
        <span>
          Showing <strong className="text-white">{filteredDishes.length}</strong> delicious dishes
        </span>
        {(searchQuery || selectedCategory !== "all" || dietaryFilter !== "all") && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setDietaryFilter("all");
            }}
            className="text-brand-400 hover:underline"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Dishes Grid */}
      {filteredDishes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-3xl bg-night-900 border border-slate-800">
          <UtensilsCrossed className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="font-serif text-lg font-semibold text-white">No dishes matched your selection</h3>
          <p className="text-slate-400 text-xs mt-1 max-w-sm mx-auto">
            Try adjusting your search query or reset your category and veg/non-veg filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setDietaryFilter("all");
            }}
            className="mt-4 px-5 py-2 rounded-xl bg-brand-500 text-night-950 font-bold text-xs shadow-glow"
          >
            Show All Menu Items
          </button>
        </div>
      )}

      {/* Floating Cart Indicator when items are in cart */}
      {itemCount > 0 && (
        <div className="sticky bottom-20 md:bottom-8 z-30 flex justify-center">
          <Link
            to="/order"
            className="flex items-center justify-between gap-6 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-500 via-amber-500 to-brand-600 text-night-950 font-bold shadow-glow-lg border border-amber-300/40 hover:scale-[1.02] transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-night-950/20">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold leading-tight">{itemCount} Dish{itemCount > 1 ? "es" : ""} in Cart</p>
                <p className="text-sm font-extrabold">Total: ₹{subtotal}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider bg-night-950 text-brand-400 px-3 py-1.5 rounded-xl">
              <span>Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      )}

    </div>
  );
}
