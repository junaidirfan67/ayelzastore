"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, MapPin, ShieldCheck, Heart, Award, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative py-24 bg-brand-charcoal text-white text-center px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-[11px] uppercase tracking-[0.25em] text-brand-rose font-bold block">
            Our Heritage &amp; Craftsmanship
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight">
            The Story of Aleyza Store
          </h1>
          <p className="text-xs sm:text-sm text-brand-ivory/80 max-w-xl mx-auto font-light leading-relaxed">
            Rooted in Lahore&apos;s historic artisanal lanes, crafted for the discerning modern woman across Pakistan.
          </p>
        </div>
      </section>

      {/* Chapter 1: The Vision */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-brand-rose font-bold block">
              The Genesis
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-charcoal font-medium">
              Reviving Mughal Grandeur with Mindful Minimalist Silhouettes
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
              Aleyza was founded with a singular conviction: that Pakistani artisan heritage shouldn&apos;t be confined to heavy once-a-year bridal wear, nor diluted by disposable fast fashion. We set out to design heirloom pieces in pure, breathable raw silks, fine Swiss lawn, and luxurious micro velvet that make women feel regal every day.
            </p>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
              Every Kalidar, Peshwas, and Co-Ord Set is meticulously tailored in small artisanal batches to eliminate excess waste, celebrate slow fashion, and preserve indigenous handcrafting traditions.
            </p>
          </div>

          <div className="relative aspect-[4/3] rounded overflow-hidden shadow-card border border-brand-border">
            <Image
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80"
              alt="Aleyza Heritage Kalidar"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Atelier Locations */}
      <section className="py-20 bg-brand-sand/60 border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[11px] uppercase tracking-[0.25em] text-brand-rose font-bold block mb-2">
            Flagship Sanctuaries
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-charcoal font-medium mb-12">
            Our Ateliers &amp; Showrooms
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="p-8 bg-white rounded border border-brand-border shadow-subtle space-y-3">
              <div className="flex items-center gap-2 text-brand-rose">
                <MapPin className="w-5 h-5" />
                <h3 className="font-serif text-xl font-semibold text-brand-charcoal">
                  Lahore Flagship Atelier
                </h3>
              </div>
              <p className="text-xs text-brand-charcoal font-medium">
                14-L, Mini Market, Gulberg III, Lahore, Punjab
              </p>
              <p className="text-xs text-brand-muted leading-relaxed">
                Our main design house, sampling studio, and couture consultation suite. Housing our archival collections, master pattern cutters, and hand-embroidery karigars.
              </p>
              <p className="text-xs text-brand-charcoal pt-2">
                <strong>Hours:</strong> Mon – Sat: 11:00 AM – 9:00 PM PKT
              </p>
            </div>

            <div className="p-8 bg-white rounded border border-brand-border shadow-subtle space-y-3">
              <div className="flex items-center gap-2 text-brand-rose">
                <MapPin className="w-5 h-5" />
                <h3 className="font-serif text-xl font-semibold text-brand-charcoal">
                  Karachi Prêt Boutique
                </h3>
              </div>
              <p className="text-xs text-brand-charcoal font-medium">
                Plot 22-C, 7th Zamzama Commercial Lane, Phase 5, DHA, Karachi
              </p>
              <p className="text-xs text-brand-muted leading-relaxed">
                A serene minimalist space curated with our newest luxury linen co-ords, chiffon sarees, leathergoods, and bespoke jewelry capsules.
              </p>
              <p className="text-xs text-brand-charcoal pt-2">
                <strong>Hours:</strong> Mon – Sun: 12:00 PM – 10:00 PM PKT
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center max-w-xl mx-auto px-4">
        <h2 className="font-serif text-3xl text-brand-charcoal font-medium mb-4">
          Experience the Aleyza Difference
        </h2>
        <p className="text-xs sm:text-sm text-brand-muted mb-8 leading-relaxed">
          Complimentary express delivery nationwide. Explore our latest couture arrivals today.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-charcoal text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-brand-brown transition-colors"
        >
          <span>Shop New Arrivals</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
