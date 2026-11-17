"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";

export const Footer: React.FC = () => {
  const { subscribeNewsletter } = useStore();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const res = subscribeNewsletter(email, "Footer Subscription");
    if (res.success) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-brand-charcoal text-brand-ivory/80 pt-16 pb-10 border-t border-brand-charcoal/10">
      {/* Brand Value Props Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mb-12 border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center sm:text-left">
          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-rose shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide">
                Complimentary Shipping
              </h4>
              <p className="text-xs text-brand-ivory/60 mt-0.5">
                On all Pakistan orders above Rs. 5,000 via TCS Express
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-rose shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide">
                Cash on Delivery (COD)
              </h4>
              <p className="text-xs text-brand-ivory/60 mt-0.5">
                Pay conveniently at your doorstep across 250+ cities
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-rose shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide">
                7-Day Easy Exchange
              </h4>
              <p className="text-xs text-brand-ivory/60 mt-0.5">
                Hassle-free size and product exchanges nationwide
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-rose shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide">
                Artisanal Craftsmanship
              </h4>
              <p className="text-xs text-brand-ivory/60 mt-0.5">
                Pure raw silks, Swiss lawns & hand zardozi embroidery
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Intro & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl font-medium tracking-[0.2em] text-white uppercase block leading-none">
                Aleyza
              </span>
              <span className="text-[10px] uppercase tracking-[0.35em] text-brand-rose block mt-1 font-light">
                Haute Prêt • Pakistan
              </span>
            </Link>
            <p className="text-xs text-brand-ivory/70 leading-relaxed max-w-sm">
              Aleyza Store celebrates the legacy of Pakistani artisan couture. From delicate chanderi silks to everyday breathable luxury lawns, our collections are meticulously tailored for the modern, graceful woman.
            </p>

            {/* Newsletter VIP Club */}
            <div className="pt-2">
              <p className="text-xs uppercase font-semibold text-white tracking-wider mb-2">
                Join the Aleyza VIP Club
              </p>
              <p className="text-[11px] text-brand-ivory/60 mb-3">
                Enjoy 15% off your first order, private festive previews, and bespoke style edits.
              </p>

              {submitted ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-white/5 p-3 rounded border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Welcome to the circle. Use code <strong>WELCOMEVIP</strong> at checkout.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="flex-1 bg-white/5 border border-white/15 px-3 py-2 text-xs text-white placeholder-brand-ivory/40 rounded-sm focus:outline-none focus:border-brand-rose transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-brand-rose text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-brand-rose/90 transition-colors flex items-center gap-1 shrink-0"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 2: Collections */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-[0.2em] text-white mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-brand-ivory/70">
              <li>
                <Link href="/shop?category=eastern-wear" className="hover:text-white transition-colors">
                  Eastern Wear
                </Link>
              </li>
              <li>
                <Link href="/shop?category=formal-wear" className="hover:text-white transition-colors">
                  Formal & Velvet Soirée
                </Link>
              </li>
              <li>
                <Link href="/shop?category=co-ord-sets" className="hover:text-white transition-colors">
                  Co-Ord Sets
                </Link>
              </li>
              <li>
                <Link href="/shop?category=kurtis" className="hover:text-white transition-colors">
                  Kurtis & Chikankari
                </Link>
              </li>
              <li>
                <Link href="/shop?category=western-wear" className="hover:text-white transition-colors">
                  Western Prêt & Tailoring
                </Link>
              </li>
              <li>
                <Link href="/shop?category=dresses" className="hover:text-white transition-colors">
                  Flowing Dresses & Maxis
                </Link>
              </li>
              <li>
                <Link href="/shop?category=handbags" className="hover:text-white transition-colors">
                  Handbags & Leathergoods
                </Link>
              </li>
              <li>
                <Link href="/shop?category=jewelry" className="hover:text-white transition-colors">
                  Heritage Jewelry
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-[0.2em] text-white mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-brand-ivory/70">
              <li>
                <Link href="/track" className="hover:text-white transition-colors text-brand-rose font-medium">
                  Track Consignment
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition-colors">
                  Shipping & Delivery Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition-colors">
                  Returns & Exchanges Policy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  The Aleyza Story & Heritage
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Atelier Visits
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  My Customer Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Atelier & Support */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-[0.2em] text-white mb-4">
              Atelier Locations
            </h4>
            <div className="space-y-3 text-xs text-brand-ivory/70">
              <div>
                <p className="font-semibold text-white flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-rose shrink-0" />
                  Lahore Flagship
                </p>
                <p className="text-[11px] mt-0.5 text-brand-ivory/60 pl-5">
                  14-L, Mini Market, Gulberg III, Lahore
                </p>
              </div>

              <div>
                <p className="font-semibold text-white flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-rose shrink-0" />
                  Karachi Studio
                </p>
                <p className="text-[11px] mt-0.5 text-brand-ivory/60 pl-5">
                  Plot 22-C, 7th Zamzama Lane, DHA Phase 5, Karachi
                </p>
              </div>

              <div className="pt-2 border-t border-white/10">
                <p className="font-semibold text-white flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-brand-rose shrink-0" />
                  Client Concierge
                </p>
                <p className="text-[11px] mt-0.5 text-brand-ivory/60 pl-5">
                  +92 42 3578 9901 / WhatsApp: +92 300 8491023
                </p>
              </div>

              <div>
                <p className="font-semibold text-white flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-brand-rose shrink-0" />
                  Email Support
                </p>
                <p className="text-[11px] mt-0.5 text-brand-ivory/60 pl-5">
                  concierge@aleyzastore.pk
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Payment & Copyright Strip */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-ivory/60">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-[11px]">
            <span>Accepted Payment Methods across Pakistan:</span>
            <span className="px-2 py-0.5 bg-white/10 rounded text-white font-medium">Cash on Delivery</span>
            <span className="px-2 py-0.5 bg-white/10 rounded text-white font-medium">Meezan Bank</span>
            <span className="px-2 py-0.5 bg-white/10 rounded text-white font-medium">HBL</span>
            <span className="px-2 py-0.5 bg-white/10 rounded text-white font-medium">Easypaisa</span>
            <span className="px-2 py-0.5 bg-white/10 rounded text-white font-medium">JazzCash</span>
            <span className="px-2 py-0.5 bg-white/10 rounded text-white font-medium">Visa & Mastercard</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link href="/admin" className="text-brand-rose hover:underline font-semibold">
              Admin Suite
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center text-[11px] text-brand-ivory/40">
          © {new Date().getFullYear()} Aleyza Store (Pvt) Ltd. All Rights Reserved. Handcrafted in Pakistan.
        </div>
      </div>
    </footer>
  );
};
