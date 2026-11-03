import React, { useState } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  Instagram,
  Facebook,
  Navigation,
  Loader2,
  Calendar
} from "lucide-react";
import { RESTAURANT_CONFIG } from "../config/restaurant";
import { saveContactMessage } from "../services/firebase";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setError("Please fill in your name, contact phone number, and message.");
      return;
    }

    setIsSubmitting(true);
    try {
      await saveContactMessage(formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Contact submit error:", err);
      setError("Failed to send your message. Please try calling us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand-400 uppercase tracking-widest block">
          Get in Touch
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Contact & Table Reservations
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Have an inquiry about table availability, catering, bulk biryani orders, or feedback? Send us a message or reach us directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Direct Contact Details & WhatsApp */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick Call & WhatsApp Card */}
          <div className="rounded-3xl bg-night-900 border border-slate-800 p-6 space-y-5 shadow-xl">
            <h3 className="font-serif text-xl font-bold text-white">Direct Contacts</h3>

            <div className="space-y-4 text-sm">
              
              {/* Primary Phone */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Mobile / Order Hotline</p>
                  <a
                    href={`tel:${RESTAURANT_CONFIG.contact.primaryPhoneRaw}`}
                    className="font-bold text-white hover:text-brand-400 transition-colors text-base"
                  >
                    {RESTAURANT_CONFIG.contact.primaryPhone}
                  </a>
                </div>
              </div>

              {/* Landline */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-night-800 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Restaurant Landline</p>
                  <a
                    href={`tel:${RESTAURANT_CONFIG.contact.secondaryPhoneRaw}`}
                    className="font-semibold text-slate-200 hover:text-brand-400 transition-colors"
                  >
                    {RESTAURANT_CONFIG.contact.secondaryPhone}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Instant WhatsApp Chat</p>
                  <a
                    href={RESTAURANT_CONFIG.socials.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <span>Click to chat (+91 84998 34621)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-night-800 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Email Inquiries</p>
                  <a
                    href={`mailto:${RESTAURANT_CONFIG.contact.displayEmail}`}
                    className="font-medium text-slate-200 hover:text-brand-400 transition-colors"
                  >
                    {RESTAURANT_CONFIG.contact.displayEmail}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3.5 pt-2 border-t border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-night-800 text-brand-400 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Restaurant Address</p>
                  <p className="text-slate-300 leading-snug">{RESTAURANT_CONFIG.address.fullAddress}</p>
                </div>
              </div>

            </div>
          </div>

          {/* Social Links Card */}
          <div className="rounded-3xl bg-night-900 border border-slate-800 p-6 space-y-4 shadow-xl">
            <h3 className="font-serif text-base font-bold text-white">Social Media</h3>
            <div className="flex items-center gap-3">
              <a
                href={RESTAURANT_CONFIG.socials.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pink-500/15 hover:bg-pink-500/25 text-pink-400 text-xs font-semibold border border-pink-500/30 transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
              </a>

              <a
                href={RESTAURANT_CONFIG.socials.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 text-blue-400 text-xs font-semibold border border-blue-500/30 transition-colors"
              >
                <Facebook className="w-4 h-4" />
                <span>Facebook</span>
              </a>

              <a
                href={RESTAURANT_CONFIG.googleMaps.listingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500/15 hover:bg-brand-500/25 text-brand-400 text-xs font-semibold border border-brand-500/30 transition-colors"
              >
                <Navigation className="w-4 h-4" />
                <span>Google Maps</span>
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Contact & Table Booking Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-night-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
            
            <div>
              <h2 className="font-serif text-2xl font-bold text-white">Send Us a Message</h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Fill in the form below and our manager will respond shortly.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white">Message Sent Successfully!</h3>
                <p className="text-slate-300 text-xs max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out to Fullmoon Restaurant. We will review your message and get back to you promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 px-4 py-2 rounded-xl bg-night-800 text-brand-400 text-xs font-semibold hover:bg-night-700"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Ramesh Reddy"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-night-800 text-white placeholder-slate-500 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98490 12345"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-night-800 text-white placeholder-slate-500 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-night-800 text-white placeholder-slate-500 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Message / Table Inquiry Details *</label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your table reservation (date, time, guest count) or catering query..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-night-800 text-white placeholder-slate-500 text-sm border border-slate-700 focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-400 to-brand-500 hover:from-brand-300 hover:to-brand-400 text-night-950 font-bold text-sm shadow-glow flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}

