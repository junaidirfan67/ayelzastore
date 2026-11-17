"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Boxes,
  Tag,
  TrendingUp,
  BarChart3,
  Globe,
  Sliders,
  Sparkles,
  Radio,
  FileText,
  RotateCcw,
  Store,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";

interface AdminSidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  mobileOpen,
  setMobileOpen,
}) => {
  const pathname = usePathname();
  const { resetStoreData } = useStore();

  const navSections = [
    {
      title: "Store Management",
      links: [
        { name: "Dashboard Overview", href: "/admin", icon: LayoutDashboard },
        { name: "Products & Catalog", href: "/admin/products", icon: Package },
        { name: "Orders & Fulfillment", href: "/admin/orders", icon: ShoppingBag },
        { name: "Customer Directory", href: "/admin/customers", icon: Users },
        { name: "Inventory Control", href: "/admin/inventory", icon: Boxes },
        { name: "Discounts & Vouchers", href: "/admin/discounts", icon: Tag },
      ],
    },
    {
      title: "Marketing & Analytics",
      highlight: true,
      links: [
        { name: "Marketing Overview", href: "/admin/marketing/overview", icon: TrendingUp },
        { name: "Meta Ads (IG & FB)", href: "/admin/marketing/meta", icon: BarChart3 },
        { name: "Google Ads Performance", href: "/admin/marketing/google", icon: Globe },
        { name: "Channel Attribution", href: "/admin/marketing/attribution", icon: Sliders },
        { name: "Campaign Manager", href: "/admin/marketing/campaigns", icon: Radio },
        { name: "Marketing Insights", href: "/admin/marketing/insights", icon: Sparkles },
        { name: "Pixel & CAPI Tracking", href: "/admin/marketing/tracking", icon: Radio },
      ],
    },
    {
      title: "Business Intelligence",
      links: [
        { name: "Reports & Profitability", href: "/admin/reports", icon: FileText },
        { name: "Content & Storefront", href: "/admin/content", icon: Store },
      ],
    },
  ];

  const content = (
    <div className="h-full flex flex-col justify-between bg-brand-charcoal text-white/80 p-4">
      <div>
        {/* Brand Header */}
        <div className="pb-6 mb-6 border-b border-white/10 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-brand-rose flex items-center justify-center text-white font-serif font-bold text-lg">
              A
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-widest uppercase text-white block leading-none">
                ALEYZA
              </span>
              <span className="text-[9px] uppercase tracking-wider text-brand-rose block mt-1 font-semibold">
                Admin Business Suite
              </span>
            </div>
          </Link>
          <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            Live
          </span>
        </div>

        {/* Navigation Sections */}
        <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-250px)] pr-1">
          {navSections.map((sec) => (
            <div key={sec.title}>
              <div className="flex items-center justify-between mb-2 px-2">
                <span
                  className={`text-[10px] uppercase tracking-[0.2em] font-bold ${
                    sec.highlight ? "text-brand-rose" : "text-white/40"
                  }`}
                >
                  {sec.title}
                </span>
                {sec.highlight && (
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-rose animate-ping" />
                )}
              </div>

              <div className="space-y-1">
                {sec.links.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 rounded text-xs transition-colors ${
                        isActive
                          ? "bg-brand-rose text-white font-semibold shadow-sm"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="truncate">{link.name}</span>
                      </div>
                      {isActive && <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Utilities */}
      <div className="pt-4 border-t border-white/10 space-y-2">
        <button
          onClick={resetStoreData}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded bg-white/5 hover:bg-white/10 text-white/70 text-xs transition-colors border border-white/10"
          title="Restore fresh demo catalog & marketing numbers"
        >
          <RotateCcw className="w-3.5 h-3.5 text-brand-rose" />
          <span>Reset Demo Store Data</span>
        </button>

        <Link
          href="/"
          target="_blank"
          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
        >
          <span>View Live Storefront</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 shrink-0 z-30 shadow-subtle">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-64 bg-brand-charcoal z-50 animate-slideRight">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
