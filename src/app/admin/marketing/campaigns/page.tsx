"use client";

import React, { useState } from "react";
import {
  Radio,
  Plus,
  Play,
  Pause,
  Filter,
  DollarSign,
  TrendingUp,
  Target,
  Sparkles,
  X,
  Info,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { useStore } from "@/context/StoreContext";
import { MarketingCampaign } from "@/types";
import { formatPKR, formatDate, formatNumber } from "@/lib/utils";

export default function CampaignManagerPage() {
  const { campaigns, addCampaign, updateCampaignStatus } = useStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [channelFilter, setChannelFilter] = useState("all");

  // Form states
  const [name, setName] = useState("");
  const [channel, setChannel] = useState<MarketingCampaign["channel"]>("meta");
  const [objective, setObjective] = useState<MarketingCampaign["objective"]>("Sales / Purchases");
  const [budgetDaily, setBudgetDaily] = useState(6000);
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);

  const channelLabels: Record<MarketingCampaign["channel"], string> = {
    meta: "Meta Ads (IG & FB)",
    google: "Google Ads",
    tiktok: "TikTok Ads",
    influencer: "Influencer Collabs",
    email: "Email Marketing",
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const newCamp: MarketingCampaign = {
      id: `camp-${Date.now()}`,
      name,
      channel,
      channelLabel: channelLabels[channel],
      objective,
      status: "active",
      budgetDaily,
      totalSpend: 0,
      impressions: 0,
      clicks: 0,
      ctr: 3.2,
      cpc: 8.5,
      cpm: 250,
      purchases: 0,
      revenue: 0,
      roas: 0,
      costPerPurchase: 0,
      startDate,
    };

    addCampaign(newCamp);
    setModalOpen(false);
    setName("");
  };

  const filteredCampaigns = campaigns.filter((c) => {
    if (channelFilter !== "all" && c.channel !== channelFilter) return false;
    return true;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-rose block mb-1">
              Media Planning &amp; Allocation
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal">
              Paid Campaign Orchestrator
            </h1>
            <p className="text-xs text-brand-muted mt-1">
              Launch and control advertising campaigns across Meta, Google Ads, and Influencer partnerships.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-2.5 bg-brand-charcoal text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-brand-brown transition-colors flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 text-brand-rose" />
            <span>New Media Campaign</span>
          </button>
        </div>

        {/* Informational Architecture Banner */}
        <div className="p-4 bg-brand-sand/50 border border-brand-border rounded text-xs flex items-center gap-3">
          <Info className="w-4 h-4 text-brand-rose shrink-0" />
          <span className="text-brand-muted">
            Campaign adjustments synchronize with the centralized Store Telemetry model. In production, campaigns dispatch via the respective Meta Marketing API or Google Ads API.
          </span>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-3 bg-white p-3 rounded border border-brand-border text-xs">
          <span className="text-brand-muted font-medium">Filter Channel:</span>
          {["all", "meta", "google", "tiktok", "influencer"].map((ch) => (
            <button
              key={ch}
              onClick={() => setChannelFilter(ch)}
              className={`px-3 py-1 rounded uppercase font-semibold text-[10px] transition-colors ${
                channelFilter === ch
                  ? "bg-brand-charcoal text-white"
                  : "bg-brand-sand text-brand-charcoal hover:bg-brand-border"
              }`}
            >
              {ch === "all" ? "All Channels" : ch}
            </button>
          ))}
        </div>

        {/* Campaigns Table */}
        <div className="bg-white rounded border border-brand-border shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-sand/70 text-brand-charcoal uppercase font-bold tracking-wider border-b border-brand-border">
                <tr>
                  <th className="py-3.5 px-4">Campaign Name</th>
                  <th className="py-3.5 px-4">Platform</th>
                  <th className="py-3.5 px-4">Objective</th>
                  <th className="py-3.5 px-4">Daily Budget</th>
                  <th className="py-3.5 px-4">Total Spend</th>
                  <th className="py-3.5 px-4">Purchases</th>
                  <th className="py-3.5 px-4">Revenue</th>
                  <th className="py-3.5 px-4">ROAS</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Toggle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {filteredCampaigns.map((c) => (
                  <tr key={c.id} className="hover:bg-brand-sand/30">
                    <td className="py-3 px-4 font-semibold text-brand-charcoal">
                      {c.name}
                    </td>

                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-brand-sand text-brand-charcoal font-medium text-[11px]">
                        {c.channelLabel}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-brand-muted">{c.objective}</td>

                    <td className="py-3 px-4 font-mono font-medium">
                      {c.budgetDaily > 0 ? `${formatPKR(c.budgetDaily)}/d` : "Fixed"}
                    </td>

                    <td className="py-3 px-4 font-mono">{formatPKR(c.totalSpend)}</td>

                    <td className="py-3 px-4 font-bold text-brand-charcoal">
                      {c.purchases}
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-brand-charcoal">
                      {formatPKR(c.revenue)}
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                          c.roas >= 4.0
                            ? "bg-emerald-50 text-emerald-800"
                            : c.roas > 0
                            ? "bg-amber-50 text-amber-800"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {c.roas > 0 ? `${c.roas}x` : "—"}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <StatusBadge status={c.status} />
                    </td>

                    <td className="py-3 px-4 text-right">
                      {c.status === "active" ? (
                        <button
                          onClick={() => updateCampaignStatus(c.id, "paused")}
                          className="px-2.5 py-1 border border-brand-border text-amber-700 hover:bg-amber-50 rounded text-[10px] uppercase font-bold flex items-center gap-1 ml-auto"
                        >
                          <Pause className="w-3 h-3" />
                          <span>Pause</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => updateCampaignStatus(c.id, "active")}
                          className="px-2.5 py-1 border border-brand-border text-emerald-700 hover:bg-emerald-50 rounded text-[10px] uppercase font-bold flex items-center gap-1 ml-auto"
                        >
                          <Play className="w-3 h-3" />
                          <span>Resume</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />

          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-white rounded shadow-modal border border-brand-border p-6 z-50 animate-slideUp">
              <div className="flex items-center justify-between pb-4 border-b border-brand-border mb-4">
                <h3 className="font-serif text-lg font-bold text-brand-charcoal">
                  Create Advertising Campaign
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1 text-brand-muted hover:text-brand-charcoal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateCampaign} className="space-y-3 text-xs">
                <div>
                  <label className="block text-brand-charcoal font-medium mb-1">
                    Campaign Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Lawn Reverie '26 — Conversion Boost"
                    className="w-full px-3 py-2 border border-brand-border rounded focus:outline-none focus:border-brand-rose"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-brand-charcoal font-medium mb-1">
                      Platform Channel
                    </label>
                    <select
                      value={channel}
                      onChange={(e) =>
                        setChannel(e.target.value as MarketingCampaign["channel"])
                      }
                      className="w-full px-3 py-2 border border-brand-border rounded bg-white"
                    >
                      <option value="meta">Meta Ads (IG &amp; FB)</option>
                      <option value="google">Google Ads (PMax)</option>
                      <option value="tiktok">TikTok Ads</option>
                      <option value="influencer">Influencer Collabs</option>
                      <option value="email">Email VIP Broadcast</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-brand-charcoal font-medium mb-1">
                      Objective
                    </label>
                    <select
                      value={objective}
                      onChange={(e) =>
                        setObjective(e.target.value as MarketingCampaign["objective"])
                      }
                      className="w-full px-3 py-2 border border-brand-border rounded bg-white"
                    >
                      <option value="Sales / Purchases">Sales / Purchases</option>
                      <option value="Traffic / Clicks">Traffic / Clicks</option>
                      <option value="Brand Awareness">Brand Awareness</option>
                      <option value="Lead Gen">Lead Gen</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-brand-charcoal font-medium mb-1">
                      Daily Budget (PKR)
                    </label>
                    <input
                      type="number"
                      required
                      value={budgetDaily}
                      onChange={(e) => setBudgetDaily(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-brand-border rounded font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-brand-charcoal font-medium mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      required
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-3 py-2 border border-brand-border rounded"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-brand-border">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 border border-brand-border rounded text-brand-muted"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-brand-charcoal text-white font-semibold rounded hover:bg-brand-brown"
                  >
                    Launch Campaign
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
