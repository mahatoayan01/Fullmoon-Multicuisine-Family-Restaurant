import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore";

// Read Firebase config from Vite environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Check if valid Firebase credentials are provided
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.apiKey !== "your_firebase_api_key_here"
);

let app = null;
let auth = null;
let db = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (err) {
    console.warn("Firebase initialization failed, falling back to local storage:", err);
  }
}

// -------------------------------------------------------------
// Fallback / Demo Mock Storage (Active when Firebase is not yet configured)
// Ensures the entire website, cart, orders, contact form and owner dashboard
// function smoothly out of the box during development and preview.
// -------------------------------------------------------------
const STORAGE_KEYS = {
  ORDERS: "fullmoon_orders_v1",
  PAYMENTS: "fullmoon_payments_v1",
  MESSAGES: "fullmoon_messages_v1",
};

// Initial demo seed data so the dashboard is immediately rich with realistic data
const INITIAL_DEMO_ORDERS = [
  {
    id: "ORD-98214",
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    customer: {
      name: "Venkat Rao",
      phone: "+91 98490 12345",
      email: "venkat.rao@gmail.com",
      address: "Flat 302, Sri Sai Nilayam, Meenakshi Estate, Alwal",
      notes: "Please deliver Apollo fish extra crispy with sliced onions.",
    },
    items: [
      { id: "item-101", name: "Apollo Fish (Specialty)", price: 360, quantity: 2 },
      { id: "item-301", name: "Fullmoon Special Chicken Biryani", price: 340, quantity: 2 },
      { id: "item-601", name: "Butter Garlic Naan", price: 70, quantity: 3 }
    ],
    orderType: "delivery",
    subtotal: 1610,
    taxes: 80.5,
    deliveryFee: 0, // Above free delivery threshold
    packagingCharge: 20,
    total: 1710.5,
    status: "Preparing",
    paymentMethod: "Razorpay (UPI)",
    paymentStatus: "Paid",
    paymentId: "pay_mock_98214"
  },
  {
    id: "ORD-98213",
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    customer: {
      name: "Ananya Sharma",
      phone: "+91 99891 56789",
      email: "ananya.s@outlook.com",
      address: "Plot 45, Mangapuram Colony, Alwal",
      notes: "Less spicy biryani please for kids.",
    },
    items: [
      { id: "item-201", name: "Tandoori Chicken (Full)", price: 450, quantity: 1 },
      { id: "item-401", name: "Delhi Style Butter Chicken", price: 340, quantity: 1 },
      { id: "item-601", name: "Butter Garlic Naan", price: 70, quantity: 4 }
    ],
    orderType: "takeaway",
    subtotal: 1070,
    taxes: 53.5,
    deliveryFee: 0,
    packagingCharge: 20,
    total: 1143.5,
    status: "Out for Delivery",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    paymentId: "cod_mock_98213"
  },
  {
    id: "ORD-98212",
    createdAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    customer: {
      name: "Suresh Reddy",
      phone: "+91 98850 77889",
      email: "suresh.reddy@gmail.com",
      address: "Table 7 (Family Room AC)",
      notes: "Birthday celebration.",
    },
    items: [
      { id: "item-102", name: "Crispy Dragon Chicken", price: 320, quantity: 2 },
      { id: "item-303", name: "Gongura Mutton Pulao", price: 440, quantity: 2 },
      { id: "item-701", name: "Warm Gulab Jamun with Ice Cream", price: 150, quantity: 4 }
    ],
    orderType: "dine-in",
    subtotal: 2120,
    taxes: 106,
    deliveryFee: 0,
    packagingCharge: 0,
    total: 2226,
    status: "Completed",
    paymentMethod: "Razorpay (Card)",
    paymentStatus: "Paid",
    paymentId: "pay_mock_98212"
  }
];

const INITIAL_DEMO_MESSAGES = [
  {
    id: "msg-1",
    name: "Sunil Verma",
    email: "sunil.v@gmail.com",
    phone: "+91 98480 33445",
    message: "Would like to book the family AC dining hall for a 20-person birthday party this Saturday evening. Please confirm availability and set menu options.",
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    status: "Unread"
  },
  {
    id: "msg-2",
    name: "Dr. K. Srinivas",
    email: "dr.srinivas@yahoo.com",
    phone: "+91 94401 88990",
    message: "Appreciate the fast delivery today! The Gongura Mutton Pulao was exceptional. Thank you.",
    createdAt: new Date(Date.now() - 1000 * 60 * 500).toISOString(),
    status: "Read"
  }
];

function getLocalData(key, defaultData) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultData));
      return defaultData;
    }
    return JSON.parse(raw);
  } catch (e) {
    return defaultData;
  }
}

