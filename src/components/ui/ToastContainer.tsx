"use client";

import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 bg-brand-charcoal text-white rounded shadow-modal border border-white/10 animate-slideUp text-sm"
        >
          <div className="flex items-center gap-2.5">
            {toast.type === "success" && (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            {toast.type === "error" && (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            {toast.type === "info" && (
              <Info className="w-4 h-4 text-brand-rose shrink-0" />
            )}
            <span className="text-xs tracking-wide leading-relaxed">
              {toast.message}
            </span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
