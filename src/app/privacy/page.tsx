"use client";

import React from "react";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-[11px] uppercase tracking-[0.25em] text-brand-rose font-bold block mb-1">
          Trust &amp; Transparency
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-brand-charcoal font-medium">
          Privacy Policy
        </h1>
        <p className="text-xs text-brand-muted mt-2">
          Last revised: November 2026
        </p>
      </div>

      <div className="bg-white rounded border border-brand-border p-8 shadow-subtle space-y-6 text-xs sm:text-sm text-brand-charcoal leading-relaxed">
        <div>
          <h2 className="font-serif text-lg font-semibold mb-2">
            1. Information Collection
          </h2>
          <p className="text-brand-muted">
            Aleyza Store (Pvt) Ltd collects customer information necessary to process orders, facilitate courier deliveries across Pakistan, prevent fraudulent transactions, and deliver personalized couture recommendations. We do not sell your personal data to third parties.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-lg font-semibold mb-2">
            2. Payment Security
          </h2>
          <p className="text-brand-muted">
            We adhere to strict banking encryption protocols. When paying via debit or credit card, sensitive cardholder data is tokenized through 3D-Secure certified payment gateways and never stored on our local web servers.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-lg font-semibold mb-2">
            3. Server-Side Tracking &amp; Meta Conversions API
          </h2>
          <p className="text-brand-muted">
            We utilize standardized e-commerce conversion tracking (Meta Pixel, Meta Conversions API, Google Analytics 4) to monitor store performance. All server-side conversion signals are hashed and deduplicated using unique event identifiers to safeguard patron privacy.
          </p>
        </div>
      </div>
    </div>
  );
}
