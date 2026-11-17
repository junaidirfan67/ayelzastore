"use client";

import React, { useState } from "react";
import {
  Radio,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Activity,
  Layers,
  Sparkles,
  Server,
  Globe,
  RefreshCw,
  Copy,
  Lock,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useStore } from "@/context/StoreContext";
import { formatDateTime } from "@/lib/utils";

export default function TrackingManagementPage() {
  const { trackingConfig, trackingEvents, trackEvent, addToast } = useStore();
  const [filterEvent, setFilterEvent] = useState<string>("all");

  const filteredEvents = trackingEvents.filter((e) => {
    if (filterEvent !== "all" && e.eventName !== filterEvent) return false;
    return true;
  });

  const handleSimulateEvent = (
    eventName: "PageView" | "ViewContent" | "AddToCart" | "InitiateCheckout" | "Purchase"
  ) => {
    trackEvent(
      eventName,
      {
        content_name: "Simulated Test Event",
        value: 18500,
        currency: "PKR",
        test_trigger: "Admin Console",
      },
      "Client (Browser Pixel)"
    );
    addToast(`Dispatched test ${eventName} event to Browser Pixel and Server CAPI.`, "success");
  };

  const integrations = [
    {
      name: "Meta Pixel (Client Browser)",
      id: trackingConfig.metaPixelId,
      status: "Connected",
      type: "Client-side JS",
      description: "Direct browser event dispatch with cookie & localStorage payload",
    },
    {
      name: "Meta Conversions API (CAPI)",
      id: "Server Endpoint: /api/capi",
      status: trackingConfig.metaCapiEnabled ? "Connected" : "Disabled",
      type: "Server-side CAPI",
      description: "Direct server-to-server dispatch with SHA256 hashed patron signals and deduplication",
    },
    {
      name: "Google Analytics 4 (GA4)",
      id: trackingConfig.ga4MeasurementId,
      status: "Connected",
      type: "Global Site Tag (gtag)",
      description: "Standard e-commerce measurement protocol streaming",
    },
    {
      name: "Google Tag Manager (GTM)",
      id: trackingConfig.gtmContainerId,
      status: "Connected",
      type: "Container Tag",
      description: "Centralized tag deployment container for Pakistani traffic",
    },
    {
      name: "Google Ads Enhanced Conversions",
      id: trackingConfig.googleAdsConversionId,
      status: "Connected",
      type: "Conversion Action",
      description: "High-intent search purchase tracking with enhanced customer match",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8 animate-fadeIn">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-rose">
                Data Infrastructure &amp; Signal Quality
              </span>
              <span className="flex items-center gap-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Event Match Quality: 9.2 / 10 (Great)</span>
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal">
              Pixel, CAPI &amp; Conversions Architecture
            </h1>
            <p className="text-xs text-brand-muted mt-1">
              Dual client-server event telemetry with automated deduplication across Meta &amp; Google Ads.
            </p>
          </div>

          {/* Test Event Simulator */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSimulateEvent("Purchase")}
              className="px-3 py-1.5 bg-brand-charcoal text-white text-xs font-semibold rounded hover:bg-brand-brown transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-rose" />
              <span>Simulate Live Purchase Signal</span>
            </button>
          </div>
        </div>

        {/* Server-Side Deduplication Architecture Diagram / Explainer */}
        <div className="bg-brand-sand/50 rounded border border-brand-border p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-brand-border">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-brand-rose" />
              <h3 className="font-serif text-base font-bold text-brand-charcoal">
                Dual Client &amp; Server-Side Event Deduplication Architecture
              </h3>
            </div>
            <span className="text-[11px] font-mono text-brand-muted">
              Standard: Meta Conversions API v18.0
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-white rounded border border-brand-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-brand-charcoal">1. Browser Pixel</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 font-mono">
                  Client JS
                </span>
              </div>
              <p className="text-brand-muted leading-relaxed">
                When a patron completes checkout, the browser pixel immediately fires a &apos;Purchase&apos; event with a unique generated <code className="bg-brand-sand px-1 rounded font-mono">deduplicationEventId</code> (e.g. <code className="font-mono">purch-ALZ-94821</code>).
              </p>
            </div>

            <div className="p-4 bg-white rounded border border-brand-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-brand-charcoal">2. Meta CAPI (Server)</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-50 text-purple-800 font-mono">
                  Server-to-Server
                </span>
              </div>
              <p className="text-brand-muted leading-relaxed">
                Concurrently, our secure Next.js backend dispatches the identical transaction over TLS to Meta Graph API using the exact same <code className="bg-brand-sand px-1 rounded font-mono">deduplicationEventId</code> and SHA256 hashed customer email/phone.
              </p>
            </div>

            <div className="p-4 bg-white rounded border border-brand-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-brand-charcoal">3. Meta Deduplication</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 font-mono">
                  Automated
                </span>
              </div>
              <p className="text-brand-muted leading-relaxed">
                Meta Events Manager matches both signals via <code className="bg-brand-sand px-1 rounded font-mono">event_id</code>, deduplicating them into 1 single verified purchase. Ad blockers do not drop the transaction, preventing revenue underreporting.
              </p>
            </div>
          </div>
        </div>

        {/* Integration Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded border border-brand-border p-4 shadow-subtle space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono uppercase text-brand-muted font-bold">
                    {item.type}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {item.status}
                  </span>
                </div>
                <h4 className="font-serif text-sm font-bold text-brand-charcoal">
                  {item.name}
                </h4>
                <p className="text-[11px] text-brand-muted mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-2 border-t border-brand-border/60">
                <span className="text-[10px] text-brand-muted block font-semibold">
                  Identifier / Endpoint:
                </span>
                <span className="font-mono text-xs text-brand-charcoal truncate block font-bold">
                  {item.id}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Real-Time Live Telemetry Event Stream */}
        <div className="bg-white rounded border border-brand-border shadow-subtle overflow-hidden">
          <div className="p-4 border-b border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-brand-rose animate-pulse" />
              <h3 className="font-serif text-base font-bold text-brand-charcoal">
                Live E-Commerce Signal Stream (Meta &amp; Google)
              </h3>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-brand-muted">Filter:</span>
              <select
                value={filterEvent}
                onChange={(e) => setFilterEvent(e.target.value)}
                className="px-2.5 py-1 border border-brand-border rounded bg-brand-ivory text-brand-charcoal"
              >
                <option value="all">All Standard Events</option>
                <option value="PageView">PageView</option>
                <option value="ViewContent">ViewContent</option>
                <option value="AddToCart">AddToCart</option>
                <option value="InitiateCheckout">InitiateCheckout</option>
                <option value="Purchase">Purchase</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-sand/70 text-brand-charcoal uppercase font-bold tracking-wider border-b border-brand-border sticky top-0 z-10">
                <tr>
                  <th className="py-3 px-4">Event Name</th>
                  <th className="py-3 px-4">Source Protocol</th>
                  <th className="py-3 px-4">Deduplication Key</th>
                  <th className="py-3 px-4">Payload Attributes</th>
                  <th className="py-3 px-4">Timestamp (PKT)</th>
                  <th className="py-3 px-4 text-center">Telemetry Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60 font-mono text-[11px]">
                {filteredEvents.map((evt) => (
                  <tr key={evt.id} className="hover:bg-brand-sand/30">
                    <td className="py-2.5 px-4 font-bold text-brand-charcoal">
                      <span className="px-2 py-0.5 bg-brand-sand rounded">
                        {evt.eventName}
                      </span>
                    </td>

                    <td className="py-2.5 px-4 font-sans text-brand-charcoal">
                      {evt.source}
                    </td>

                    <td className="py-2.5 px-4 text-brand-muted">
                      {evt.deduplicationEventId}
                    </td>

                    <td className="py-2.5 px-4 text-brand-muted max-w-xs truncate">
                      {JSON.stringify(evt.payload)}
                    </td>

                    <td className="py-2.5 px-4 font-sans text-brand-muted text-[10px]">
                      {formatDateTime(evt.timestamp)}
                    </td>

                    <td className="py-2.5 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded font-sans text-[10px] uppercase font-bold ${
                          evt.status === "processed"
                            ? "bg-purple-50 text-purple-800"
                            : evt.status === "deduplicated"
                            ? "bg-blue-50 text-blue-800"
                            : "bg-emerald-50 text-emerald-800"
                        }`}
                      >
                        {evt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
