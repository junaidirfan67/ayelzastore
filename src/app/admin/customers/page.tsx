"use client";

import React, { useState } from "react";
import {
  Users,
  Search,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { useStore } from "@/context/StoreContext";
import { Customer } from "@/types";
import { formatPKR, formatDate, exportToCSV } from "@/lib/utils";

export default function AdminCustomersPage() {
  const { customers, orders } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [segmentFilter, setSegmentFilter] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter((cust) => {
    if (segmentFilter !== "all" && cust.segment !== segmentFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        cust.name.toLowerCase().includes(q) ||
        cust.email.toLowerCase().includes(q) ||
        cust.phone.toLowerCase().includes(q) ||
        cust.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleExportCSV = () => {
    const rows = filteredCustomers.map((c) => ({
      Name: c.name,
      Email: c.email,
      Phone: c.phone,
      City: c.city,
      Province: c.province,
      TotalOrders: c.totalOrders,
      TotalSpentPKR: c.totalSpent,
      LTV_PKR: c.ltv,
      Segment: c.segment,
      FirstOrder: c.firstOrderDate,
      LastPurchase: c.lastPurchaseDate,
    }));
    exportToCSV("aleyza-customers", rows);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-rose block mb-1">
              Client Relationship Management
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal">
              Customer Directory &amp; LTV Intelligence
            </h1>
            <p className="text-xs text-brand-muted mt-1">
              Segmented patrons across Lahore, Karachi, and Islamabad with spend tracking.
            </p>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2 border border-brand-border bg-white text-brand-charcoal text-xs uppercase tracking-wider font-semibold rounded hover:bg-brand-sand transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Download className="w-3.5 h-3.5 text-brand-rose" />
            <span>Export Customers CSV</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded border border-brand-border p-4 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-brand-muted absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by patron name, phone, email, or city..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-brand-border rounded focus:outline-none focus:border-brand-rose bg-brand-ivory text-brand-charcoal"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-brand-muted">Segment:</span>
            <select
              value={segmentFilter}
              onChange={(e) => setSegmentFilter(e.target.value)}
              className="text-xs px-3 py-2 border border-brand-border rounded bg-white text-brand-charcoal focus:outline-none focus:border-brand-rose"
            >
              <option value="all">All Patrons ({customers.length})</option>
              <option value="VIP">VIP Patrons</option>
              <option value="Loyal">Loyal Patrons</option>
              <option value="New">New Patrons</option>
              <option value="At Risk">At Risk</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded border border-brand-border shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-sand/70 text-brand-charcoal uppercase font-bold tracking-wider border-b border-brand-border">
                <tr>
                  <th className="py-3.5 px-4">Patron</th>
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4 text-center">Orders</th>
                  <th className="py-3.5 px-4">Total Spent (LTV)</th>
                  <th className="py-3.5 px-4">Segment</th>
                  <th className="py-3.5 px-4">Last Purchase</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {filteredCustomers.map((cust) => (
                  <tr
                    key={cust.id}
                    className="hover:bg-brand-sand/30 transition-colors"
                  >
                    <td className="py-3 px-4 font-semibold text-brand-charcoal">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-brand-sand flex items-center justify-center font-bold text-xs text-brand-charcoal shrink-0">
                          {cust.name.charAt(0)}
                        </div>
                        <div>
                          <span>{cust.name}</span>
                          <span className="text-[10px] text-brand-muted block font-normal">
                            First order: {formatDate(cust.firstOrderDate)}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <p className="text-brand-charcoal">{cust.email}</p>
                      <p className="text-brand-muted text-[11px]">{cust.phone}</p>
                    </td>

                    <td className="py-3 px-4 text-brand-muted">
                      {cust.city}, {cust.province}
                    </td>

                    <td className="py-3 px-4 text-center font-bold text-brand-charcoal">
                      {cust.totalOrders}
                    </td>

                    <td className="py-3 px-4 font-bold text-brand-charcoal">
                      {formatPKR(cust.totalSpent)}
                    </td>

                    <td className="py-3 px-4">
                      <StatusBadge status={cust.segment} />
                    </td>

                    <td className="py-3 px-4 text-brand-muted">
                      {formatDate(cust.lastPurchaseDate)}
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
