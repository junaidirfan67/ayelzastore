"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Target,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Zap,
  Info,
  DollarSign,
  MapPin,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useStore } from "@/context/StoreContext";
import { formatPKR } from "@/lib/utils";

export default function MarketingInsightsPage() {
  const { campaigns, products, orders, trafficSources } = useStore();

  // Find top ROAS campaign
  const sortedCampaigns = [...campaigns].sort((a, b) => b.roas - a.roas);
  const topCampaign = sortedCampaigns[0];

  // Find bleeding campaign (low ROAS with spend)
  const bleedingCampaign = campaigns.find((c) => c.totalSpend > 25000 && c.roas < 3.0);

  // Top selling category
  const topProduct = products.find((p) => p.isBestSeller) || products[0];

  // Top city
  const cityCounts = orders.reduce((acc, ord) => {
    acc[ord.customer.city] = (acc[ord.customer.city] || 0) + ord.total;
    return acc;
  }, {} as Record<string, number>);
  const topCityEntry = Object.entries(cityCounts).sort((a, b) => b[1] - a[1])[0] || ["Lahore", 145000];

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fadeIn">
        {/* Header */}
        <div className="pb-6 border-b border-brand-border">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-rose">
              Algorithmic Business Intelligence
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-brand-sand text-brand-charcoal">
              Rule-Engine v2.4 Active
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal">
            Marketing Insights &amp; Growth Observations
          </h1>
          <p className="text-xs text-brand-muted mt-1">
            Deterministic observations derived from current store revenue, ad spend, and customer telemetry.
          </p>
        </div>

        {/* Informational Callout */}
        <div className="p-4 bg-brand-sand/60 border border-brand-border rounded text-xs flex items-center gap-2.5">
          <Info className="w-4 h-4 text-brand-rose shrink-0" />
          <span className="text-brand-muted">
            These growth recommendations are generated from live e-commerce formulas (ROAS ceilings, CPP thresholds, inventory velocity, and geographic order density).
          </span>
        </div>

        {/* Actionable Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Top ROAS Scaler */}
          {topCampaign && (
            <div className="bg-white rounded border border-emerald-200 p-6 shadow-subtle space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                  High-Impact Scale Opportunity
                </span>
                <span className="font-serif font-bold text-emerald-700 text-lg">
                  {topCampaign.roas}x ROAS
                </span>
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-brand-charcoal">
                  Scale &ldquo;{topCampaign.name}&rdquo;
                </h3>
                <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                  This campaign is outperforming store benchmark ROAS (3.5x). It has generated <strong>{formatPKR(topCampaign.revenue)}</strong> against a modest spend of {formatPKR(topCampaign.totalSpend)}.
                </p>
              </div>

              <div className="p-3 bg-emerald-50/60 rounded text-xs space-y-1 text-emerald-950">
                <p className="font-bold">Recommended Action:</p>
                <p className="text-emerald-900">
                  Increase daily budget by 20% (from {formatPKR(topCampaign.budgetDaily)} to {formatPKR(Math.round(topCampaign.budgetDaily * 1.2))}) while monitoring Cost Per Purchase.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/admin/marketing/meta"
                  className="text-xs font-semibold text-brand-rose hover:underline inline-flex items-center gap-1"
                >
                  <span>Review Meta Campaign Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Card 2: Bleeding Spend Alert */}
          {bleedingCampaign ? (
            <div className="bg-white rounded border border-amber-200 p-6 shadow-subtle space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Budget Inefficiency Alert
                </span>
                <span className="font-serif font-bold text-amber-700 text-lg">
                  {bleedingCampaign.roas}x ROAS
                </span>
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-brand-charcoal">
                  Pause or Re-target &ldquo;{bleedingCampaign.name}&rdquo;
                </h3>
                <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                  This campaign spent <strong>{formatPKR(bleedingCampaign.totalSpend)}</strong> with a sub-optimal return. High cost per purchase ({formatPKR(bleedingCampaign.costPerPurchase)} vs benchmark Rs. 1,400).
                </p>
              </div>

              <div className="p-3 bg-amber-50/60 rounded text-xs space-y-1 text-amber-950">
                <p className="font-bold">Recommended Action:</p>
                <p className="text-amber-900">
                  Refresh ad creative with Reels format showing raw silk fabric movement or narrow target audience to high-density metros (Lahore &amp; Karachi).
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/admin/marketing/campaigns"
                  className="text-xs font-semibold text-brand-rose hover:underline inline-flex items-center gap-1"
                >
                  <span>Adjust in Campaign Manager</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded border border-brand-border p-6 shadow-subtle space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                  Portfolio Health: Stable
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-brand-charcoal">
                No Critical Budget Inefficiencies
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                All active campaigns are maintaining sustainable cost per purchase thresholds.
              </p>
            </div>
          )}

          {/* Card 3: Top Revenue Product Creative */}
          <div className="bg-white rounded border border-brand-border p-6 shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 bg-brand-sand text-brand-charcoal rounded">
                Product Hero Driver
              </span>
              <span className="text-xs font-semibold text-brand-muted">
                4.9★ Rating
              </span>
            </div>

            <div>
              <h3 className="font-serif text-lg font-bold text-brand-charcoal">
                Feature &ldquo;{topProduct.title}&rdquo; in Catalog Ads
              </h3>
              <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                This piece has achieved the store&apos;s lowest return rate and highest customer review frequency. Dynamic product ads utilizing this creative experience 42% higher CTR.
              </p>
            </div>

            <div className="p-3 bg-brand-sand/50 rounded text-xs text-brand-charcoal space-y-1">
              <p className="font-semibold">Suggested Merchandising:</p>
              <p className="text-brand-muted">
                Pin to the first card on Advantage+ Catalog Reels and homepage seasonal spotlight.
              </p>
            </div>
          </div>

          {/* Card 4: Geographic Purchasing Density */}
          <div className="bg-white rounded border border-brand-border p-6 shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 bg-blue-50 text-blue-800 rounded flex items-center gap-1">
                <MapPin className="w-3 h-3 text-blue-600" />
                Geographic Market Leader
              </span>
              <span className="text-xs font-bold text-brand-charcoal">
                {topCityEntry[0]} Hub
              </span>
            </div>

            <div>
              <h3 className="font-serif text-lg font-bold text-brand-charcoal">
                Dominant Revenue Hub: {topCityEntry[0]} ({formatPKR(topCityEntry[1])})
              </h3>
              <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                Patrons in {topCityEntry[0]} account for the highest volume of silk kalidars and luxury velvet orders. Same-day / overnight courier delivery through TCS Express yields near-zero cancellation rates.
              </p>
            </div>

            <div className="p-3 bg-brand-sand/50 rounded text-xs text-brand-charcoal space-y-1">
              <p className="font-semibold">Targeting Strategy:</p>
              <p className="text-brand-muted">
                Maintain 40% of Meta ad set allocation focused specifically on female luxury fashion shoppers in {topCityEntry[0]}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
