"use client";

import React, { useState } from "react";
import {
  Tag,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Calendar,
  X,
  Sparkles,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useStore } from "@/context/StoreContext";
import { Coupon } from "@/types";
import { formatPKR, formatDate } from "@/lib/utils";

export default function AdminDiscountsPage() {
  const { coupons, addCoupon, toggleCouponStatus, deleteCoupon } = useStore();
  const [modalOpen, setModalOpen] = useState(false);

  // Form
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage");
  const [value, setValue] = useState(15);
  const [minOrderAmount, setMinOrderAmount] = useState(5000);
  const [expiryDate, setExpiryDate] = useState("2026-12-31");
  const [usageLimit, setUsageLimit] = useState(500);
  const [description, setDescription] = useState("");

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;

    const newCoupon: Coupon = {
      code: code.trim().toUpperCase(),
      discountType,
      value,
      minOrderAmount,
      expiryDate,
      usageLimit,
      usageCount: 0,
      isActive: true,
      description: description || `${value}${discountType === "percentage" ? "%" : " PKR"} off orders above ${formatPKR(minOrderAmount)}`,
    };

    addCoupon(newCoupon);
    setModalOpen(false);
    setCode("");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-rose block mb-1">
              Revenue Growth Engine
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal">
              Discounts, Vouchers &amp; VIP Privilege Codes
            </h1>
            <p className="text-xs text-brand-muted mt-1">
              Configure seasonal promotional codes, minimum order criteria, and usage limits.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-2.5 bg-brand-charcoal text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-brand-brown transition-colors flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 text-brand-rose" />
            <span>Create Privilege Code</span>
          </button>
        </div>

        {/* Coupons Table */}
        <div className="bg-white rounded border border-brand-border shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-sand/70 text-brand-charcoal uppercase font-bold tracking-wider border-b border-brand-border">
                <tr>
                  <th className="py-3.5 px-4">Coupon Code</th>
                  <th className="py-3.5 px-4">Discount Value</th>
                  <th className="py-3.5 px-4">Min. Order Value</th>
                  <th className="py-3.5 px-4">Redemptions</th>
                  <th className="py-3.5 px-4">Expires</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {coupons.map((c) => (
                  <tr key={c.code} className="hover:bg-brand-sand/30">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Tag className="w-3.5 h-3.5 text-brand-rose shrink-0" />
                        <div>
                          <span className="font-mono font-bold text-brand-charcoal text-sm">
                            {c.code}
                          </span>
                          <span className="text-[10px] text-brand-muted block">
                            {c.description}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-bold text-brand-charcoal">
                      {c.discountType === "percentage"
                        ? `${c.value}% OFF`
                        : `Flat ${formatPKR(c.value)} OFF`}
                    </td>

                    <td className="py-3 px-4 text-brand-muted">
                      {formatPKR(c.minOrderAmount)}
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-semibold text-brand-charcoal">
                        {c.usageCount}
                      </span>
                      <span className="text-brand-muted"> / {c.usageLimit}</span>
                    </td>

                    <td className="py-3 px-4 text-brand-muted">
                      {formatDate(c.expiryDate)}
                    </td>

                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => toggleCouponStatus(c.code)}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold transition-colors ${
                          c.isActive
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-gray-100 text-gray-600 border border-gray-200"
                        }`}
                      >
                        {c.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => deleteCoupon(c.code)}
                        className="p-1.5 text-brand-muted hover:text-red-600 rounded hover:bg-brand-sand"
                        title="Delete promotion"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
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
                  Create Promotional Code
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1 text-brand-muted hover:text-brand-charcoal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs">
                <div>
                  <label className="block text-brand-charcoal font-medium mb-1">
                    Coupon Code (Uppercase) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="e.g. EIDLUXE20"
                    className="w-full uppercase font-mono px-3 py-2 border border-brand-border rounded focus:outline-none focus:border-brand-rose"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-brand-charcoal font-medium mb-1">
                      Discount Type
                    </label>
                    <select
                      value={discountType}
                      onChange={(e) =>
                        setDiscountType(e.target.value as "percentage" | "fixed")
                      }
                      className="w-full px-3 py-2 border border-brand-border rounded bg-white"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (PKR)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-brand-charcoal font-medium mb-1">
                      Discount Value <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={value}
                      onChange={(e) => setValue(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-brand-border rounded font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-brand-charcoal font-medium mb-1">
                      Min. Order Value (PKR)
                    </label>
                    <input
                      type="number"
                      required
                      value={minOrderAmount}
                      onChange={(e) => setMinOrderAmount(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-brand-border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-brand-charcoal font-medium mb-1">
                      Usage Limit
                    </label>
                    <input
                      type="number"
                      required
                      value={usageLimit}
                      onChange={(e) => setUsageLimit(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-brand-border rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-brand-charcoal font-medium mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    required
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full px-3 py-2 border border-brand-border rounded"
                  />
                </div>

                <div>
                  <label className="block text-brand-charcoal font-medium mb-1">
                    Description / Internal Note
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. Eid Festive VIP privilege voucher"
                    className="w-full px-3 py-2 border border-brand-border rounded"
                  />
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
                    Publish Promotion
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
