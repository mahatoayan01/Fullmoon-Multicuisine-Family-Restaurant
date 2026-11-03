import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShieldAlert, Loader2 } from "lucide-react";

export default function ProtectedRoute({ children }) {
  const { isOwner, loading, currentUser } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <Loader2 className="w-10 h-10 text-brand-400 animate-spin mb-3" />
        <p className="text-slate-400 text-sm">Verifying owner credentials...</p>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/owner/login" state={{ from: location }} replace />;
  }

  if (!isOwner) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-4">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-white mb-2">Access Denied</h2>
        <p className="text-slate-300 text-sm mb-6">
          You are currently signed in as <span className="font-semibold text-white">{currentUser.email}</span>, which does not match the configured restaurant owner email.
        </p>
        <button
          onClick={() => window.location.href = "/owner/login"}
          className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-night-950 font-bold text-sm transition-all"
        >
          Sign in as Restaurant Owner
        </button>
      </div>
    );
  }

  return children;
}

