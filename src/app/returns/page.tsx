"use client";

import React from "react";
import Link from "next/link";
import { RotateCcw, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function ReturnsPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-xl mx-auto mb-12">
        <div className="w-12 h-12 rounded-full bg-brand-sand flex items-center justify-center mx-auto mb-3 text-brand-rose">
          <RotateCcw className="w-6 h-6" />
        </div>
        <span className="text-[11px] uppercase tracking-[0.25em] text-brand-rose font-bold block mb-1">
          Hassle-Free Exchanges
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-brand-charcoal font-medium">
          Returns &amp; Exchange Policy
        </h1>
        <p className="text-xs text-brand-muted mt-2">
          Your happiness with every stitch is our highest commitment.
        </p>
      </div>

      <div className="bg-white rounded border border-brand-border p-8 shadow-subtle space-y-6 text-xs sm:text-sm text-brand-charcoal leading-relaxed">
        <div>
          <h2 className="font-serif text-lg font-semibold mb-2">
            1. 7-Day Exchange Window
          </h2>
          <p className="text-brand-muted">
            We offer an easy 7-day exchange window from the date your order is successfully delivered by the courier. If your garment does not fit as desired or you wish to change colors or styles, we will gladly arrange a reverse courier pickup.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-lg font-semibold mb-2">
            2. Exchange Conditions
          </h2>
          <ul className="list-disc list-inside space-y-1.5 text-brand-muted">
            <li>Garments must be unworn, undamaged, unwashed, and unironed.</li>
            <li>All original designer tags, safety seals, and packaging boxes must remain intact.</li>
            <li>Proof of purchase (Order number #ALZ-XXXXX or digital invoice) is required.</li>
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-lg font-semibold mb-2">
            3. How to Initiate an Exchange
          </h2>
          <p className="text-brand-muted">
            Simply send a WhatsApp message to our Concierge team at <strong>+92 300 8491023</strong> or email <strong>concierge@aleyzastore.pk</strong> with your order reference number and the desired replacement size. Our team will coordinate the pickup and dispatch of your replacement piece.
          </p>
        </div>
      </div>
    </div>
  );
}
