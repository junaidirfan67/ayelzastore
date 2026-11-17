"use client";

import React, { useState } from "react";
import {
  Sliders,
  TrendingUp,
  DollarSign,
  PieChart as PieChartIcon,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Info,
} from "lucide-react";
import {
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
import { useStore } from "@/context/StoreContext";
import { formatPKR, formatNumber } from "@/lib/utils";

export default function MarketingAttributionPage() {
  const { trafficSources } = useStore();
  const [model, setModel] = useState<"last-touch" | "first-touch" | "linear">("last-touch");

  const totalSessions = trafficSources.reduce((s, t) => s + t.sessions, 0);
  const totalAttributedRevenue = trafficSources.reduce((s, t) => s + t.revenue, 0);
  const totalAttributedOrders = trafficSources.reduce((s, t) => s + t.orders, 0);

  // Model Comparison Chart Data
  const modelComparisonData = trafficSources.map((t) => ({
    channel: t.channel.split(" ")[0],
    lastTouch: t.lastTouchShare,
    firstTouch: t.firstTouchShare,
    revenue: t.revenue,
  }));

  return (
    <AdminLayout>
      <div className="space-y-8 animate-fadeIn">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-rose">
                Multi-Touch Telemetry
              </span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-brand-sand text-brand-charcoal">
                Model: {model.toUpperCase().replace("-", " ")}
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal">
              Marketing Attribution &amp; Traffic Source Mix
            </h1>
            <p className="text-xs text-brand-muted mt-1">
              Analyze how awareness discovery channels translate to checkout conversion across Pakistan.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white border border-brand-border rounded p-1 text-xs self-start sm:self-auto">
            <span className="text-brand-muted px-2 font-medium">Model:</span>
            {(["last-touch", "first-touch", "linear"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setModel(m)}
                className={`px-3 py-1 rounded font-semibold uppercase text-[10px] transition-colors ${
                  model === m
                    ? "bg-brand-charcoal text-white shadow-xs"
                    : "text-brand-charcoal hover:bg-brand-sand"
                }`}
              >
                {m.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Informational Callout */}
        <div className="p-4 bg-brand-sand/60 border border-brand-border rounded text-xs flex items-start gap-3">
          <Info className="w-4 h-4 text-brand-rose shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-brand-charcoal">
              Multi-Touch Attribution Architecture
            </p>
            <p className="text-brand-muted leading-relaxed">
              <strong>First-Touch</strong> attributes credit to initial discovery channels (e.g. Meta Reels &amp; Influencer activations). <strong>Last-Touch</strong> attributes credit to the final converting channel (e.g. Brand Exact Match search &amp; Direct visits). Linear distributes value evenly across sessions.
            </p>
          </div>
        </div>

        {/* Model Comparison Bar Chart */}
        <div className="bg-white rounded border border-brand-border p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-brand-border">
            <div>
              <h3 className="font-serif text-base font-bold text-brand-charcoal">
                First-Touch vs. Last-Touch Channel Contribution (% Share)
              </h3>
              <p className="text-[11px] text-brand-muted">
                Highlights how social discovery generates demand that paid search and direct navigation convert
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 font-semibold text-brand-rose">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-rose" />
                First-Touch %
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-brand-charcoal">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-charcoal" />
                Last-Touch %
              </span>
            </div>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={modelComparisonData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#EDE5DA" />
                <XAxis dataKey="channel" stroke="#766E65" fontSize={11} />
                <YAxis
                  stroke="#766E65"
                  fontSize={11}
                  tickFormatter={(val) => `${val}%`}
                />
                <Tooltip
                  formatter={(val: any) => [`${val}%`, "Contribution Share"]}
                  contentStyle={{
                    backgroundColor: "#FAF8F4",
                    borderColor: "#E8E2D8",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="firstTouch" fill="#C69B98" name="First Touch" radius={[2, 2, 0, 0]} />
                <Bar dataKey="lastTouch" fill="#252321" name="Last Touch" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Traffic Source Table */}
        <div className="bg-white rounded border border-brand-border shadow-subtle overflow-hidden">
          <div className="p-4 border-b border-brand-border">
            <h3 className="font-serif text-base font-bold text-brand-charcoal">
              Channel Performance &amp; Revenue Attribution Matrix
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-sand/70 text-brand-charcoal uppercase font-bold tracking-wider border-b border-brand-border">
                <tr>
                  <th className="py-3.5 px-4">Traffic Source Channel</th>
                  <th className="py-3.5 px-4">Sessions</th>
                  <th className="py-3.5 px-4">Unique Users</th>
                  <th className="py-3.5 px-4">Orders</th>
                  <th className="py-3.5 px-4">Attributed Revenue</th>
                  <th className="py-3.5 px-4">Conv. Rate</th>
                  <th className="py-3.5 px-4">Average Order Value</th>
                  <th className="py-3.5 px-4 text-center">First-Touch</th>
                  <th className="py-3.5 px-4 text-center">Last-Touch</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {trafficSources.map((source) => (
                  <tr key={source.channel} className="hover:bg-brand-sand/30">
                    <td className="py-3 px-4 font-semibold text-brand-charcoal">
                      {source.channel}
                    </td>
                    <td className="py-3 px-4">{formatNumber(source.sessions)}</td>
                    <td className="py-3 px-4 text-brand-muted">{formatNumber(source.users)}</td>
                    <td className="py-3 px-4 font-bold text-brand-charcoal">
                      {source.orders}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-brand-charcoal">
                      {formatPKR(source.revenue)}
                    </td>
                    <td className="py-3 px-4 font-semibold text-emerald-700">
                      {(source.conversionRate * 100).toFixed(2)}%
                    </td>
                    <td className="py-3 px-4 font-mono">
                      {formatPKR(source.aov)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 bg-brand-rose/15 text-brand-brown rounded font-semibold text-[10px]">
                        {source.firstTouchShare}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 bg-brand-charcoal text-white rounded font-semibold text-[10px]">
                        {source.lastTouchShare}%
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
