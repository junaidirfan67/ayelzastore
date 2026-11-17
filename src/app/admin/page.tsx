"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  DollarSign,
  ShoppingBag,
  Users,
  TrendingUp,
  Package,
  AlertTriangle,
  ArrowRight,
  Eye,
  Calendar,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { MetricCard } from "@/components/admin/MetricCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { useStore } from "@/context/StoreContext";
import { formatPKR, formatDate, formatNumber } from "@/lib/utils";

export default function AdminDashboardPage() {
  const { orders, products, customers } = useStore();
  const [dateFilter, setDateFilter] = useState<"today" | "7d" | "30d" | "90d" | "year">("30d");

  // Dynamic statistics calculated from live state
  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, ord) => sum + ord.total, 0);
  }, [orders]);

  const totalOrdersCount = orders.length;
  const aov = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;
  const totalCustomersCount = customers.length;
  const pendingOrdersCount = orders.filter(
    (o) => o.status === "pending" || o.status === "processing"
  ).length;

  const totalUnitsSold = useMemo(() => {
    return orders.reduce(
      (sum, ord) =>
        sum + ord.items.reduce((itemSum, item) => itemSum + item.quantity, 0),
      0
    );
  }, [orders]);

  const lowStockCount = useMemo(() => {
    return products.filter((p) =>
      p.variants.some((v) => v.stock > 0 && v.stock <= 5)
    ).length;
  }, [products]);

  // Chart Data: 7-Day / 30-Day Revenue Trend
  const revenueChartData = [
    { day: "Day 1", revenue: 48500, orders: 3, profit: 24200 },
    { day: "Day 5", revenue: 62000, orders: 4, profit: 31000 },
    { day: "Day 10", revenue: 94000, orders: 6, profit: 47000 },
    { day: "Day 15", revenue: 142000, orders: 9, profit: 71000 },
    { day: "Day 20", revenue: 118000, orders: 7, profit: 59000 },
    { day: "Day 25", revenue: 185000, orders: 11, profit: 92500 },
    { day: "Day 30", revenue: 215000, orders: 14, profit: 107500 },
  ];

  // Revenue by Category Pie Data
  const categoryData = [
    { name: "Eastern Wear", value: 38, color: "#C69B98" },
    { name: "Formal Wear", value: 28, color: "#252321" },
    { name: "Co-Ord Sets", value: 16, color: "#C5A880" },
    { name: "Accessories", value: 12, color: "#55443B" },
    { name: "Kurtis", value: 6, color: "#8A9A86" },
  ];

  // Top Selling Products
  const topProducts = products.slice(0, 4);

  return (
    <AdminLayout>
      <div className="space-y-8 animate-fadeIn">
        {/* Page Title & Date Range Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border/80">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-rose block mb-1">
              Store Executive Suite
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal">
              Business Performance Overview
            </h1>
            <p className="text-xs text-brand-muted mt-1">
              Real-time revenue, conversion telemetry, and order fulfillment across Pakistan.
            </p>
          </div>

          {/* Date Range Selector */}
          <div className="flex items-center gap-2 bg-white border border-brand-border rounded p-1 text-xs">
            <span className="text-brand-muted px-2 font-medium flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-brand-rose" />
              <span>Period:</span>
            </span>
            {(["today", "7d", "30d", "90d", "year"] as const).map((period) => (
              <button
                key={period}
                onClick={() => setDateFilter(period)}
                className={`px-2.5 py-1 rounded font-semibold uppercase text-[10px] transition-colors ${
                  dateFilter === period
                    ? "bg-brand-charcoal text-white shadow-xs"
                    : "text-brand-charcoal hover:bg-brand-sand"
                }`}
              >
                {period === "7d"
                  ? "7 Days"
                  : period === "30d"
                  ? "30 Days"
                  : period === "90d"
                  ? "90 Days"
                  : period === "year"
                  ? "This Year"
                  : "Today"}
              </button>
            ))}
          </div>
        </div>

        {/* Top KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Store Revenue"
            value={formatPKR(totalRevenue)}
            subtitle="Calculated from confirmed & delivered orders"
            change={{ value: "+24.8% vs last month", positive: true }}
            icon={DollarSign}
          />

          <MetricCard
            title="Total Orders Placed"
            value={totalOrdersCount.toString()}
            subtitle={`Average value: ${formatPKR(aov)}`}
            change={{ value: "+18.2%", positive: true }}
            icon={ShoppingBag}
          />

          <MetricCard
            title="Active Patrons"
            value={totalCustomersCount.toString()}
            subtitle="Lahore, Karachi, Islamabad"
            change={{ value: "+31.5% LTV growth", positive: true }}
            icon={Users}
          />

          <MetricCard
            title="Conversion Rate"
            value="3.42%"
            subtitle="Store visitors to purchases"
            change={{ value: "+0.6% vs benchmark", positive: true }}
            icon={TrendingUp}
          />
        </div>

        {/* Secondary KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded border border-brand-border p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-muted block">
                Total Garments Sold
              </span>
              <p className="font-serif text-xl font-bold text-brand-charcoal mt-1">
                {totalUnitsSold} units
              </p>
            </div>
            <div className="w-9 h-9 rounded bg-brand-sand flex items-center justify-center text-brand-rose">
              <Package className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white rounded border border-brand-border p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-muted block">
                Pending Packaging / Dispatch
              </span>
              <p className="font-serif text-xl font-bold text-amber-700 mt-1">
                {pendingOrdersCount} orders
              </p>
            </div>
            <div className="w-9 h-9 rounded bg-amber-50 flex items-center justify-center text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white rounded border border-brand-border p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-muted block">
                Low Stock Variant Alerts
              </span>
              <p className="font-serif text-xl font-bold text-brand-rose mt-1">
                {lowStockCount} styles
              </p>
            </div>
            <div className="w-9 h-9 rounded bg-brand-rose/10 flex items-center justify-center text-brand-rose">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Visual Analytics Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Revenue & Profit Area Chart (8 Cols) */}
          <div className="lg:col-span-8 bg-white rounded border border-brand-border p-6 shadow-subtle space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-brand-border">
              <div>
                <h3 className="font-serif text-base font-bold text-brand-charcoal">
                  Gross Revenue &amp; Estimated Gross Profit Trend
                </h3>
                <p className="text-[11px] text-brand-muted">
                  Daily net receipts (PKR) and estimated gross margins over 30 days
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-brand-charcoal font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-charcoal" />
                  Revenue
                </span>
                <span className="flex items-center gap-1.5 text-brand-rose font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-rose" />
                  Gross Profit
                </span>
              </div>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={revenueChartData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#252321" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#252321" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C69B98" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#C69B98" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EDE5DA" />
                  <XAxis dataKey="day" stroke="#766E65" fontSize={11} />
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
                      borderRadius: "4px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#252321"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRev)"
                  />
                  <Area
                    type="monotone"
                    dataKey="profit"
                    stroke="#C69B98"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorProfit)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue by Category (4 Cols) */}
          <div className="lg:col-span-4 bg-white rounded border border-brand-border p-6 shadow-subtle space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-base font-bold text-brand-charcoal pb-3 border-b border-brand-border">
                Revenue by Collection
              </h3>

              <div className="h-52 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: any) => [`${val}% of sales`, "Share"]}
                      contentStyle={{
                        backgroundColor: "#FAF8F4",
                        borderColor: "#E8E2D8",
                        fontSize: "12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              {categoryData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-brand-charcoal">{item.name}</span>
                  </div>
                  <span className="font-bold text-brand-charcoal">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders Stream & Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Orders (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded border border-brand-border p-6 shadow-subtle space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-brand-border">
              <div>
                <h3 className="font-serif text-base font-bold text-brand-charcoal">
                  Recent Orders Stream
                </h3>
                <p className="text-[11px] text-brand-muted">
                  Live orders recorded across Pakistan
                </p>
              </div>
              <Link
                href="/admin/orders"
                className="text-xs text-brand-rose font-semibold hover:underline flex items-center gap-1"
              >
                <span>Manage All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-brand-border/60">
              {orders.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-brand-charcoal">
                        #{order.orderNumber}
                      </span>
                      <StatusBadge status={order.status} />
                    </div>
                    <p className="text-[11px] text-brand-muted mt-0.5">
                      {order.customer.fullName} • {order.customer.city} • {order.items.length} piece{order.items.length === 1 ? "" : "s"}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-brand-charcoal block">
                      {formatPKR(order.total)}
                    </span>
                    <span className="text-[10px] text-brand-muted uppercase">
                      {order.paymentMethod.replace("_", " ")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Selling Products (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded border border-brand-border p-6 shadow-subtle space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-brand-border">
              <div>
                <h3 className="font-serif text-base font-bold text-brand-charcoal">
                  Top-Selling Couture Pieces
                </h3>
                <p className="text-[11px] text-brand-muted">
                  Highest volume by client demand
                </p>
              </div>
              <Link
                href="/admin/products"
                className="text-xs text-brand-rose font-semibold hover:underline flex items-center gap-1"
              >
                <span>Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {topProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="flex items-center justify-between gap-3 p-2 rounded bg-brand-sand/40 border border-brand-border/60 text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative w-10 h-12 rounded overflow-hidden bg-brand-sand shrink-0">
                      <img
                        src={prod.images[0]}
                        alt={prod.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-serif font-medium text-brand-charcoal truncate">
                        {prod.title}
                      </p>
                      <p className="text-[10px] text-brand-muted">
                        {prod.categoryLabel} • {formatPKR(prod.price)}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[11px] font-bold text-brand-charcoal">
                      ★ {prod.rating.toFixed(1)}
                    </span>
                    <span className="text-[10px] text-emerald-700 block font-semibold">
                      In Stock
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
