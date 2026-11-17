"use client";

import React, { useState } from "react";
import { X, Ruler } from "lucide-react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [unit, setUnit] = useState<"inches" | "cm">("inches");

  if (!isOpen) return null;

  const sizeChartInches = [
    { size: "XS", bust: "34 - 35", waist: "26 - 27", hip: "36 - 37", length: "42" },
    { size: "S", bust: "36 - 37", waist: "28 - 29", hip: "38 - 39", length: "43" },
    { size: "M", bust: "38 - 40", waist: "30 - 32", hip: "40 - 42", length: "44" },
    { size: "L", bust: "41 - 43", waist: "33 - 35", hip: "43 - 45", length: "44" },
    { size: "XL", bust: "44 - 46", waist: "36 - 38", hip: "46 - 48", length: "45" },
  ];

  const sizeChartCm = [
    { size: "XS", bust: "86 - 89", waist: "66 - 69", hip: "91 - 94", length: "107" },
    { size: "S", bust: "91 - 94", waist: "71 - 74", hip: "96 - 99", length: "109" },
    { size: "M", bust: "97 - 102", waist: "76 - 81", hip: "102 - 107", length: "112" },
    { size: "L", bust: "104 - 109", waist: "84 - 89", hip: "109 - 114", length: "112" },
    { size: "XL", bust: "112 - 117", waist: "91 - 97", hip: "117 - 122", length: "114" },
  ];

  const chart = unit === "inches" ? sizeChartInches : sizeChartCm;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-lg bg-brand-ivory rounded shadow-modal border border-brand-border p-6 z-50 animate-slideUp">
          <div className="flex items-center justify-between pb-4 border-b border-brand-border">
            <div className="flex items-center gap-2">
              <Ruler className="w-5 h-5 text-brand-rose" />
              <h3 className="font-serif text-lg font-medium text-brand-charcoal">
                Size & Measurement Guide
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-brand-muted hover:text-brand-charcoal transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Unit Toggle */}
          <div className="flex items-center justify-between py-4">
            <p className="text-xs text-brand-muted">
              All measurements are garment specifications designed for Pakistani prêt standard sizing.
            </p>
            <div className="flex border border-brand-border rounded overflow-hidden text-xs shrink-0 ml-2">
              <button
                onClick={() => setUnit("inches")}
                className={`px-3 py-1 font-semibold transition-colors ${
                  unit === "inches"
                    ? "bg-brand-charcoal text-white"
                    : "bg-white text-brand-charcoal hover:bg-brand-sand"
                }`}
              >
                Inches
              </button>
              <button
                onClick={() => setUnit("cm")}
                className={`px-3 py-1 font-semibold transition-colors ${
                  unit === "cm"
                    ? "bg-brand-charcoal text-white"
                    : "bg-white text-brand-charcoal hover:bg-brand-sand"
                }`}
              >
                CM
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-brand-border rounded bg-white">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-sand/70 text-[11px] uppercase tracking-wider text-brand-charcoal font-semibold border-b border-brand-border">
                <tr>
                  <th className="py-2.5 px-3">Size</th>
                  <th className="py-2.5 px-3">Bust ({unit})</th>
                  <th className="py-2.5 px-3">Waist ({unit})</th>
                  <th className="py-2.5 px-3">Hips ({unit})</th>
                  <th className="py-2.5 px-3">Shirt Length ({unit})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {chart.map((row) => (
                  <tr key={row.size} className="hover:bg-brand-sand/40">
                    <td className="py-2.5 px-3 font-bold text-brand-charcoal">
                      {row.size}
                    </td>
                    <td className="py-2.5 px-3 text-brand-muted">{row.bust}</td>
                    <td className="py-2.5 px-3 text-brand-muted">{row.waist}</td>
                    <td className="py-2.5 px-3 text-brand-muted">{row.hip}</td>
                    <td className="py-2.5 px-3 text-brand-muted">{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-3 bg-brand-sand/50 rounded text-[11px] text-brand-muted space-y-1">
            <p>
              • <strong>Bust:</strong> Measure around the fullest part of your chest.
            </p>
            <p>
              • <strong>Waist:</strong> Measure around your natural waistline.
            </p>
            <p>
              • If between sizes, we recommend selecting the larger size for a modest Pakistani silhouette.
            </p>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-brand-charcoal text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-brand-brown transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
