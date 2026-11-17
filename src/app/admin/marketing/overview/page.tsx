"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Eye,
  MousePointer,
  Target,
  BarChart3,
  Globe,
  Radio,
  ArrowRight,
  Filter,
  Calendar,
  Layers,
  Sparkles,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { MetricCard } from "@/components/admin/MetricCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { useStore } from "@/context/StoreContext";
import { formatPKR, formatNumber } from "@/lib/utils";

export default function MarketingOverviewPage() {
  const { campaigns, trafficSources } = useStore();
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d");

  // Aggregated Marketing KPIs
  const totalAdSpend = campaigns.reduce((sum, c) => sum + c.totalSpend, 0);
  const totalAttributedRevenue = campaigns.reduce((sum, c) => sum + c.revenue, 0);
  const blendedROAS = totalAdSpend > 0 ? (totalAttributedRevenue / totalAdSpend).toFixed(2) : "0.0";
  const totalPurchases = campaigns.reduce((sum, c) => sum + c.purchases, 0);
  const costPerPurchase = totalPurchases > 0 ? Math.round(totalAdSpend / totalPurchases) : 0;
  const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);
  const totalImpressions = campaigns.reduce((sum, c) => sum + c.impressions, 0);
  const blendedCTR = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : "0.0";
  const avgCPC = totalClicks > 0 ? (totalAdSpend / totalClicks).toFixed(2) : "0.0";
  const totalReach = Math.round(totalImpressions * 0.72);
  const estimatedCAC = costPerPurchase;

  // Revenue vs Ad Spend Chart Data
  const revenueSpendData = [
    { week: "Week 1", spend: 82000, revenue: 380000, roas: 4.63 },
    { week: "Week 2", spend: 95000, revenue: 445000, roas: 4.68 },
    { week: "Week 3", spend: 112000, revenue: 535000, roas: 4.77 },
    { week: "Week 4", spend: 145000, revenue: 698000, roas: 4.81 },
  ];

  // Platform Share Data
  const platformData = [
    { platform: "Meta Ads (IG & FB)", spend: 224500, revenue: 1039200, roas: 4.62 },
    { platform: "Google Ads", spend: 127000, revenue: 702200, roas: 5.52 },
    { platform: "Influencer Collabs", spend: 75000, revenue: 310500, roas: 4.14 },
    { platform: "TikTok Ads", spend: 36000, revenue: 78400, roas: 2.18 },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8 animate-fadeIn">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-rose">
                Omnichannel Performance Intelligence
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-brand-charcoal text-white">
                Blended ROAS: {blendedROAS}x
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal">
              Marketing &amp; Advertising Analytics Overview
            </h1>
            <p className="text-xs text-brand-muted mt-1">
              Cross-platform media efficiency across Meta (Facebook &amp; Instagram), Google Ads, and Influencer activations.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white border border-brand-border rounded p-1 text-xs self-start sm:self-auto">
            <span className="text-brand-muted px-2 font-medium flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-brand-rose" />
              <span>Window:</span>
            </span>
            {(["7d", "30d", "90d"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1 rounded font-semibold uppercase text-[10px] transition-colors ${
                  period === p
                    ? "bg-brand-charcoal text-white shadow-xs"
                    : "text-brand-charcoal hover:bg-brand-sand"
                }`}
              >
                Last {p === "7d" ? "7 Days" : p === "30d" ? "30 Days" : "90 Days"}
              </button>
            ))}
          </div>
        </div>

        {/* 12 Core Marketing KPI Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Ad Spend"
            value={formatPKR(totalAdSpend)}
            subtitle="Across Meta, Google & TikTok"
            change={{ value: "+14.2% spend", positive: true }}
            icon={DollarSign}
          />

          <MetricCard
            title="Attributed Revenue"
            value={formatPKR(totalAttributedRevenue)}
            subtitle="Direct multi-touch conversions"
            change={{ value: "+28.6% revenue", positive: true }}
            icon={TrendingUp}
          />

          <MetricCard
            title="Blended ROAS"
            value={`${blendedROAS}x`}
            subtitle="Return on Ad Spend"
            change={{ value: "+0.42x vs target", positive: true }}
            icon={Target}
          />

          <MetricCard
            title="Cost Per Purchase (CPP)"
            value={formatPKR(costPerPurchase)}
            subtitle="Average acquisition cost"
            change={{ value: "-8.4% efficiency", positive: true }}
            icon={ShoppingCart}
          />

          <MetricCard
            title="Cost Per Click (CPC)"
            value={`Rs. ${avgCPC}`}
            subtitle="Paid search & social blended"
            icon={MousePointer}
          />

          <MetricCard
            title="Click-Through Rate (CTR)"
            value={`${blendedCTR}%`}
            subtitle={`${formatNumber(totalClicks)} link clicks`}
            change={{ value: "+0.35%", positive: true }}
            icon={Eye}
          />

          <MetricCard
            title="Ad Impressions"
            value={formatNumber(totalImpressions)}
            subtitle="Brand impressions delivered"
            icon={Eye}
          />

          <MetricCard
            title="Audience Reach"
            value={formatNumber(totalReach)}
            subtitle="Unique women in Pakistan"
            icon={Radio}
          />
        </div>

        {/* Chart: Revenue vs Ad Spend (Double Axis Comparison) */}
        <div className="bg-white rounded border border-brand-border p-6 shadow-subtle space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-brand-border gap-2">
            <div>
              <h3 className="font-serif text-base font-bold text-brand-charcoal">
                Weekly Ad Spend vs. Attributed Revenue Correlation
              </h3>
              <p className="text-[11px] text-brand-muted">
                Track how scaling daily advertising budgets drives top-line Pakistani e-commerce growth
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-brand-charcoal font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-charcoal" />
                Revenue (PKR)
              </span>
              <span className="flex items-center gap-1.5 text-brand-rose font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-rose" />
                Ad Spend (PKR)
              </span>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={revenueSpendData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#EDE5DA" />
                <XAxis dataKey="week" stroke="#766E65" fontSize={11} />
                <YAxis
                  stroke="#766E65"
                  fontSize={11}
                  tickFormatter={(val) => `Rs.${val / 1000}k`}
                />
                <Tooltip
                  formatter={(value: any) => [formatPKR(Number(value)), "Amount"]}
                  contentStyle={{
                    backgroundColor: "#FAF8F4",
                    borderColor: "#E8E2D8",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="spend" fill="#C69B98" name="Ad Spend" radius={[2, 2, 0, 0]} />
                <Bar dataKey="revenue" fill="#252321" name="Attributed Revenue" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Platform Share Comparison Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-12 bg-white rounded border border-brand-border p-6 shadow-subtle space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-brand-border">
              <div>
                <h3 className="font-serif text-base font-bold text-brand-charcoal">
                  Platform Efficiency Breakdown
                </h3>
                <p className="text-[11px] text-brand-muted">
                  Meta Ads vs Google Ads vs Influencer collaborations vs TikTok
                </p>
              </div>

              <Link
                href="/admin/marketing/campaigns"
                className="text-xs text-brand-rose font-semibold hover:underline flex items-center gap-1"
              >
                <span>Campaign Manager</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-sand/70 text-brand-charcoal uppercase font-bold tracking-wider border-b border-brand-border">
                  <tr>
                    <th className="py-3 px-4">Channel / Platform</th>
                    <th className="py-3 px-4">Total Ad Spend</th>
                    <th className="py-3 px-4">Attributed Revenue</th>
                    <th className="py-3 px-4">ROAS</th>
                    <th className="py-3 px-4">Share of Spend</th>
                    <th className="py-3 px-4 text-right">Deep Dive</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/60">
                  {platformData.map((plat) => {
                    const spendShare = ((plat.spend / totalAdSpend) * 100).toFixed(1);
                    return (
                      <tr key={plat.platform} className="hover:bg-brand-sand/30">
                        <td className="py-3 px-4 font-semibold text-brand-charcoal">
                          {plat.platform}
                        </td>
                        <td className="py-3 px-4 font-mono font-medium">
                          {formatPKR(plat.spend)}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-brand-charcoal">
                          {formatPKR(plat.revenue)}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                              plat.roas >= 4.0
                                ? "bg-emerald-50 text-emerald-800"
                                : "bg-amber-50 text-amber-800"
                            }`}
                          >
                            {plat.roas}x
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-brand-sand rounded-full h-1.5 overflow-hidden">
                              <div
                                className="bg-brand-charcoal h-full rounded-full"
                                style={{ width: `${spendShare}%` }}
                              />
                            </div>
                            <span className="text-[11px] text-brand-muted">
                              {spendShare}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Link
                            href={
                              plat.platform.includes("Meta")
                                ? "/admin/marketing/meta"
                                : "/admin/marketing/google"
                            }
                            className="text-xs text-brand-rose font-semibold hover:underline"
                          >
                            Analyze →
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
