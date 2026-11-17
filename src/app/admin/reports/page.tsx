"use client";

import React, { useState } from "react";
import {
  FileText,
  Download,
  Printer,
  Calendar,
  TrendingUp,
  DollarSign,
  Package,
  Users,
  ShieldCheck,
  CheckCircle2,
  PieChart as PieChartIcon,
  ShoppingBag,
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
} from "recharts";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { MetricCard } from "@/components/admin/MetricCard";
import { useStore } from "@/context/StoreContext";
import { formatPKR, formatDate, exportToCSV } from "@/lib/utils";

export default function ReportsBIPage() {
  const { orders, products, customers, campaigns } = useStore();
  const [reportType, setReportType] = useState<
    "profitability" | "sales" | "products" | "marketing"
  >("profitability");

  const [dateFilter, setDateFilter] = useState<"30d" | "90d" | "year">("30d");

  // Real Stored Data Financial Calculations
  const grossRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  // Total COGS from stored product cost prices
  const totalCOGS = orders.reduce((sum, o) => {
    return (
      sum +
      (o.costTotal ||
        o.items.reduce((itemSum, item) => {
          const matched = products.find((p) => p.id === item.productId);
          return itemSum + (matched?.costPrice || Math.round(item.price * 0.5)) * item.quantity;
        }, 0))
    );
  }, 0);

  // Marketing ad spend
  const totalAdSpend = campaigns.reduce((sum, c) => sum + c.totalSpend, 0);

  // Shipping expenses (estimate Rs. 250 per order incurred)
  const totalShippingExpenses = orders.length * 250;

  // Net Profit & Margin
  const netProfit = grossRevenue - totalCOGS - totalAdSpend - totalShippingExpenses;
  const netProfitMargin = grossRevenue > 0 ? ((netProfit / grossRevenue) * 100).toFixed(1) : "0.0";

  // Trend data for chart
  const profitabilityTrend = [
    { month: "Aug '26", revenue: 420000, cogs: 195000, ads: 85000, net: 120000 },
    { month: "Sep '26", revenue: 580000, cogs: 260000, ads: 110000, net: 185000 },
    { month: "Oct '26", revenue: 890000, cogs: 395000, ads: 165000, net: 298000 },
    { month: "Nov '26", revenue: 1150000, cogs: 510000, ads: 215000, net: 382000 },
  ];

  // CSV Export handler
  const handleExportCSV = () => {
    if (reportType === "profitability") {
      const rows = profitabilityTrend.map((p) => ({
        Month: p.month,
        RevenuePKR: p.revenue,
        CostOfGoodsPKR: p.cogs,
        AdSpendPKR: p.ads,
        NetProfitPKR: p.net,
      }));
      exportToCSV("aleyza-profitability-report", rows);
    } else if (reportType === "sales") {
      const rows = orders.map((o) => ({
        OrderNumber: o.orderNumber,
        Date: formatDate(o.date),
        Customer: o.customer.fullName,
        City: o.customer.city,
        ItemsCount: o.items.length,
        TotalPKR: o.total,
        PaymentMethod: o.paymentMethod,
        Status: o.status,
      }));
      exportToCSV("aleyza-sales-report", rows);
    } else if (reportType === "products") {
      const rows = products.map((p) => ({
        Title: p.title,
        SKU: p.sku,
        Category: p.categoryLabel,
        RetailPrice: p.price,
        CostPrice: p.costPrice || Math.round(p.price * 0.5),
        AvailableStock: p.variants.reduce((a, b) => a + b.stock, 0),
        Rating: p.rating,
      }));
      exportToCSV("aleyza-product-performance-report", rows);
    } else {
      const rows = campaigns.map((c) => ({
        Campaign: c.name,
        Channel: c.channelLabel,
        TotalSpend: c.totalSpend,
        Purchases: c.purchases,
        Revenue: c.revenue,
        ROAS: c.roas,
        CPP: c.costPerPurchase,
      }));
      exportToCSV("aleyza-marketing-performance-report", rows);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AdminLayout>
      <div className="space-y-8 animate-fadeIn print:p-0">
        {/* Header (Hidden in print) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border print:hidden">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-rose block mb-1">
              Financial &amp; Executive Telemetry
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal">
              Executive Reports &amp; Business Intelligence
            </h1>
            <p className="text-xs text-brand-muted mt-1">
              Comprehensive profitability analysis, sales audit, and inventory performance.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 border border-brand-border bg-white text-brand-charcoal text-xs font-semibold rounded hover:bg-brand-sand transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-brand-rose" />
              <span>Print PDF Report</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-brand-charcoal text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-brand-brown transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-brand-rose" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Report Type Switcher Tabs (Hidden in print) */}
        <div className="flex border-b border-brand-border overflow-x-auto text-xs font-semibold uppercase tracking-wider print:hidden">
          <button
            onClick={() => setReportType("profitability")}
            className={`pb-3 px-4 border-b-2 transition-colors ${
              reportType === "profitability"
                ? "border-brand-charcoal text-brand-charcoal font-bold"
                : "border-transparent text-brand-muted hover:text-brand-charcoal"
            }`}
          >
            P&amp;L Profitability Audit
          </button>
          <button
            onClick={() => setReportType("sales")}
            className={`pb-3 px-4 border-b-2 transition-colors ${
              reportType === "sales"
                ? "border-brand-charcoal text-brand-charcoal font-bold"
                : "border-transparent text-brand-muted hover:text-brand-charcoal"
            }`}
          >
            Sales &amp; Orders Report
          </button>
          <button
            onClick={() => setReportType("products")}
            className={`pb-3 px-4 border-b-2 transition-colors ${
              reportType === "products"
                ? "border-brand-charcoal text-brand-charcoal font-bold"
                : "border-transparent text-brand-muted hover:text-brand-charcoal"
            }`}
          >
            Product &amp; Category Margins
          </button>
          <button
            onClick={() => setReportType("marketing")}
            className={`pb-3 px-4 border-b-2 transition-colors ${
              reportType === "marketing"
                ? "border-brand-charcoal text-brand-charcoal font-bold"
                : "border-transparent text-brand-muted hover:text-brand-charcoal"
            }`}
          >
            Marketing ROAS Report
          </button>
        </div>

        {/* REPORT 1: TRUE PROFITABILITY STATEMENT (Does NOT confuse Revenue with Profit!) */}
        {reportType === "profitability" && (
          <div className="space-y-6">
            {/* Top Financial Breakdown Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <MetricCard
                title="Gross Store Revenue"
                value={formatPKR(grossRevenue)}
                subtitle="All settled orders"
                icon={DollarSign}
              />
              <MetricCard
                title="Cost of Goods (COGS)"
                value={formatPKR(totalCOGS)}
                subtitle="Fabric, embroidery & tailoring"
                icon={Package}
              />
              <MetricCard
                title="Ad Spend & Shipping"
                value={formatPKR(totalAdSpend + totalShippingExpenses)}
                subtitle="Meta, Google & TCS express"
                icon={ShoppingBag}
              />
              <MetricCard
                title="Net Profit (EBITDA)"
                value={formatPKR(netProfit)}
                subtitle={`Net margin: ${netProfitMargin}%`}
                change={{ value: "+22.4%", positive: true }}
                icon={TrendingUp}
              />
            </div>

            {/* Income Statement Table */}
            <div className="bg-white rounded border border-brand-border p-6 shadow-subtle space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-brand-border">
                <div>
                  <h3 className="font-serif text-base font-bold text-brand-charcoal">
                    Comprehensive Profit &amp; Loss Breakdown (PKR)
                  </h3>
                  <p className="text-[11px] text-brand-muted">
                    Accounting for product raw cost, packaging, advertising acquisition, and courier logistics
                  </p>
                </div>
                <span className="font-mono text-xs px-2.5 py-1 bg-brand-sand rounded font-bold">
                  Pakistani Rupee (PKR)
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <tbody className="divide-y divide-brand-border/60">
                    <tr className="bg-brand-sand/40 font-bold">
                      <td className="py-2.5 px-3 text-brand-charcoal">
                        (+) Gross Merchandise Value (GMV)
                      </td>
                      <td className="py-2.5 px-3 text-right text-brand-charcoal font-mono">
                        {formatPKR(grossRevenue)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 text-brand-muted pl-6">
                        (-) Cost of Goods Sold (Raw Silk, Hand Embroidery, Banarsi Fabric)
                      </td>
                      <td className="py-2.5 px-3 text-right text-red-600 font-mono">
                        -{formatPKR(totalCOGS)}
                      </td>
                    </tr>
                    <tr className="font-semibold bg-brand-sand/20">
                      <td className="py-2.5 px-3 text-brand-charcoal pl-6">
                        (=) Gross Margin (Gross Profit)
                      </td>
                      <td className="py-2.5 px-3 text-right text-emerald-800 font-mono">
                        {formatPKR(grossRevenue - totalCOGS)} (
                        {grossRevenue > 0
                          ? (
                              ((grossRevenue - totalCOGS) / grossRevenue) *
                              100
                            ).toFixed(1)
                          : 0}
                        %)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 text-brand-muted pl-6">
                        (-) Paid Advertising (Meta Ads, Google Ads, TikTok, Influencers)
                      </td>
                      <td className="py-2.5 px-3 text-right text-red-600 font-mono">
                        -{formatPKR(totalAdSpend)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 text-brand-muted pl-6">
                        (-) Courier Shipping Charges &amp; Packaging Boxes (TCS Express)
                      </td>
                      <td className="py-2.5 px-3 text-right text-red-600 font-mono">
                        -{formatPKR(totalShippingExpenses)}
                      </td>
                    </tr>
                    <tr className="bg-brand-charcoal text-white font-bold text-sm">
                      <td className="py-3 px-3">
                        (=) Net Operating Profit (Clean Pakistani E-commerce Net)
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-emerald-400">
                        {formatPKR(netProfit)} ({netProfitMargin}%)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Profitability Growth Chart */}
            <div className="bg-white rounded border border-brand-border p-6 shadow-subtle space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-brand-border">
                <h3 className="font-serif text-base font-bold text-brand-charcoal">
                  Quarterly Net Profit Velocity
                </h3>
                <span className="text-xs text-brand-muted">
                  August – November 2026
                </span>
              </div>

              <div className="h-64 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={profitabilityTrend}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#EDE5DA" />
                    <XAxis dataKey="month" stroke="#766E65" fontSize={11} />
                    <YAxis
                      stroke="#766E65"
                      fontSize={11}
                      tickFormatter={(val) => `Rs.${val / 1000}k`}
                    />
                    <Tooltip
                      formatter={(val: any) => [formatPKR(Number(val)), "Amount"]}
                      contentStyle={{
                        backgroundColor: "#FAF8F4",
                        borderColor: "#E8E2D8",
                        fontSize: "12px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#252321"
                      fill="#252321"
                      fillOpacity={0.1}
                      name="Revenue"
                    />
                    <Area
                      type="monotone"
                      dataKey="net"
                      stroke="#C69B98"
                      fill="#C69B98"
                      fillOpacity={0.4}
                      name="Net Profit"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* REPORT 2: SALES & ORDERS REPORT */}
        {reportType === "sales" && (
          <div className="bg-white rounded border border-brand-border shadow-subtle overflow-hidden">
            <div className="p-4 border-b border-brand-border flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-brand-charcoal">
                Sales Ledger &amp; Order Register ({orders.length} transactions)
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-sand/70 font-bold uppercase tracking-wider text-brand-charcoal border-b border-brand-border">
                  <tr>
                    <th className="p-3">Order Number</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Patron</th>
                    <th className="p-3">City</th>
                    <th className="p-3">Payment</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/60">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-brand-sand/30">
                      <td className="p-3 font-mono font-bold">#{o.orderNumber}</td>
                      <td className="p-3 text-brand-muted">{formatDate(o.date)}</td>
                      <td className="p-3 font-medium">{o.customer.fullName}</td>
                      <td className="p-3 text-brand-muted">{o.customer.city}</td>
                      <td className="p-3 uppercase text-[11px]">
                        {o.paymentMethod.replace("_", " ")}
                      </td>
                      <td className="p-3 uppercase text-[11px] font-semibold">
                        {o.status}
                      </td>
                      <td className="p-3 text-right font-bold font-mono">
                        {formatPKR(o.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* REPORT 3: PRODUCT MARGINS */}
        {reportType === "products" && (
          <div className="bg-white rounded border border-brand-border shadow-subtle overflow-hidden">
            <div className="p-4 border-b border-brand-border">
              <h3 className="font-serif text-base font-bold text-brand-charcoal">
                Product Gross Margin Ledger
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-sand/70 font-bold uppercase tracking-wider text-brand-charcoal border-b border-brand-border">
                  <tr>
                    <th className="p-3">Product Name</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Retail Price</th>
                    <th className="p-3">Cost Price (COGS)</th>
                    <th className="p-3">Unit Gross Margin</th>
                    <th className="p-3">Margin %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/60">
                  {products.map((p) => {
                    const cPrice = p.costPrice || Math.round(p.price * 0.5);
                    const grossUnit = p.price - cPrice;
                    const marginPercent = ((grossUnit / p.price) * 100).toFixed(1);
                    return (
                      <tr key={p.id} className="hover:bg-brand-sand/30">
                        <td className="p-3 font-semibold text-brand-charcoal">
                          {p.title}
                        </td>
                        <td className="p-3 text-brand-muted">{p.categoryLabel}</td>
                        <td className="p-3 font-mono font-bold">
                          {formatPKR(p.price)}
                        </td>
                        <td className="p-3 font-mono text-brand-muted">
                          {formatPKR(cPrice)}
                        </td>
                        <td className="p-3 font-mono font-bold text-emerald-700">
                          +{formatPKR(grossUnit)}
                        </td>
                        <td className="p-3 font-bold">{marginPercent}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* REPORT 4: MARKETING ROAS REPORT */}
        {reportType === "marketing" && (
          <div className="bg-white rounded border border-brand-border shadow-subtle overflow-hidden">
            <div className="p-4 border-b border-brand-border">
              <h3 className="font-serif text-base font-bold text-brand-charcoal">
                Paid Advertising Channel Performance
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-sand/70 font-bold uppercase tracking-wider text-brand-charcoal border-b border-brand-border">
                  <tr>
                    <th className="p-3">Campaign</th>
                    <th className="p-3">Platform</th>
                    <th className="p-3">Ad Spend</th>
                    <th className="p-3">Purchases</th>
                    <th className="p-3">Revenue (PKR)</th>
                    <th className="p-3">ROAS</th>
                    <th className="p-3">Cost / Purchase</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/60">
                  {campaigns.map((c) => (
                    <tr key={c.id} className="hover:bg-brand-sand/30">
                      <td className="p-3 font-semibold">{c.name}</td>
                      <td className="p-3 text-brand-muted">{c.channelLabel}</td>
                      <td className="p-3 font-mono">{formatPKR(c.totalSpend)}</td>
                      <td className="p-3 font-bold">{c.purchases}</td>
                      <td className="p-3 font-mono font-bold text-brand-charcoal">
                        {formatPKR(c.revenue)}
                      </td>
                      <td className="p-3 font-bold text-emerald-800">{c.roas}x</td>
                      <td className="p-3 font-mono">
                        {formatPKR(c.costPerPurchase)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
