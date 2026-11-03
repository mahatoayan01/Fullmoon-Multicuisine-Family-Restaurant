import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import StickyMobileBar from "./components/StickyMobileBar";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import ProtectedRoute from "./components/ProtectedRoute";
import { Loader2 } from "lucide-react";

// Lazy-loaded routes for optimal bundle splitting & Lighthouse performance
const HomePage = lazy(() => import("./pages/HomePage"));
const MenuPage = lazy(() => import("./pages/MenuPage"));
const OrderPage = lazy(() => import("./pages/OrderPage"));
const LocationPage = lazy(() => import("./pages/LocationPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const OwnerLoginPage = lazy(() => import("./pages/OwnerLoginPage"));
const OwnerDashboardPage = lazy(() => import("./pages/OwnerDashboardPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// Auto scroll to top on route navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

// Fallback loading indicator during route suspense
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <Loader2 className="w-8 h-8 text-brand-400 animate-spin mb-3" />
      <span className="text-xs text-slate-400 font-medium tracking-wider uppercase">Loading Fullmoon...</span>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-night-950 text-slate-100 font-sans selection:bg-brand-500 selection:text-night-950">
            
            {/* Sticky Navigation Bar */}
            <Navbar />

            {/* Main Page Body */}
            <main className="flex-1">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/menu" element={<MenuPage />} />
                  <Route path="/order" element={<OrderPage />} />
                  <Route path="/location" element={<LocationPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/owner/login" element={<OwnerLoginPage />} />
                  
                  {/* Protected Owner Dashboard */}
                  <Route
                    path="/owner/dashboard"
                    element={
                      <ProtectedRoute>
                        <OwnerDashboardPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* 404 Route */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </main>

            {/* Footer */}
            <Footer />

            {/* Mobile Bottom Sticky Action Bar */}
            <StickyMobileBar />

            {/* Floating WhatsApp Action Pill */}
            <FloatingWhatsApp />

          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
