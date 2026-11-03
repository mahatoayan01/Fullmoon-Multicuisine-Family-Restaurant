import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  auth, 
  isFirebaseConfigured 
} from "../services/firebase";
import { 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged 
} from "firebase/auth";

const AuthContext = createContext(null);

export const OWNER_EMAIL = import.meta.env.VITE_OWNER_EMAIL || "owner@fullmoonrestaurant.com";
const DEMO_AUTH_KEY = "fullmoon_owner_session_v1";

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If Firebase is configured with real credentials, listen to auth state
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);
      });
      return unsubscribe;
    }

    // Otherwise, check local demo session
    try {
      const savedSession = localStorage.getItem(DEMO_AUTH_KEY);
      if (savedSession) {
        setCurrentUser(JSON.parse(savedSession));
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  const isOwner = Boolean(
    currentUser &&
    currentUser.email &&
    currentUser.email.toLowerCase() === OWNER_EMAIL.toLowerCase()
  );

  const login = async (email, password) => {
    // 1. If Firebase is configured
    if (isFirebaseConfigured && auth) {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Verify owner email
      if (userCredential.user.email.toLowerCase() !== OWNER_EMAIL.toLowerCase()) {
        await firebaseSignOut(auth);
        throw new Error(`Access Denied: The account ${email} is not authorized as the restaurant owner.`);
      }
      return userCredential.user;
    }

    // 2. Demo fallback mode
    if (email.toLowerCase() === OWNER_EMAIL.toLowerCase() && (password.length >= 6 || password === "fullmoon123")) {
      const demoUser = {
        uid: "owner_demo_uid_777",
        email: OWNER_EMAIL,
        displayName: "Fullmoon Restaurant Owner",
        isDemo: true,
      };
      setCurrentUser(demoUser);
      localStorage.setItem(DEMO_AUTH_KEY, JSON.stringify(demoUser));
      return demoUser;
    }

    throw new Error("Invalid email or password. (Hint: In demo mode, use " + OWNER_EMAIL + " and password 'fullmoon123')");
  };

  const demoLogin = () => {
    const demoUser = {
      uid: "owner_demo_uid_777",
      email: OWNER_EMAIL,
      displayName: "Fullmoon Restaurant Owner (Demo)",
      isDemo: true,
    };
    setCurrentUser(demoUser);
    localStorage.setItem(DEMO_AUTH_KEY, JSON.stringify(demoUser));
  };

  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      await firebaseSignOut(auth);
    }
    setCurrentUser(null);
    localStorage.removeItem(DEMO_AUTH_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isOwner,
        loading,
        login,
        demoLogin,
        logout,
        ownerEmail: OWNER_EMAIL,
        isFirebaseConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
