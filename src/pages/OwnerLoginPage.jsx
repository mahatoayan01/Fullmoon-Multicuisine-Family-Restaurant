import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  KeyRound, 
  AlertCircle, 
  Loader2, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { RESTAURANT_CONFIG } from "../config/restaurant";

export default function OwnerLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { login, demoLogin, ownerEmail, isFirebaseConfigured } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/owner/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Owner login error:", err);
      setErrorMessage(err.message || "Failed to authenticate. Please verify your owner credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoAccess = () => {
    demoLogin();
    navigate("/owner/dashboard", { replace: true });
  };

  return (
    <div className="py-16 sm:py-24 max-w-md mx-auto px-4">
      <div className="rounded-3xl bg-night-900 border border-brand-500/30 p-8 shadow-2xl space-y-6">
        
        {/* Header Icon */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-amber-400 p-0.5 shadow-glow flex items-center justify-center mx-auto mb-3">
            <div className="w-full h-full bg-night-950 rounded-2xl flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-brand-400" />
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-brand-400 block">
            Authorized Personnel Only
          </span>
          <h1 className="font-serif text-2xl font-bold text-white">Owner Portal</h1>
          <p className="text-slate-400 text-xs">
            Sign in to manage live orders, payments, menu updates, and customer messages.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Owner Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={ownerEmail}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-night-800 text-white placeholder-slate-500 text-xs border border-slate-700 focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-night-800 text-white placeholder-slate-500 text-xs border border-slate-700 focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-400 to-brand-500 hover:from-brand-300 hover:to-brand-400 text-night-950 font-bold text-sm shadow-glow flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <KeyRound className="w-4 h-4" />
                <span>Sign In to Dashboard</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Mode / Quick Preview Button */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Instant Preview Mode:</span>
            <span className="text-emerald-400 font-semibold">Available</span>
          </div>
          <button
            type="button"
            onClick={handleDemoAccess}
            className="w-full py-2.5 px-4 rounded-xl bg-night-800 hover:bg-night-700 text-brand-300 text-xs font-semibold border border-brand-500/30 flex items-center justify-center gap-2 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>One-Click Demo Owner Sign In</span>
          </button>
          <p className="text-[10px] text-slate-400 text-center leading-relaxed">
            Authorized Owner Email: <span className="font-mono text-slate-300">{ownerEmail}</span>
          </p>
        </div>

      </div>
    </div>
  );
}

