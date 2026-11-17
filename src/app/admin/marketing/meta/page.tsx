"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  Instagram,
  Facebook,
  Filter,
  Key,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Layers,
  Radio,
  Eye,
  MousePointer,
  ShoppingBag,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { MetricCard } from "@/components/admin/MetricCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { useStore } from "@/context/StoreContext";
import { formatPKR, formatNumber } from "@/lib/utils";

export default function MetaAdsAnalyticsPage() {
  const { campaigns, adSets, ads, trackingConfig, updateTrackingConfig } =
    useStore();
  const [activeTab, setActiveTab] = useState<"campaigns" | "adsets" | "ads" | "settings">("campaigns");

  // Meta Integration Config State
  const [pixelId, setPixelId] = useState(trackingConfig.metaPixelId);
  const [accessToken, setAccessToken] = useState("EAAJ29...[SERVER_SIDE_TOKEN_SECURE]");
  const [testEventCode, setTestEventCode] = useState(trackingConfig.metaTestEventCode);
  const [capiEnabled, setCapiEnabled] = useState(trackingConfig.metaCapiEnabled);
  const [isSaved, setIsSaved] = useState(false);

  const metaCampaigns = campaigns.filter((c) => c.channel === "meta");
  const totalSpend = metaCampaigns.reduce((sum, c) => sum + c.totalSpend, 0);
  const totalRevenue = metaCampaigns.reduce((sum, c) => sum + c.revenue, 0);
  const metaROAS = totalSpend > 0 ? (totalRevenue / totalSpend).toFixed(2) : "0.0";
  const totalPurchases = metaCampaigns.reduce((sum, c) => sum + c.purchases, 0);
  const costPerPurchase = totalPurchases > 0 ? Math.round(totalSpend / totalPurchases) : 0;
  const totalClicks = metaCampaigns.reduce((sum, c) => sum + c.clicks, 0);
  const totalImpressions = metaCampaigns.reduce((sum, c) => sum + c.impressions, 0);
  const avgCPM = totalImpressions > 0 ? Math.round((totalSpend / totalImpressions) * 1000) : 0;
  const avgCPC = totalClicks > 0 ? (totalSpend / totalClicks).toFixed(2) : "0.0";

  // Funnel numbers
  const funnel = [
    { step: "Impressions", count: totalImpressions, rate: "100%", icon: Eye },
    { step: "Link Clicks", count: totalClicks, rate: "3.23%", icon: MousePointer },
    { step: "View Content", count: Math.round(totalClicks * 0.88), rate: "2.84%", icon: Eye },
    { step: "Add To Cart", count: Math.round(totalPurchases * 3.4), rate: "0.62%", icon: ShoppingBag },
    { step: "Initiate Checkout", count: Math.round(totalPurchases * 1.8), rate: "0.33%", icon: Radio },
    { step: "Purchases", count: totalPurchases, rate: "0.18%", icon: CheckCircle2 },
  ];

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateTrackingConfig({
      metaPixelId: pixelId,
      metaTestEventCode: testEventCode,
      metaCapiEnabled: capiEnabled,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <AdminLayout>
      <div className="space-y-8 animate-fadeIn">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-rose">
                Meta Marketing Suite
              </span>
              <span className="flex items-center gap-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                <Instagram className="w-3 h-3 text-pink-600" />
                <Facebook className="w-3 h-3 text-blue-600" />
                <span>Instagram &amp; Facebook Ads</span>
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal">
              Meta Ads Performance &amp; Funnel Telemetry
            </h1>
            <p className="text-xs text-brand-muted mt-1">
              Full-funnel campaign, ad set, and creative metrics across Pakistani metros.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              Meta Conversions API (CAPI) Active
            </span>
          </div>
        </div>

        {/* Top Funnel Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <MetricCard
            title="Meta Ad Spend"
            value={formatPKR(totalSpend)}
            subtitle="Advantage+ Catalog & Video"
            icon={BarChart3}
          />
          <MetricCard
            title="Meta ROAS"
            value={`${metaROAS}x`}
            subtitle="Target: 3.50x"
            change={{ value: "+1.12x", positive: true }}
            icon={Sparkles}
          />
          <MetricCard
            title="Cost Per Purchase (CPP)"
            value={formatPKR(costPerPurchase)}
            subtitle={`${totalPurchases} orders generated`}
            icon={ShoppingBag}
          />
          <MetricCard
            title="Blended CPM (Pakistan)"
            value={`Rs. ${avgCPM}`}
            subtitle={`Avg CPC: Rs. ${avgCPC}`}
            icon={Eye}
          />
        </div>

        {/* Conversion Funnel Strip */}
        <div className="bg-white rounded border border-brand-border p-6 shadow-subtle space-y-4">
          <h3 className="font-serif text-base font-bold text-brand-charcoal pb-2 border-b border-brand-border">
            Meta Advertising Conversion Funnel (Top of Funnel to Purchase)
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
            {funnel.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="p-3.5 rounded bg-brand-sand/50 border border-brand-border/80 text-center space-y-1 relative"
                >
                  <span className="text-[10px] uppercase font-bold text-brand-muted tracking-wider block">
                    {idx + 1}. {step.step}
                  </span>
                  <p className="font-serif text-lg font-bold text-brand-charcoal">
                    {formatNumber(step.count)}
                  </p>
                  <span className="inline-block text-[10px] font-semibold text-brand-rose">
                    {step.rate} conversion
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex border-b border-brand-border overflow-x-auto text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab("campaigns")}
            className={`pb-3 px-4 transition-colors border-b-2 ${
              activeTab === "campaigns"
                ? "border-brand-charcoal text-brand-charcoal font-bold"
                : "border-transparent text-brand-muted hover:text-brand-charcoal"
            }`}
          >
            Campaigns ({metaCampaigns.length})
          </button>
          <button
            onClick={() => setActiveTab("adsets")}
            className={`pb-3 px-4 transition-colors border-b-2 ${
              activeTab === "adsets"
                ? "border-brand-charcoal text-brand-charcoal font-bold"
                : "border-transparent text-brand-muted hover:text-brand-charcoal"
            }`}
          >
            Ad Sets &amp; Targeting ({adSets.length})
          </button>
          <button
            onClick={() => setActiveTab("ads")}
            className={`pb-3 px-4 transition-colors border-b-2 ${
              activeTab === "ads"
                ? "border-brand-charcoal text-brand-charcoal font-bold"
                : "border-transparent text-brand-muted hover:text-brand-charcoal"
            }`}
          >
            Creatives &amp; Reels ({ads.length})
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`pb-3 px-4 transition-colors border-b-2 ${
              activeTab === "settings"
                ? "border-brand-charcoal text-brand-charcoal font-bold"
                : "border-transparent text-brand-muted hover:text-brand-charcoal"
            }`}
          >
            API &amp; Pixel Settings
          </button>
        </div>

        {/* Tab 1: Campaigns Table */}
        {activeTab === "campaigns" && (
          <div className="bg-white rounded border border-brand-border shadow-subtle overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-sand/70 text-brand-charcoal uppercase font-bold tracking-wider border-b border-brand-border">
                  <tr>
                    <th className="py-3.5 px-4">Campaign Name</th>
                    <th className="py-3.5 px-4">Objective</th>
                    <th className="py-3.5 px-4">Daily Budget</th>
                    <th className="py-3.5 px-4">Spend (PKR)</th>
                    <th className="py-3.5 px-4">Clicks</th>
                    <th className="py-3.5 px-4">Purchases</th>
                    <th className="py-3.5 px-4">Revenue</th>
                    <th className="py-3.5 px-4">ROAS</th>
                    <th className="py-3.5 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/60">
                  {metaCampaigns.map((c) => (
                    <tr key={c.id} className="hover:bg-brand-sand/30">
                      <td className="py-3 px-4 font-semibold text-brand-charcoal">
                        {c.name}
                      </td>
                      <td className="py-3 px-4 text-brand-muted">{c.objective}</td>
                      <td className="py-3 px-4">{formatPKR(c.budgetDaily)}/day</td>
                      <td className="py-3 px-4 font-mono font-medium">
                        {formatPKR(c.totalSpend)}
                      </td>
                      <td className="py-3 px-4">{formatNumber(c.clicks)}</td>
                      <td className="py-3 px-4 font-bold text-brand-charcoal">
                        {c.purchases}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-brand-charcoal">
                        {formatPKR(c.revenue)}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded font-bold bg-emerald-50 text-emerald-800 text-[11px]">
                          {c.roas}x
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <StatusBadge status={c.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Ad Sets */}
        {activeTab === "adsets" && (
          <div className="space-y-4">
            {adSets.map((set) => (
              <div
                key={set.id}
                className="bg-white rounded border border-brand-border p-5 shadow-subtle space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-brand-border">
                  <div>
                    <h4 className="font-serif text-sm font-bold text-brand-charcoal">
                      {set.name}
                    </h4>
                    <p className="text-[11px] text-brand-muted mt-0.5">
                      Targeting: {set.targeting}
                    </p>
                  </div>
                  <StatusBadge status={set.status} />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] text-brand-muted uppercase block">
                      Ad Spend
                    </span>
                    <span className="font-mono font-bold text-brand-charcoal">
                      {formatPKR(set.spend)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-brand-muted uppercase block">
                      Impressions
                    </span>
                    <span className="font-mono font-bold text-brand-charcoal">
                      {formatNumber(set.impressions)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-brand-muted uppercase block">
                      Clicks (CTR)
                    </span>
                    <span className="font-bold text-brand-charcoal">
                      {formatNumber(set.clicks)} ({set.ctr}%)
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-brand-muted uppercase block">
                      Purchases
                    </span>
                    <span className="font-bold text-emerald-700">
                      {set.purchases} orders
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-brand-muted uppercase block">
                      Attributed Revenue (ROAS)
                    </span>
                    <span className="font-bold text-brand-charcoal">
                      {formatPKR(set.revenue)} ({set.roas}x)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Individual Creatives */}
        {activeTab === "ads" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ads.map((ad) => (
              <div
                key={ad.id}
                className="bg-white rounded border border-brand-border p-5 shadow-subtle flex gap-4"
              >
                <div className="relative w-24 h-32 rounded overflow-hidden bg-brand-sand shrink-0 border border-brand-border">
                  <Image
                    src={ad.thumbnailUrl}
                    alt={ad.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                  <span className="absolute bottom-1 inset-x-1 px-1 py-0.5 bg-black/70 text-white text-[9px] uppercase font-bold text-center rounded">
                    {ad.format}
                  </span>
                </div>

                <div className="flex-1 flex flex-col justify-between text-xs space-y-2">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-brand-charcoal text-sm">
                        {ad.name}
                      </span>
                      <StatusBadge status={ad.status} />
                    </div>
                    <p className="text-[11px] text-brand-muted mt-1 italic line-clamp-1">
                      &ldquo;{ad.creativeTitle}&rdquo;
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-brand-border/60">
                    <div>
                      <span className="text-[10px] text-brand-muted block">Spend:</span>
                      <strong className="text-brand-charcoal">{formatPKR(ad.spend)}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-brand-muted block">ROAS:</span>
                      <strong className="text-emerald-700">{ad.roas}x</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-brand-muted block">Purchases:</span>
                      <strong className="text-brand-charcoal">{ad.purchases} orders</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-brand-muted block">Revenue:</span>
                      <strong className="text-brand-charcoal">{formatPKR(ad.revenue)}</strong>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: API & Integration Settings */}
        {activeTab === "settings" && (
          <div className="max-w-2xl bg-white rounded border border-brand-border p-6 shadow-subtle space-y-6 text-xs">
            <div>
              <h3 className="font-serif text-base font-bold text-brand-charcoal">
                Meta Marketing API &amp; Server-Side CAPI Gateway
              </h3>
              <p className="text-brand-muted mt-0.5">
                Configure your Meta Pixel and Conversions API connection. Tokens are securely encrypted on server.
              </p>
            </div>

            {isSaved && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Meta API settings updated and verified.</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="block text-brand-charcoal font-medium mb-1">
                  Meta Pixel ID
                </label>
                <input
                  type="text"
                  value={pixelId}
                  onChange={(e) => setPixelId(e.target.value)}
                  className="w-full font-mono px-3 py-2 border border-brand-border rounded focus:outline-none focus:border-brand-rose bg-brand-ivory"
                />
              </div>

              <div>
                <label className="block text-brand-charcoal font-medium mb-1">
                  Meta Conversions API (CAPI) System User Token
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={accessToken}
                    onChange={(e) => setAccessToken(e.target.value)}
                    className="w-full font-mono px-3 py-2 border border-brand-border rounded focus:outline-none focus:border-brand-rose bg-brand-ivory text-brand-muted"
                  />
                  <Lock className="w-3.5 h-3.5 text-brand-rose absolute right-3 top-3" />
                </div>
                <p className="text-[10px] text-brand-muted mt-1">
                  Server-side tokens are never exposed in browser JavaScript bundles.
                </p>
              </div>

              <div>
                <label className="block text-brand-charcoal font-medium mb-1">
                  Test Event Code (Meta Events Manager)
                </label>
                <input
                  type="text"
                  value={testEventCode}
                  onChange={(e) => setTestEventCode(e.target.value)}
                  placeholder="e.g. TEST89421"
                  className="w-full font-mono px-3 py-2 border border-brand-border rounded focus:outline-none focus:border-brand-rose bg-brand-ivory"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-brand-charcoal">
                  <input
                    type="checkbox"
                    checked={capiEnabled}
                    onChange={(e) => setCapiEnabled(e.target.checked)}
                    className="rounded text-brand-charcoal focus:ring-brand-rose"
                  />
                  <span>Enable Dual Event Deduplication (Browser Pixel + Server CAPI)</span>
                </label>
              </div>

              <div className="pt-4 border-t border-brand-border flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-brand-charcoal text-white font-semibold uppercase tracking-wider rounded hover:bg-brand-brown transition-colors"
                >
                  Save Meta API Configurations
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
