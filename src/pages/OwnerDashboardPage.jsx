import React, { useState, useEffect, useMemo } from "react";
import { 
  ShoppingBag, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  LogOut, 
  X, 
  Eye, 
  Phone, 
  MapPin, 
  CreditCard, 
  MessageSquare, 
  AlertCircle,
  Database,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { 
  getOrders, 
  updateOrderStatus, 
  getPayments, 
  getContactMessages, 
  resetDemoData, 
  isFirebaseConfigured 
} from "../services/firebase";
import { RESTAURANT_CONFIG } from "../config/restaurant";

const ORDER_STATUSES = ["All", "New", "Preparing", "Out for Delivery", "Completed", "Cancelled"];

export default function OwnerDashboardPage() {
  const { logout, currentUser, ownerEmail } = useAuth();

  const [activeTab, setActiveTab] = useState("orders"); // 'orders' | 'payments' | 'messages'
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [orderSearch, setOrderSearch] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  // Payments filter
  const [paymentSearch, setPaymentSearch] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const [fetchedOrders, fetchedPayments, fetchedMessages] = await Promise.all([
        getOrders(),
        getPayments(),
        getContactMessages(),
      ]);
      setOrders(fetchedOrders || []);
      setPayments(fetchedPayments || []);
      setMessages(fetchedMessages || []);
    } catch (err) {
      console.error("Dashboard data load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handle status update
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
      if (selectedOrderDetails && selectedOrderDetails.id === orderId) {
        setSelectedOrderDetails((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.error("Failed to update order status:", err);
    }
  };

  // Reset Demo Data
  const handleResetData = () => {
    if (window.confirm("Reset dashboard data to initial sample orders and messages?")) {
      resetDemoData();
      loadData();
    }
  };

  // CSV Export
  const exportOrdersCSV = () => {
    if (orders.length === 0) return;
    const headers = ["Order ID", "Date", "Customer Name", "Phone", "Order Type", "Items", "Subtotal", "Total", "Status", "Payment Method", "Payment Status"];
    const rows = orders.map((o) => [
      o.id,
      new Date(o.createdAt).toLocaleString(),
      `"${o.customer?.name || ""}"`,
      `"${o.customer?.phone || ""}"`,
      o.orderType,
      `"${o.items?.map((i) => `${i.quantity}x ${i.name}`).join("; ") || ""}"`,
      o.subtotal,
      o.total,
      o.status,
      o.paymentMethod || "COD",
      o.paymentStatus || "Pending",
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `fullmoon_orders_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportPaymentsCSV = () => {
    if (payments.length === 0) return;
    const headers = ["Payment ID", "Order ID", "Date", "Amount", "Method", "Status"];
    const rows = payments.map((p) => [
      p.id,
      p.orderId,
      new Date(p.recordedAt || p.date).toLocaleString(),
      p.amount,
      p.method,
      p.status,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `fullmoon_payments_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculations for Overview Cards
  const stats = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    const todayOrders = orders.filter((o) => o.createdAt && o.createdAt.startsWith(today));
    
    const todayRevenue = todayOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
    const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
    const pendingOrders = orders.filter((o) => o.status === "New" || o.status === "Preparing" || o.status === "Out for Delivery").length;

    return {
      todayCount: todayOrders.length,
      totalCount: orders.length,
      todayRev: Math.round(todayRevenue),
      totalRev: Math.round(totalRevenue),
      pendingCount: pendingOrders,
    };
  }, [orders]);

  // Filtered orders list
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus =
        selectedStatusFilter === "All" || order.status === selectedStatusFilter;

      const q = orderSearch.trim().toLowerCase();
      const matchesQuery =
        !q ||
        order.id.toLowerCase().includes(q) ||
        (order.customer?.name || "").toLowerCase().includes(q) ||
        (order.customer?.phone || "").includes(q);

      return matchesStatus && matchesQuery;
    });
  }, [orders, selectedStatusFilter, orderSearch]);

  // Filtered payments list
  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const q = paymentSearch.trim().toLowerCase();
      return (
        !q ||
        (p.id && p.id.toLowerCase().includes(q)) ||
        (p.orderId && p.orderId.toLowerCase().includes(q)) ||
        (p.method && p.method.toLowerCase().includes(q))
      );
    });
  }, [payments, paymentSearch]);

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">Owner Portal</span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">
              {isFirebaseConfigured ? "Firebase Connected" : "Local Demo Storage"}
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Restaurant Command Center
          </h1>
          <p className="text-xs text-slate-400">
            Signed in as: <span className="font-semibold text-slate-300">{currentUser?.email || ownerEmail}</span>
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadData}
            disabled={loading}
            className="p-2.5 rounded-xl bg-night-800 hover:bg-night-700 text-slate-300 border border-slate-700 text-xs flex items-center gap-1.5 transition-colors"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-brand-400" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            onClick={handleResetData}
            className="px-3 py-2.5 rounded-xl bg-night-800 hover:bg-night-700 text-amber-300 text-xs font-semibold border border-amber-500/30 transition-colors"
            title="Load initial sample data"
          >
            Reset Demo Data
          </button>

          <button
            onClick={logout}
            className="px-3.5 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-bold border border-red-500/40 flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        
        <div className="p-4 rounded-2xl bg-night-900 border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Today's Orders</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white">{stats.todayCount}</span>
            <ShoppingBag className="w-4 h-4 text-brand-400" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-night-900 border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Orders</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white">{stats.totalCount}</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-night-900 border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Active / Pending</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-amber-400">{stats.pendingCount}</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-night-900 border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Today's Revenue</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-brand-400">₹{stats.todayRev}</span>
            <span className="text-xs text-slate-500">INR</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-night-900 border border-slate-800 space-y-1 col-span-2 md:col-span-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Revenue</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-emerald-400">₹{stats.totalRev}</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors ${
            activeTab === "orders"
              ? "bg-brand-500 text-night-950 shadow-glow"
              : "text-slate-400 hover:text-white hover:bg-night-850"
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Orders Management ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("payments")}
          className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors ${
            activeTab === "payments"
              ? "bg-brand-500 text-night-950 shadow-glow"
              : "text-slate-400 hover:text-white hover:bg-night-850"
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Payments Ledger ({payments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("messages")}
          className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors ${
            activeTab === "messages"
              ? "bg-brand-500 text-night-950 shadow-glow"
              : "text-slate-400 hover:text-white hover:bg-night-850"
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Customer Messages ({messages.length})</span>
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TAB 1: ORDERS MANAGEMENT */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "orders" && (
        <div className="space-y-6">
          
          {/* Controls: Search, Status Filter, Export */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                placeholder="Search by Order ID, name, phone..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-night-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:border-brand-500 focus:outline-none"
              />
            </div>

            {/* Status Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1">
              {ORDER_STATUSES.map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedStatusFilter === status
                      ? "bg-brand-500/20 text-brand-400 border border-brand-500/40"
                      : "bg-night-900 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  {status}
                </button>
              ))}

              <button
                onClick={exportOrdersCSV}
                className="ml-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-night-800 hover:bg-night-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                title="Export Orders to CSV"
              >
                <Download className="w-3.5 h-3.5 text-brand-400" />
                <span>Export CSV</span>
              </button>
            </div>

          </div>

          {/* Orders Table */}
          <div className="rounded-2xl bg-night-900 border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-night-950 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Order ID & Date</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Items Summary</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Payment</th>
                    <th className="py-3 px-4">Status & Action</th>
                    <th className="py-3 px-4 text-right">View</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800/80">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-night-850/60 transition-colors">
                        
                        <td className="py-3.5 px-4">
                          <span className="font-mono font-bold text-brand-400 block">{order.id}</span>
                          <span className="text-[11px] text-slate-400">
                            {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })},{" "}
                            {new Date(order.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-white block">{order.customer?.name}</span>
                          <a href={`tel:${order.customer?.phone}`} className="text-slate-400 hover:text-brand-400 font-mono text-[11px]">
                            {order.customer?.phone}
                          </a>
                        </td>

                        <td className="py-3.5 px-4 max-w-xs">
                          <p className="text-slate-300 line-clamp-1">
                            {order.items?.map((i) => `${i.quantity}x ${i.name}`).join(", ")}
                          </p>
                          <span className="text-[10px] text-slate-400">{order.items?.length || 0} item(s)</span>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="capitalize px-2 py-0.5 rounded bg-night-800 border border-slate-700 text-slate-300 font-medium">
                            {order.orderType}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 font-bold text-white text-sm">
                          ₹{order.total}
                        </td>

                        <td className="py-3.5 px-4">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                            order.paymentStatus === "Paid" 
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          }`}>
                            {order.paymentStatus || "Pending"}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className="bg-night-800 text-white font-semibold text-xs py-1 px-2.5 rounded-lg border border-slate-700 focus:border-brand-500 focus:outline-none"
                          >
                            <option value="New">New</option>
                            <option value="Preparing">Preparing</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => setSelectedOrderDetails(order)}
                            className="p-1.5 rounded-lg bg-night-800 hover:bg-brand-500 hover:text-night-950 text-slate-300 transition-colors"
                            title="Inspect Order Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="py-8 text-center text-slate-500">
                        No orders match your filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 2: PAYMENTS HISTORY */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "payments" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={paymentSearch}
                onChange={(e) => setPaymentSearch(e.target.value)}
                placeholder="Search payment ID or order..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-night-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:border-brand-500 focus:outline-none"
              />
            </div>

            <button
              onClick={exportPaymentsCSV}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-night-800 hover:bg-night-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-brand-400" />
              <span>Export Payments CSV</span>
            </button>
          </div>

          <div className="rounded-2xl bg-night-900 border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-night-950 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Payment ID</th>
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Gateway / Method</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Date Recorded</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800/80">
                  {filteredPayments.length > 0 ? (
                    filteredPayments.map((p, idx) => (
                      <tr key={idx} className="hover:bg-night-850/60">
                        <td className="py-3 px-4 font-mono font-bold text-brand-400">{p.id}</td>
                        <td className="py-3 px-4 font-mono text-slate-300">{p.orderId}</td>
                        <td className="py-3 px-4 text-white font-medium">{p.customerName || "Customer"}</td>
                        <td className="py-3 px-4 font-bold text-white text-sm">₹{p.amount}</td>
                        <td className="py-3 px-4 text-slate-300">{p.method}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            p.status === "Paid"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-amber-500/20 text-amber-400"
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-400">
                          {new Date(p.recordedAt || p.date || Date.now()).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="py-8 text-center text-slate-500">
                        No payment records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 3: CUSTOMER MESSAGES */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "messages" && (
        <div className="space-y-4">
          <p className="text-xs text-slate-400">
            Messages and table inquiries submitted through the website Contact form:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {messages.map((msg) => (
              <div key={msg.id} className="p-5 rounded-2xl bg-night-900 border border-slate-800 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-white text-sm">{msg.name}</h4>
                    <p className="text-xs text-slate-400">{msg.email || "No email"} • {msg.phone}</p>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed bg-night-850 p-3 rounded-xl border border-slate-800">
                  "{msg.message}"
                </p>
                <div className="pt-2 flex gap-2">
                  <a
                    href={`tel:${msg.phone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-500/20 text-brand-400 text-xs font-semibold hover:bg-brand-500/30 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Customer</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* ORDER DETAIL DRAWER MODAL */}
      {/* ------------------------------------------------------------- */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-lg bg-night-950 border-l border-slate-800 h-full p-6 overflow-y-auto space-y-6 shadow-2xl animate-fadeIn">
            
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] text-brand-400 font-bold uppercase tracking-wider block">Order Details</span>
                <h2 className="font-mono text-xl font-bold text-white">{selectedOrderDetails.id}</h2>
              </div>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-night-850"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Details */}
            <div className="p-4 rounded-2xl bg-night-900 border border-slate-800 space-y-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Customer Contact</h3>
              <p className="text-sm font-semibold text-white">{selectedOrderDetails.customer?.name}</p>
              <p className="text-xs text-slate-300 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-brand-400" />
                <a href={`tel:${selectedOrderDetails.customer?.phone}`} className="hover:underline">
                  {selectedOrderDetails.customer?.phone}
                </a>
              </p>
              <p className="text-xs text-slate-400 flex items-start gap-1.5 pt-1">
                <MapPin className="w-3.5 h-3.5 text-brand-400 shrink-0 mt-0.5" />
                <span>{selectedOrderDetails.customer?.address || "Pickup / Dine-in"}</span>
              </p>
              {selectedOrderDetails.customer?.notes && (
                <p className="text-xs text-amber-300 italic pt-1">
                  Note: "{selectedOrderDetails.customer.notes}"
                </p>
              )}
            </div>

            {/* Order Status Controller */}
            <div className="p-4 rounded-2xl bg-night-900 border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-white uppercase tracking-wider block">Change Order Status</label>
              <select
                value={selectedOrderDetails.status}
                onChange={(e) => handleStatusChange(selectedOrderDetails.id, e.target.value)}
                className="w-full bg-night-800 text-white font-bold text-sm py-2 px-3 rounded-xl border border-brand-500/40 focus:outline-none"
              >
                <option value="New">New</option>
                <option value="Preparing">Preparing in Kitchen</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Completed">Completed / Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* Items Ordered */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Food Items</h3>
              <div className="divide-y divide-slate-800 bg-night-900 border border-slate-800 rounded-2xl p-4">
                {selectedOrderDetails.items?.map((item, idx) => (
                  <div key={idx} className="py-2 flex justify-between items-center text-xs">
                    <span className="text-white font-medium">{item.quantity}x {item.name}</span>
                    <span className="text-slate-300 font-bold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="pt-3 mt-2 border-t border-slate-800 space-y-1 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{selectedOrderDetails.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charge</span>
                    <span>₹{selectedOrderDetails.deliveryFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Packaging</span>
                    <span>₹{selectedOrderDetails.packagingCharge}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (5%)</span>
                    <span>₹{selectedOrderDetails.taxes}</span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-brand-400 pt-2 border-t border-slate-700">
                    <span>Grand Total</span>
                    <span>₹{selectedOrderDetails.total}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="p-4 rounded-2xl bg-night-900 border border-slate-800 space-y-1 text-xs">
              <p className="text-slate-400">Payment Method: <strong className="text-white">{selectedOrderDetails.paymentMethod}</strong></p>
              <p className="text-slate-400">Payment Status: <strong className="text-emerald-400">{selectedOrderDetails.paymentStatus}</strong></p>
              <p className="text-slate-400">Payment ID: <code className="text-brand-400 font-mono">{selectedOrderDetails.paymentId}</code></p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