function setLocalData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("Local storage write error:", e);
  }
}

// -------------------------------------------------------------
// Unified Database Operations (Firestore with automatic fallback)
// -------------------------------------------------------------

export async function createOrder(orderData) {
  const newOrder = {
    ...orderData,
    id: orderData.id || `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
    createdAt: new Date().toISOString(),
    status: orderData.status || "New",
  };

  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, "orders"), {
        ...newOrder,
        serverTime: serverTimestamp()
      });
      return { success: true, orderId: docRef.id, order: newOrder };
    } catch (err) {
      console.warn("Firestore order write failed, saving locally:", err);
    }
  }

  // Fallback: LocalStorage
  const orders = getLocalData(STORAGE_KEYS.ORDERS, INITIAL_DEMO_ORDERS);
  const updatedOrders = [newOrder, ...orders];
  setLocalData(STORAGE_KEYS.ORDERS, updatedOrders);
  return { success: true, orderId: newOrder.id, order: newOrder };
}

export async function getOrders() {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const orders = [];
      snapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      if (orders.length > 0) return orders;
    } catch (err) {
      console.warn("Firestore getOrders failed, loading local orders:", err);
    }
  }

  return getLocalData(STORAGE_KEYS.ORDERS, INITIAL_DEMO_ORDERS);
}

export async function updateOrderStatus(orderId, newStatus) {
  if (isFirebaseConfigured && db) {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: newStatus });
    } catch (err) {
      console.warn("Firestore update order status failed:", err);
    }
  }

  // Always sync local state
  const orders = getLocalData(STORAGE_KEYS.ORDERS, INITIAL_DEMO_ORDERS);
  const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
  setLocalData(STORAGE_KEYS.ORDERS, updated);
  return true;
}

export async function recordPayment(paymentData) {
  const record = {
    ...paymentData,
    id: paymentData.id || `PAY-${Math.floor(100000 + Math.random() * 900000)}`,
    recordedAt: new Date().toISOString(),
  };

  if (isFirebaseConfigured && db) {
    try {
      await addDoc(collection(db, "payments"), {
        ...record,
        serverTime: serverTimestamp()
      });
    } catch (err) {
      console.warn("Firestore payment record failed:", err);
    }
  }

  const payments = getLocalData(STORAGE_KEYS.PAYMENTS, []);
  setLocalData(STORAGE_KEYS.PAYMENTS, [record, ...payments]);
  return record;
}

export async function getPayments() {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, "payments"), orderBy("recordedAt", "desc"));
      const snapshot = await getDocs(q);
      const payments = [];
      snapshot.forEach((doc) => {
        payments.push({ id: doc.id, ...doc.data() });
      });
      if (payments.length > 0) return payments;
    } catch (err) {
      console.warn("Firestore getPayments failed:", err);
    }
  }

  const payments = getLocalData(STORAGE_KEYS.PAYMENTS, []);
  // If payments is empty, derive from orders for preview
  if (payments.length === 0) {
    const orders = getLocalData(STORAGE_KEYS.ORDERS, INITIAL_DEMO_ORDERS);
    return orders.map(o => ({
      id: o.paymentId || `PAY-${o.id}`,
      orderId: o.id,
      amount: o.total,
      method: o.paymentMethod || "Razorpay (UPI)",
      status: o.paymentStatus || "Paid",
      date: o.createdAt,
      customerName: o.customer?.name || "Customer"
    }));
  }
  return payments;
}

export async function saveContactMessage(messageData) {
  const newMsg = {
    ...messageData,
    id: `MSG-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "Unread",
  };

  if (isFirebaseConfigured && db) {
    try {
      await addDoc(collection(db, "messages"), {
        ...newMsg,
        serverTime: serverTimestamp(),
      });
      return { success: true, id: newMsg.id };
    } catch (err) {
      console.warn("Firestore contact message failed, saving locally:", err);
    }
  }

  const messages = getLocalData(STORAGE_KEYS.MESSAGES, INITIAL_DEMO_MESSAGES);
  setLocalData(STORAGE_KEYS.MESSAGES, [newMsg, ...messages]);
  return { success: true, id: newMsg.id };
}

export async function getContactMessages() {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const list = [];
      snapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() }));
      if (list.length > 0) return list;
    } catch (err) {
      console.warn("Firestore getContactMessages failed:", err);
    }
  }

  return getLocalData(STORAGE_KEYS.MESSAGES, INITIAL_DEMO_MESSAGES);
}

// Reset / Seed Demo Data helper for Owner Dashboard
export function resetDemoData() {
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_DEMO_ORDERS));
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(INITIAL_DEMO_MESSAGES));
  localStorage.removeItem(STORAGE_KEYS.PAYMENTS);
  return true;
}

export { app, auth, db };
