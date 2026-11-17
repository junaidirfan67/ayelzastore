"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  CheckCircle2,
  Send,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function ContactPage() {
  const { addToast } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Order Inquiry");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast("Your message has been received by our Client Concierge team.", "success");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="text-[11px] uppercase tracking-[0.25em] text-brand-rose font-bold block mb-1">
          Client Services
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-brand-charcoal font-medium">
          Contact Concierge
        </h1>
        <p className="text-xs text-brand-muted mt-2">
          We are dedicated to ensuring your experience with Aleyza Store is seamless.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Info (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded border border-brand-border p-6 shadow-subtle space-y-4">
            <h3 className="font-serif text-lg font-semibold text-brand-charcoal pb-2 border-b border-brand-border">
              Concierge Channels
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-brand-sand flex items-center justify-center text-brand-rose shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-brand-charcoal block">Phone Helpline:</span>
                  <p className="text-brand-muted mt-0.5">+92 42 3578 9901</p>
                  <p className="text-[10px] text-brand-muted">Monday to Saturday: 10:00 AM – 8:00 PM PKT</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-brand-sand flex items-center justify-center text-emerald-600 shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-brand-charcoal block">WhatsApp Instant Support:</span>
                  <p className="text-brand-muted mt-0.5">+92 300 8491023</p>
                  <p className="text-[10px] text-brand-muted">Fastest response for sizing, order status &amp; returns</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-brand-sand flex items-center justify-center text-brand-rose shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-brand-charcoal block">Email Concierge:</span>
                  <p className="text-brand-muted mt-0.5">concierge@aleyzastore.pk</p>
                  <p className="text-[10px] text-brand-muted">Response guaranteed within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Showroom Addresses */}
          <div className="bg-white rounded border border-brand-border p-6 shadow-subtle space-y-4">
            <h3 className="font-serif text-lg font-semibold text-brand-charcoal pb-2 border-b border-brand-border">
              Atelier Addresses
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <p className="font-bold text-brand-charcoal flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-rose shrink-0" />
                  Lahore Flagship
                </p>
                <p className="text-brand-muted mt-0.5 pl-5">
                  14-L, Mini Market, Gulberg III, Lahore, Punjab
                </p>
              </div>

              <div>
                <p className="font-bold text-brand-charcoal flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-rose shrink-0" />
                  Karachi Studio
                </p>
                <p className="text-brand-muted mt-0.5 pl-5">
                  Plot 22-C, 7th Zamzama Commercial Lane, DHA Phase 5, Karachi
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded border border-brand-border p-8 shadow-subtle">
            <h2 className="font-serif text-xl font-medium text-brand-charcoal mb-2">
              Send an Inquiry
            </h2>
            <p className="text-xs text-brand-muted mb-6">
              Fill in your details below and our client advisor will get in touch with you.
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-brand-sand/50 rounded border border-brand-border space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="font-serif text-lg text-brand-charcoal font-semibold">
                  Message Dispatched
                </h3>
                <p className="text-xs text-brand-muted max-w-sm mx-auto">
                  Thank you, {name}. A member of our concierge team will respond to {email} shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 border border-brand-charcoal text-xs font-semibold uppercase rounded hover:bg-brand-charcoal hover:text-white transition-colors"
                >
                  Send Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-brand-charcoal font-medium mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Mahnoor Tariq"
                      className="w-full px-3 py-2.5 border border-brand-border rounded focus:outline-none focus:border-brand-rose bg-brand-ivory text-brand-charcoal"
                    />
                  </div>

                  <div>
                    <label className="block text-brand-charcoal font-medium mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. mahnoor@example.com"
                      className="w-full px-3 py-2.5 border border-brand-border rounded focus:outline-none focus:border-brand-rose bg-brand-ivory text-brand-charcoal"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-brand-charcoal font-medium mb-1">
                      Phone / WhatsApp (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0300 1234567"
                      className="w-full px-3 py-2.5 border border-brand-border rounded focus:outline-none focus:border-brand-rose bg-brand-ivory text-brand-charcoal"
                    />
                  </div>

                  <div>
                    <label className="block text-brand-charcoal font-medium mb-1">
                      Inquiry Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2.5 border border-brand-border rounded focus:outline-none focus:border-brand-rose bg-brand-ivory text-brand-charcoal"
                    >
                      <option value="Order Inquiry">Order Status &amp; Tracking</option>
                      <option value="Sizing Consultation">Sizing &amp; Fit Advice</option>
                      <option value="Exchange Request">Exchange &amp; Returns</option>
                      <option value="Custom Order">Bespoke Couture Request</option>
                      <option value="Other">General Feedback</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-brand-charcoal font-medium mb-1">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details about your query or order number..."
                    className="w-full p-3 border border-brand-border rounded focus:outline-none focus:border-brand-rose bg-brand-ivory text-brand-charcoal"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-brand-charcoal text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-brand-brown transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message to Concierge</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
