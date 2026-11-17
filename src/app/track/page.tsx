"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Compass,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  Package,
  MapPin,
  Calendar,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatPKR, formatDate, formatDateTime } from "@/lib/utils";

function TrackContent() {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get("orderId") || "";
  const { orders, getOrderByNumber } = useStore();

  const [orderQuery, setOrderQuery] = useState(initialOrderId);
  const [searchedOrder, setSearchedOrder] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (initialOrderId) {
      handleSearch(initialOrderId);
    }
  }, [initialOrderId]);

  const handleSearch = (queryToUse?: string) => {
    const q = (queryToUse || orderQuery).trim();
    setHasSearched(true);
    setErrorMsg("");

    if (!q) {
      setErrorMsg("Please enter an order reference number (e.g. ALZ-94821).");
      setSearchedOrder(null);
      return;
    }

    const matched = getOrderByNumber(q);
    if (matched) {
      setSearchedOrder(matched);
    } else {
      setErrorMsg(`No consignment found matching order number "${q}". Please check the digits and try again.`);
      setSearchedOrder(null);
    }
  };

  const steps = [
    { title: "Order Placed", desc: "Online checkout recorded", key: "pending" },
    { title: "Confirmed", desc: "Payment & details verified", key: "confirmed" },
    { title: "Atelier Packing", desc: "Hand-inspection & box packaging", key: "processing" },
    { title: "In Transit", desc: "Dispatched via TCS Express", key: "shipped" },
    { title: "Delivered", desc: "Received at doorstep", key: "delivered" },
  ];

  const getStepStatus = (stepKey: string, currentStatus: string) => {
    const orderRanks: Record<string, number> = {
      pending: 1,
      confirmed: 2,
      processing: 3,
      shipped: 4,
      delivered: 5,
    };
    const currentRank = orderRanks[currentStatus] || 1;
    const thisRank = orderRanks[stepKey] || 1;

    if (currentRank > thisRank) return "completed";
    if (currentRank === thisRank) return "active";
    return "upcoming";
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="w-12 h-12 rounded-full bg-brand-sand flex items-center justify-center mx-auto mb-3 text-brand-rose">
          <Compass className="w-6 h-6" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-brand-charcoal font-medium">
          Track Your Consignment
        </h1>
        <p className="text-xs text-brand-muted mt-2">
          Monitor your order status in real time from our Lahore atelier to your doorstep.
        </p>
      </div>

      {/* Search Input Card */}
      <div className="bg-white rounded border border-brand-border p-6 shadow-subtle mb-10 max-w-xl mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex flex-col sm:flex-row gap-2"
        >
          <input
            type="text"
            value={orderQuery}
            onChange={(e) => setOrderQuery(e.target.value)}
            placeholder="Enter Order Number (e.g. ALZ-94821)"
            className="flex-1 uppercase font-mono px-4 py-2.5 border border-brand-border rounded text-xs text-brand-charcoal focus:outline-none focus:border-brand-rose bg-brand-ivory"
          />
          <button
            type="submit"
            className="px-6 py-2.5 bg-brand-charcoal text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-brand-brown transition-colors flex items-center justify-center gap-2"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Track</span>
          </button>
        </form>

        {errorMsg && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Quick Example order buttons */}
        <div className="mt-4 pt-4 border-t border-brand-border flex items-center justify-between text-[11px] text-brand-muted">
          <span>Try example orders:</span>
          <div className="flex gap-2">
            {orders.slice(0, 3).map((ord) => (
              <button
                key={ord.id}
                type="button"
                onClick={() => {
                  setOrderQuery(ord.orderNumber);
                  handleSearch(ord.orderNumber);
                }}
                className="font-mono px-2 py-0.5 bg-brand-sand rounded hover:bg-brand-border text-brand-charcoal"
              >
                #{ord.orderNumber}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Track Result Card */}
      {searchedOrder && (
        <div className="bg-white rounded border border-brand-border shadow-subtle overflow-hidden animate-slideUp">
          {/* Header */}
          <div className="p-6 bg-brand-sand/50 border-b border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-brand-muted">
                Order Consignment Reference
              </span>
              <h2 className="font-mono text-lg font-bold text-brand-charcoal">
                #{searchedOrder.orderNumber}
              </h2>
              <span className="text-xs text-brand-muted">
                Placed on {formatDateTime(searchedOrder.date)}
              </span>
            </div>

            <div className="text-right sm:text-right">
              <span className="text-[10px] uppercase font-bold text-brand-muted block">
                Current Status
              </span>
              <span className="inline-block px-3 py-1 mt-1 rounded text-xs uppercase font-bold bg-brand-charcoal text-white">
                {searchedOrder.status}
              </span>
            </div>
          </div>

          {/* Stepper Visualizer */}
          <div className="p-6 sm:p-8 border-b border-brand-border">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {steps.map((st, idx) => {
                const status = getStepStatus(st.key, searchedOrder.status);
                return (
                  <div key={st.key} className="flex flex-col items-center text-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs mb-2 transition-all ${
                        status === "completed"
                          ? "bg-emerald-600 text-white"
                          : status === "active"
                          ? "bg-brand-charcoal text-white ring-4 ring-brand-sand"
                          : "bg-brand-sand text-brand-muted"
                      }`}
                    >
                      {status === "completed" ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        idx + 1
                      )}
                    </div>
                    <span className="text-xs font-bold text-brand-charcoal">
                      {st.title}
                    </span>
                    <span className="text-[10px] text-brand-muted mt-0.5 max-w-[120px]">
                      {st.desc}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Courier Details */}
          <div className="p-6 bg-brand-sand/30 border-b border-brand-border grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            <div>
              <span className="text-brand-muted block mb-1">Courier Partner</span>
              <p className="font-bold text-brand-charcoal">
                {searchedOrder.courier || "TCS Express Logistics"}
              </p>
            </div>
            <div>
              <span className="text-brand-muted block mb-1">Tracking Consignment #</span>
              <p className="font-mono font-bold text-brand-charcoal">
                {searchedOrder.trackingNumber || "Assigned upon dispatch"}
              </p>
            </div>
            <div>
              <span className="text-brand-muted block mb-1">Destination City</span>
              <p className="font-bold text-brand-charcoal">
                {searchedOrder.customer.city}, {searchedOrder.customer.province}
              </p>
            </div>
          </div>

          {/* Timeline Audit Logs */}
          <div className="p-6">
            <h3 className="font-serif text-sm font-semibold text-brand-charcoal mb-4">
              Consignment Event History
            </h3>
            <div className="space-y-4 text-xs">
              {searchedOrder.timeline.map((item: any, i: number) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-rose mt-1 shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-brand-charcoal uppercase text-[11px]">
                      {item.status}
                    </p>
                    <p className="text-brand-muted text-[11px] mt-0.5">
                      {item.note}
                    </p>
                  </div>
                  <span className="text-[10px] text-brand-muted shrink-0">
                    {formatDateTime(item.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-xs">Loading consignment tracker...</div>}>
      <TrackContent />
    </Suspense>
  );
}
