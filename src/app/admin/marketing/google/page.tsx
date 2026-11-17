"use client";

import React, { useState } from "react";
import {
  Globe,
  Search,
  MousePointer,
  Target,
  DollarSign,
  TrendingUp,
  Key,
  ShieldCheck,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { MetricCard } from "@/components/admin/MetricCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { useStore } from "@/context/StoreContext";
import { formatPKR, formatNumber } from "@/lib/utils";

export default function GoogleAdsPage() {
  const { campaigns, trackingConfig, updateTrackingConfig } = useStore();
  const [activeTab, setActiveTab] = useState<"campaigns" | "settings">("campaigns");

  const [customerId, setCustomerId] = useState("982-102-4910");
  const [conversionId, setConversionId] = useState(trackingConfig.googleAdsConversionId);
  const [enhancedConversions, setEnhancedConversions] = useState(trackingConfig.googleAdsEnhancedConversions);
  const [saved, setSaved] = useState(false);

  const googleCampaigns = campaigns.filter((c) => c.channel === "google");
  const totalSpend = googleCampaigns.reduce((sum, c) => sum + c.totalSpend, 0);
  const totalRevenue = googleCampaigns.reduce((sum, c) => sum + c.revenue, 0);
  const googleROAS = totalSpend > 0 ? (totalRevenue / totalSpend).toFixed(2) : "0.0";
  const totalClicks = googleCampaigns.reduce((sum, c) => sum + c.clicks, 0);
  const totalImpressions = googleCampaigns.reduce((sum, c) => sum + c.impressions, 0);
  const totalConversions = googleCampaigns.reduce((sum, c) => sum + c.purchases, 0);
  const avgCPC = totalClicks > 0 ? (totalSpend / totalClicks).toFixed(2) : "0.0";
  const avgCTR = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : "0.0";
  const costPerConversion = totalConversions > 0 ? Math.round(totalSpend / totalConversions) : 0;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateTrackingConfig({
      googleAdsConversionId: conversionId,
      googleAdsEnhancedConversions: enhancedConversions,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AdminLayout>
      <div className="space-y-8 animate-fadeIn">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-rose">
                Search Intent &amp; Shopping Intelligence
              </span>
              <span className="flex items-center gap-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                <Globe className="w-3 h-3 text-blue-600" />
                <span>Google Ads (PMax &amp; Search)</span>
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal">
              Google Ads Performance &amp; Conversion Value
            </h1>
            <p className="text-xs text-brand-muted mt-1">
              Performance Max high-intent shopping and brand keyword protection in Pakistan.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              Enhanced Conversions Synced
            </span>
          </div>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <MetricCard
            title="Google Ads Spend"
            value={formatPKR(totalSpend)}
            subtitle="PMax & Brand Search"
            icon={DollarSign}
          />
          <MetricCard
            title="Google ROAS"
            value={`${googleROAS}x`}
            subtitle="Target: 4.50x"
            change={{ value: "+1.02x", positive: true }}
            icon={Target}
          />
          <MetricCard
            title="Cost Per Conversion"
            value={formatPKR(costPerConversion)}
            subtitle={`${totalConversions} online purchases`}
            icon={MousePointer}
          />
          <MetricCard
            title="Avg CPC (Pakistan)"
            value={`Rs. ${avgCPC}`}
            subtitle={`Blended CTR: ${avgCTR}%`}
            icon={Search}
          />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-brand-border text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab("campaigns")}
            className={`pb-3 px-4 border-b-2 transition-colors ${
              activeTab === "campaigns"
                ? "border-brand-charcoal text-brand-charcoal font-bold"
                : "border-transparent text-brand-muted hover:text-brand-charcoal"
            }`}
          >
            Campaigns ({googleCampaigns.length})
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`pb-3 px-4 border-b-2 transition-colors ${
              activeTab === "settings"
                ? "border-brand-charcoal text-brand-charcoal font-bold"
                : "border-transparent text-brand-muted hover:text-brand-charcoal"
            }`}
          >
            Google Ads API Settings
          </button>
        </div>

        {activeTab === "campaigns" ? (
          <div className="bg-white rounded border border-brand-border shadow-subtle overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-sand/70 text-brand-charcoal uppercase font-bold tracking-wider border-b border-brand-border">
                  <tr>
                    <th className="py-3.5 px-4">Campaign Name</th>
                    <th className="py-3.5 px-4">Type</th>
                    <th className="py-3.5 px-4">Ad Spend</th>
                    <th className="py-3.5 px-4">Impressions</th>
                    <th className="py-3.5 px-4">Clicks (CTR)</th>
                    <th className="py-3.5 px-4">Avg CPC</th>
                    <th className="py-3.5 px-4">Conversions</th>
                    <th className="py-3.5 px-4">Conversion Value</th>
                    <th className="py-3.5 px-4">ROAS</th>
                    <th className="py-3.5 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/60">
                  {googleCampaigns.map((c) => (
                    <tr key={c.id} className="hover:bg-brand-sand/30">
                      <td className="py-3 px-4 font-semibold text-brand-charcoal">
                        {c.name}
                      </td>
                      <td className="py-3 px-4 text-brand-muted">{c.objective}</td>
                      <td className="py-3 px-4 font-mono font-medium">
                        {formatPKR(c.totalSpend)}
                      </td>
                      <td className="py-3 px-4">{formatNumber(c.impressions)}</td>
                      <td className="py-3 px-4">
                        {formatNumber(c.clicks)} ({c.ctr}%)
                      </td>
                      <td className="py-3 px-4 font-mono">Rs. {c.cpc}</td>
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
        ) : (
          <div className="max-w-xl bg-white rounded border border-brand-border p-6 shadow-subtle space-y-4 text-xs">
            <div>
              <h3 className="font-serif text-base font-bold text-brand-charcoal">
                Google Ads Integration &amp; Enhanced Conversions
              </h3>
              <p className="text-brand-muted mt-0.5">
                Link your Google Ads MCC account and conversion actions.
              </p>
            </div>

            {saved && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Google Ads tracking configuration saved successfully.</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-brand-charcoal font-medium mb-1">
                  Google Ads Customer Account ID
                </label>
                <input
                  type="text"
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  className="w-full font-mono px-3 py-2 border border-brand-border rounded focus:outline-none focus:border-brand-rose bg-brand-ivory"
                />
              </div>

              <div>
                <label className="block text-brand-charcoal font-medium mb-1">
                  Conversion Action Tag ID
                </label>
                <input
                  type="text"
                  value={conversionId}
                  onChange={(e) => setConversionId(e.target.value)}
                  className="w-full font-mono px-3 py-2 border border-brand-border rounded focus:outline-none focus:border-brand-rose bg-brand-ivory"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-brand-charcoal">
                  <input
                    type="checkbox"
                    checked={enhancedConversions}
                    onChange={(e) => setEnhancedConversions(e.target.checked)}
                    className="rounded text-brand-charcoal"
                  />
                  <span>Enable Google Ads Enhanced Conversions (SHA256 Hashing)</span>
                </label>
              </div>

              <div className="pt-4 border-t border-brand-border flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-brand-charcoal text-white font-semibold uppercase tracking-wider rounded hover:bg-brand-brown"
                >
                  Save Google Ads Settings
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
