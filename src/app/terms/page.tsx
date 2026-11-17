"use client";

import React from "react";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-[11px] uppercase tracking-[0.25em] text-brand-rose font-bold block mb-1">
          Legal Framework
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-brand-charcoal font-medium">
          Terms &amp; Conditions
        </h1>
        <p className="text-xs text-brand-muted mt-2">
          Aleyza Store (Pvt) Ltd • Applicable to all purchases made in Pakistan
        </p>
      </div>

      <div className="bg-white rounded border border-brand-border p-8 shadow-subtle space-y-6 text-xs sm:text-sm text-brand-charcoal leading-relaxed">
        <div>
          <h2 className="font-serif text-lg font-semibold mb-2">
            1. Ordering &amp; Contract Formation
          </h2>
          <p className="text-brand-muted">
            By placing an order on aleyzastore.pk, you warrant that you are at least 18 years of age and legally authorized to enter binding contracts. An order confirmation email signifies receipt of your order; the sales contract is finalized upon dispatch of the physical merchandise from our atelier.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-lg font-semibold mb-2">
            2. Pricing &amp; Currency
          </h2>
          <p className="text-brand-muted">
            All prices on this platform are quoted in Pakistani Rupees (PKR) and include all applicable provincial sales taxes. We reserve the right to correct pricing typographical errors prior to dispatch.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-lg font-semibold mb-2">
            3. Intellectual Property
          </h2>
          <p className="text-brand-muted">
            All textile patterns, embroidery artwork, editorial photography, typography, and brand identity assets are the exclusive intellectual property of Aleyza Store (Pvt) Ltd.
          </p>
        </div>
      </div>
    </div>
  );
}
