"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  Bell,
  Search,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatPKR, formatDateTime } from "@/lib/utils";

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuClick }) => {
  const { orders } = useStore();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const pendingOrders = orders.filter((o) => o.status === "pending" || o.status === "processing");

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-brand-border/80 px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-brand-charcoal hover:bg-brand-sand rounded"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block font-serif text-sm font-bold text-brand-charcoal uppercase tracking-wider">
            Aleyza Store Operations
          </span>
          <span className="hidden md:inline-block text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
            ● All Systems Operational
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Currency Pill */}
        <span className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded bg-brand-sand text-brand-charcoal border border-brand-border">
          <span>PKR (Rs.)</span>
        </span>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded hover:bg-brand-sand text-brand-charcoal transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {pendingOrders.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand-rose animate-pulse" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div
              className="absolute right-0 mt-2 w-80 bg-white rounded border border-brand-border shadow-modal p-4 z-50 animate-fadeIn text-xs"
              onMouseLeave={() => setNotificationsOpen(false)}
            >
              <div className="flex items-center justify-between pb-3 border-b border-brand-border font-bold">
                <span className="text-brand-charcoal">Fulfillment Alerts</span>
                <span className="text-[10px] text-brand-rose uppercase">
                  {pendingOrders.length} Pending Action
                </span>
              </div>

              <div className="py-2 divide-y divide-brand-border/60 max-h-64 overflow-y-auto">
                {pendingOrders.slice(0, 4).map((ord) => (
                  <Link
                    key={ord.id}
                    href="/admin/orders"
                    onClick={() => setNotificationsOpen(false)}
                    className="block py-2 hover:bg-brand-sand/50 transition-colors"
                  >
                    <p className="font-semibold text-brand-charcoal">
                      Order #{ord.orderNumber} ({formatPKR(ord.total)})
                    </p>
                    <p className="text-[11px] text-brand-muted">
                      {ord.customer.fullName} • {ord.customer.city}
                    </p>
                  </Link>
                ))}
              </div>

              <div className="pt-2 border-t border-brand-border text-center">
                <Link
                  href="/admin/orders"
                  onClick={() => setNotificationsOpen(false)}
                  className="text-brand-rose font-semibold hover:underline block"
                >
                  View All Orders →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Public Storefront Link */}
        <Link
          href="/"
          target="_blank"
          className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded bg-brand-charcoal text-white hover:bg-brand-brown transition-colors"
        >
          <span>Storefront</span>
          <ExternalLink className="w-3 h-3 text-brand-rose" />
        </Link>

        {/* Admin Badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-brand-border">
          <div className="w-7 h-7 rounded-full bg-brand-rose text-white flex items-center justify-center font-bold text-xs">
            A
          </div>
          <div className="hidden md:block text-left text-xs leading-none">
            <span className="font-bold text-brand-charcoal block">Admin</span>
            <span className="text-[10px] text-brand-muted">Lead Architect</span>
          </div>
        </div>
      </div>
    </header>
  );
};
