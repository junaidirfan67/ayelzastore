"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, MessageSquare } from "lucide-react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does Cash on Delivery (COD) work across Pakistan?",
      a: "We offer Cash on Delivery to over 250 cities and towns in Pakistan through our trusted courier partners TCS Express and Leopards Courier. You simply pay the exact order amount in cash to the delivery rider upon receiving your package.",
    },
    {
      q: "What is the estimated delivery time for my order?",
      a: "For major metropolitan hubs (Lahore, Karachi, Islamabad, Rawalpindi), delivery takes 2 to 3 business days. For other cities (Faisalabad, Multan, Peshawar, Sialkot, Quetta, Hyderabad), delivery typically takes 3 to 4 business days. Same-day dispatch applies to orders placed before 2:00 PM PKT.",
    },
    {
      q: "Are shipping charges applied to my order?",
      a: "All domestic orders across Pakistan above Rs. 5,000 qualify for Complimentary Express Delivery. For orders below Rs. 5,000, a nominal flat courier fee of Rs. 250 is charged.",
    },
    {
      q: "What is your Return and Exchange policy?",
      a: "We offer an easy 7-day exchange window from the date of delivery. If the size does not fit or you wish to switch colors, contact our WhatsApp Concierge at +92 300 8491023. Garments must be unworn, in original unwashed condition with all brand tags and packaging intact.",
    },
    {
      q: "Are all garments true to Pakistani standard sizing?",
      a: "Yes. All our prêt and couture ensembles are tailored in standard Pakistani measurements (XS, S, M, L, XL). We provide a detailed Size Guide with bust, waist, hip, and length measurements in both inches and centimeters on every product page.",
    },
    {
      q: "Can I pay via Bank Transfer or Mobile Wallet?",
      a: "Absolutely. In addition to Cash on Delivery, we accept online bank transfers (Meezan Bank Ltd, HBL, Bank Alfalah) as well as instant Easypaisa and JazzCash mobile wallet payments.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <div className="w-12 h-12 rounded-full bg-brand-sand flex items-center justify-center mx-auto mb-3 text-brand-rose">
          <HelpCircle className="w-6 h-6" />
        </div>
        <span className="text-[11px] uppercase tracking-[0.25em] text-brand-rose font-bold block mb-1">
          Client Inquiries
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-brand-charcoal font-medium">
          Frequently Asked Questions
        </h1>
        <p className="text-xs text-brand-muted mt-2">
          Everything you need to know about shopping, sizing, deliveries, and exchanges at Aleyza Store.
        </p>
      </div>

      {/* Accordion FAQ items */}
      <div className="bg-white rounded border border-brand-border divide-y divide-brand-border/60 shadow-subtle overflow-hidden">
        {faqs.map((faq, idx) => (
          <div key={idx} className="p-5 sm:p-6 transition-colors">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg font-medium text-brand-charcoal hover:text-brand-rose transition-colors"
            >
              <span>{faq.q}</span>
              <ChevronDown
                className={`w-4 h-4 text-brand-muted transition-transform shrink-0 ${
                  openIndex === idx ? "rotate-180 text-brand-rose" : ""
                }`}
              />
            </button>

            {openIndex === idx && (
              <div className="mt-3 text-xs sm:text-sm text-brand-muted leading-relaxed animate-fadeIn">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Still need help strip */}
      <div className="mt-12 p-8 bg-brand-sand/60 rounded border border-brand-border text-center space-y-3">
        <h3 className="font-serif text-xl text-brand-charcoal font-medium">
          Have an unanswered question?
        </h3>
        <p className="text-xs text-brand-muted max-w-md mx-auto">
          Our Lahore client concierge is ready to assist you via WhatsApp or phone consultation.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-charcoal text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-brand-brown transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Contact Concierge</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
