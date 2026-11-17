"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Boxes,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Minus,
  Search,
  CheckCircle2,
  DollarSign,
  Package,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { MetricCard } from "@/components/admin/MetricCard";
import { useStore } from "@/context/StoreContext";
import { formatPKR } from "@/lib/utils";

export default function AdminInventoryPage() {
  const { products, updateProduct, addToast } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [adjustModalProduct, setAdjustModalProduct] = useState<{
    productId: string;
    variantId: string;
    title: string;
    size: string;
    currentStock: number;
  } | null>(null);

  const [adjustDelta, setAdjustDelta] = useState(5);
  const [adjustReason, setAdjustReason] = useState<"restock" | "damaged" | "audit" | "return">("restock");

  // Metrics
  const totalStockUnits = products.reduce(
    (sum, p) => sum + p.variants.reduce((vs, v) => vs + v.stock, 0),
    0
  );

  const inventoryValuation = products.reduce(
    (sum, p) =>
      sum +
      p.variants.reduce(
        (vs, v) => vs + v.stock * (p.costPrice || Math.round(p.price * 0.5)),
        0
      ),
    0
  );

  const lowStockVariants = products.flatMap((p) =>
    p.variants
      .filter((v) => v.stock > 0 && v.stock <= 5)
      .map((v) => ({ ...v, productTitle: p.title, productId: p.id, price: p.price }))
  );

  const outOfStockVariants = products.flatMap((p) =>
    p.variants
      .filter((v) => v.stock === 0)
      .map((v) => ({ ...v, productTitle: p.title, productId: p.id, price: p.price }))
  );

  // Handle stock adjustment
  const handleApplyAdjustment = () => {
    if (!adjustModalProduct) return;
    const targetProduct = products.find((p) => p.id === adjustModalProduct.productId);
    if (!targetProduct) return;

    const newStock = Math.max(0, adjustModalProduct.currentStock + adjustDelta);
    const updatedVariants = targetProduct.variants.map((v) =>
      v.id === adjustModalProduct.variantId ? { ...v, stock: newStock } : v
    );

    updateProduct(targetProduct.id, { variants: updatedVariants });
    addToast(
      `Adjusted stock for ${adjustModalProduct.title} (${adjustModalProduct.size}) to ${newStock} units (${adjustReason}).`,
      "success"
    );
    setAdjustModalProduct(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-rose block mb-1">
              Atelier Warehousing
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal">
              Inventory Control &amp; Valuation
            </h1>
            <p className="text-xs text-brand-muted mt-1">
              Manage variant level stocks, warehouse audits, and restocking alerts.
            </p>
          </div>
        </div>

        {/* Valuation KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <MetricCard
            title="Total Stock Valuation (Cost)"
            value={formatPKR(inventoryValuation)}
            subtitle="Based on estimated COGS"
            icon={DollarSign}
          />
          <MetricCard
            title="Total Finished Garments"
            value={`${totalStockUnits} units`}
            subtitle="Across all sizes and colors"
            icon={Boxes}
          />
          <MetricCard
            title="Low Stock Style Alerts"
            value={`${lowStockVariants.length} alerts`}
            subtitle="Styles with ≤ 5 units remaining"
            icon={AlertTriangle}
          />
        </div>

        {/* Low Stock Warning Callout */}
        {lowStockVariants.length > 0 && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-800">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Urgent Restocking Attention Required ({lowStockVariants.length} Variants)</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {lowStockVariants.slice(0, 6).map((item) => (
                <span
                  key={item.id}
                  className="px-2.5 py-1 bg-white border border-amber-300 rounded text-amber-900 font-medium"
                >
                  {item.productTitle} ({item.size}) — <strong>{item.stock} left</strong>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Main Products & Variant Stock Table */}
        <div className="bg-white rounded border border-brand-border shadow-subtle overflow-hidden">
          <div className="p-4 border-b border-brand-border flex items-center justify-between gap-4">
            <h3 className="font-serif text-base font-bold text-brand-charcoal">
              Product Variant Stock Breakdown
            </h3>
            <div className="relative max-w-xs">
              <Search className="w-3.5 h-3.5 text-brand-muted absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search style or SKU..."
                className="pl-8 pr-3 py-1.5 text-xs border border-brand-border rounded focus:outline-none focus:border-brand-rose bg-brand-ivory"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-sand/70 text-brand-charcoal uppercase font-bold tracking-wider border-b border-brand-border">
                <tr>
                  <th className="py-3 px-4">Design Style</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Variant Stock by Size</th>
                  <th className="py-3 px-4 text-center">Total Stock</th>
                  <th className="py-3 px-4 text-right">Adjust</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {products
                  .filter(
                    (p) =>
                      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      p.sku.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((p) => {
                    const totalPStock = p.variants.reduce((a, b) => a + b.stock, 0);
                    return (
                      <tr key={p.id} className="hover:bg-brand-sand/30">
                        <td className="py-3 px-4">
                          <span className="font-serif font-semibold text-brand-charcoal block">
                            {p.title}
                          </span>
                          <span className="text-[10px] font-mono text-brand-muted">
                            {p.sku}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-brand-muted">
                          {p.categoryLabel}
                        </td>

                        <td className="py-3 px-4 font-bold text-brand-charcoal">
                          {formatPKR(p.price)}
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {p.variants.map((v) => (
                              <button
                                key={v.id}
                                onClick={() =>
                                  setAdjustModalProduct({
                                    productId: p.id,
                                    variantId: v.id,
                                    title: p.title,
                                    size: v.size,
                                    currentStock: v.stock,
                                  })
                                }
                                className={`px-2 py-0.5 rounded border text-[11px] font-medium transition-colors ${
                                  v.stock > 5
                                    ? "bg-white border-brand-border text-brand-charcoal hover:border-brand-charcoal"
                                    : v.stock > 0
                                    ? "bg-amber-50 border-amber-300 text-amber-800"
                                    : "bg-red-50 border-red-300 text-red-700 font-bold"
                                }`}
                                title="Click to adjust stock"
                              >
                                {v.size}: <strong>{v.stock}</strong>
                              </button>
                            ))}
                          </div>
                        </td>

                        <td className="py-3 px-4 text-center">
                          <span
                            className={`font-bold ${
                              totalPStock > 10
                                ? "text-emerald-700"
                                : totalPStock > 0
                                ? "text-amber-700"
                                : "text-red-600"
                            }`}
                          >
                            {totalPStock} units
                          </span>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() =>
                              setAdjustModalProduct({
                                productId: p.id,
                                variantId: p.variants[0]?.id || "",
                                title: p.title,
                                size: p.variants[0]?.size || "M",
                                currentStock: p.variants[0]?.stock || 0,
                              })
                            }
                            className="px-2.5 py-1 text-xs font-semibold bg-brand-charcoal text-white rounded hover:bg-brand-brown"
                          >
                            Adjust
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Adjust Modal */}
      {adjustModalProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setAdjustModalProduct(null)}
          />

          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-white rounded shadow-modal border border-brand-border p-6 z-50 animate-slideUp">
              <h3 className="font-serif text-lg font-bold text-brand-charcoal mb-1">
                Stock Adjustment Audit
              </h3>
              <p className="text-xs text-brand-muted mb-4">
                {adjustModalProduct.title} — Size:{" "}
                <strong>{adjustModalProduct.size}</strong> (Current:{" "}
                {adjustModalProduct.currentStock} units)
              </p>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-brand-charcoal font-medium mb-1">
                    Adjustment Units (+/-):
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAdjustDelta((d) => d - 1)}
                      className="p-2 border border-brand-border rounded hover:bg-brand-sand text-brand-charcoal"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="number"
                      value={adjustDelta}
                      onChange={(e) => setAdjustDelta(Number(e.target.value))}
                      className="w-24 text-center py-1.5 border border-brand-border rounded font-bold"
                    />
                    <button
                      type="button"
                      onClick={() => setAdjustDelta((d) => d + 1)}
                      className="p-2 border border-brand-border rounded hover:bg-brand-sand text-brand-charcoal"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-brand-muted">
                      Result:{" "}
                      <strong>
                        {Math.max(
                          0,
                          adjustModalProduct.currentStock + adjustDelta
                        )}
                      </strong>{" "}
                      units
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-brand-charcoal font-medium mb-1">
                    Adjustment Reason:
                  </label>
                  <select
                    value={adjustReason}
                    onChange={(e) => setAdjustReason(e.target.value as any)}
                    className="w-full px-3 py-2 border border-brand-border rounded bg-white"
                  >
                    <option value="restock">New Atelier Restock Batch</option>
                    <option value="return">Customer Exchange Restock</option>
                    <option value="damaged">Damaged / Flawed Fabric Write-Off</option>
                    <option value="audit">Periodic Physical Inventory Audit</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-brand-border">
                  <button
                    type="button"
                    onClick={() => setAdjustModalProduct(null)}
                    className="px-4 py-2 border border-brand-border rounded text-brand-muted"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleApplyAdjustment}
                    className="px-6 py-2 bg-brand-charcoal text-white font-semibold rounded hover:bg-brand-brown"
                  >
                    Commit Adjustment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
