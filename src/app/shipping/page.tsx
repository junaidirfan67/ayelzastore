"use client";

import React from "react";
import Link from "next/link";
import { Truck, ShieldCheck, Clock, MapPin, ArrowRight } from "lucide-react";

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-xl mx-auto mb-12">
        <div className="w-12 h-12 rounded-full bg-brand-sand flex items-center justify-center mx-auto mb-3 text-brand-rose">
          <Truck className="w-6 h-6" />
        </div>
        <span className="text-[11px] uppercase tracking-[0.25em] text-brand-rose font-bold block mb-1">
          Delivery Policy
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-brand-charcoal font-medium">
          Shipping &amp; Courier Delivery
        </h1>
        <p className="text-xs text-brand-muted mt-2">
          Express delivery across Pakistan through TCS Express and Leopards Courier.
        </p>
      </div>

      <div className="bg-white rounded border border-brand-border p-8 shadow-subtle space-y-8 text-xs sm:text-sm text-brand-charcoal leading-relaxed">
        <div>
          <h2 className="font-serif text-lg font-semibold mb-2">
            1. Domestic Shipping Coverage
          </h2>
          <p className="text-brand-muted">
            Aleyza Store delivers to more than 250 cities, towns, and districts across Pakistan, including Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan, Islamabad Capital Territory, Gilgit-Baltistan, and Azad Jammu &amp; Kashmir.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-lg font-semibold mb-2">
            2. Delivery Rates &amp; Free Shipping
          </h2>
          <ul className="list-disc list-inside space-y-1 text-brand-muted">
            <li>
              <strong>Complimentary Express Delivery:</strong> All orders above Rs. 5,000 enjoy 100% free delivery nationwide.
            </li>
            <li>
              <strong>Standard Courier Charge:</strong> A flat rate of Rs. 250 applies to orders below Rs. 5,000.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-lg font-semibold mb-2">
            3. Delivery Timelines
          </h2>
          <div className="overflow-x-auto border border-brand-border rounded mt-3">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-sand font-semibold text-brand-charcoal">
                <tr>
                  <th className="p-3">Destination Hub</th>
                  <th className="p-3">Courier</th>
                  <th className="p-3">Timeline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border text-brand-muted">
                <tr>
                  <td className="p-3 font-medium text-brand-charcoal">
                    Lahore, Karachi, Islamabad, Rawalpindi
                  </td>
                  <td className="p-3">TCS Express Overnight</td>
                  <td className="p-3">2 to 3 Business Days</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-brand-charcoal">
                    Faisalabad, Multan, Peshawar, Sialkot, Gujranwala
                  </td>
                  <td className="p-3">TCS / Leopards Courier</td>
                  <td className="p-3">3 to 4 Business Days</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-brand-charcoal">
                    Quetta, Gilgit, Sukkur, Hyderabad, Rural Districts
                  </td>
                  <td className="p-3">TCS Priority</td>
                  <td className="p-3">4 to 5 Business Days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-lg font-semibold mb-2">
            4. Real-Time Tracking &amp; Delivery Verification
          </h2>
          <p className="text-brand-muted">
            Once your order is hand-inspected and dispatched from our Lahore atelier, you will receive an SMS and email notification with your TCS or Leopards tracking consignment number. You may also track it anytime on our{" "}
            <Link href="/track" className="text-brand-rose underline font-semibold">
              Track Consignment
            </Link>{" "}
            portal.
          </p>
        </div>
      </div>
    </div>
  );
}
