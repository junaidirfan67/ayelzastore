"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Search,
  Filter,
  Download,
  Printer,
  Truck,
  Eye,
  CheckCircle2,
  Clock,
  RotateCcw,
  AlertCircle,
  X,
  Compass,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { InvoiceModal } from "@/components/admin/InvoiceModal";
import { useStore } from "@/context/StoreContext";
import { Order, OrderStatus } from "@/types";
import {
  formatPKR,
  formatDate,
  formatDateTime,
  exportToCSV,
  generateTrackingNumber,
} from "@/lib/utils";

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus, addOrderTracking } = useStore();

  const [activeTab, setActiveTab] = useState<OrderStatus | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);

  // Status update modal / drawer
  const [statusToUpdate, setStatusToUpdate] = useState<OrderStatus>("processing");
  const [statusNote, setStatusNote] = useState("");
  const [trackingNumberInput, setTrackingNumberInput] = useState("");
  const [courierInput, setCourierInput] = useState("TCS Express");

  // Filtered orders
  const filteredOrders = orders.filter((ord) => {
    if (activeTab !== "all" && ord.status !== activeTab) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        ord.orderNumber.toLowerCase().includes(q) ||
        ord.customer.fullName.toLowerCase().includes(q) ||
        ord.customer.phone.toLowerCase().includes(q) ||
        ord.customer.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleExportCSV = () => {
    const rows = filteredOrders.map((o) => ({
      OrderNumber: o.orderNumber,
      Date: formatDate(o.date),
      Customer: o.customer.fullName,
      Email: o.customer.email,
      Phone: o.customer.phone,
      City: o.customer.city,
      Status: o.status,
      ItemsCount: o.items.length,
      TotalPKR: o.total,
      PaymentMethod: o.paymentMethod,
      PaymentStatus: o.paymentStatus,
      TrackingNumber: o.trackingNumber || "",
      Courier: o.courier || "",
    }));
    exportToCSV(`aleyza-orders-${activeTab}`, rows);
  };

  const handleApplyStatus = () => {
    if (!selectedOrder) return;
    updateOrderStatus(selectedOrder.id, statusToUpdate, statusNote);
    setSelectedOrder({
      ...selectedOrder,
      status: statusToUpdate,
    });
    setStatusNote("");
  };

  const handleApplyTracking = () => {
    if (!selectedOrder) return;
    const trk = trackingNumberInput || generateTrackingNumber(courierInput);
    addOrderTracking(selectedOrder.id, trk, courierInput);
    setSelectedOrder({
      ...selectedOrder,
      status: "shipped",
      trackingNumber: trk,
      courier: courierInput,
    });
    setTrackingNumberInput("");
  };

  const orderStatuses: { label: string; value: OrderStatus | "all" }[] = [
    { label: "All Orders", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Confirmed", value: "confirmed" },
    { label: "Processing", value: "processing" },
    { label: "Shipped", value: "shipped" },
    { label: "Delivered", value: "delivered" },
    { label: "Cancelled", value: "cancelled" },
    { label: "Returned", value: "returned" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-rose block mb-1">
              Fulfillment Command Center
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal">
              Orders &amp; Consignment Management
            </h1>
            <p className="text-xs text-brand-muted mt-1">
              Track, dispatch, update statuses, and generate official customer invoices.
            </p>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2 border border-brand-border bg-white text-brand-charcoal text-xs uppercase tracking-wider font-semibold rounded hover:bg-brand-sand transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Download className="w-3.5 h-3.5 text-brand-rose" />
            <span>Export Orders to CSV</span>
          </button>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex border-b border-brand-border overflow-x-auto text-xs font-semibold uppercase tracking-wider">
          {orderStatuses.map((st) => {
            const count =
              st.value === "all"
                ? orders.length
                : orders.filter((o) => o.status === st.value).length;
            return (
              <button
                key={st.value}
                onClick={() => setActiveTab(st.value)}
                className={`pb-3 px-4 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === st.value
                    ? "border-brand-charcoal text-brand-charcoal font-bold"
                    : "border-transparent text-brand-muted hover:text-brand-charcoal"
                }`}
              >
                <span>{st.label}</span>
                <span className="text-[10px] opacity-70 px-1.5 py-0.2 bg-brand-sand rounded-full">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="bg-white rounded border border-brand-border p-4 shadow-subtle flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-brand-muted absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by order # (ALZ-94821), customer name, phone, city..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-brand-border rounded focus:outline-none focus:border-brand-rose bg-brand-ivory text-brand-charcoal"
            />
          </div>
          <span className="text-xs text-brand-muted">
            Found <strong>{filteredOrders.length}</strong> matching orders
          </span>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded border border-brand-border shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-sand/70 text-brand-charcoal uppercase font-bold tracking-wider border-b border-brand-border">
                <tr>
                  <th className="py-3.5 px-4">Order Ref</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Customer &amp; City</th>
                  <th className="py-3.5 px-4">Payment</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Total (PKR)</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {filteredOrders.map((ord) => (
                  <tr
                    key={ord.id}
                    className="hover:bg-brand-sand/30 transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedOrder(ord);
                      setStatusToUpdate(ord.status);
                    }}
                  >
                    <td className="py-3 px-4 font-mono font-bold text-brand-charcoal">
                      #{ord.orderNumber}
                    </td>

                    <td className="py-3 px-4 text-brand-muted">
                      {formatDate(ord.date)}
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-semibold text-brand-charcoal block">
                        {ord.customer.fullName}
                      </span>
                      <span className="text-[10px] text-brand-muted">
                        {ord.customer.city}, {ord.customer.province}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="uppercase text-[11px] font-medium text-brand-charcoal block">
                        {ord.paymentMethod.replace("_", " ")}
                      </span>
                      <StatusBadge status={ord.paymentStatus} />
                    </td>

                    <td className="py-3 px-4">
                      <StatusBadge status={ord.status} />
                    </td>

                    <td className="py-3 px-4 font-bold text-brand-charcoal">
                      {formatPKR(ord.total)}
                    </td>

                    <td
                      className="py-3 px-4 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setSelectedOrder(ord);
                            setStatusToUpdate(ord.status);
                          }}
                          className="px-2.5 py-1 bg-brand-charcoal text-white rounded text-[11px] font-semibold hover:bg-brand-brown"
                        >
                          Manage
                        </button>
                        <button
                          onClick={() => setInvoiceOrder(ord)}
                          className="p-1.5 text-brand-muted hover:text-brand-charcoal rounded hover:bg-brand-sand"
                          title="Print Invoice"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Order Detail Drawer / Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedOrder(null)}
          />

          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="relative w-full max-w-3xl bg-white rounded shadow-modal border border-brand-border p-6 sm:p-8 z-50 animate-slideUp">
              <div className="flex items-center justify-between pb-4 border-b border-brand-border mb-6">
                <div>
                  <span className="text-[10px] uppercase font-bold text-brand-rose block">
                    Fulfillment Operations
                  </span>
                  <h2 className="font-mono text-xl font-bold text-brand-charcoal">
                    Order #{selectedOrder.orderNumber}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setInvoiceOrder(selectedOrder)}
                    className="px-3 py-1.5 border border-brand-border text-xs rounded hover:bg-brand-sand flex items-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5 text-brand-rose" />
                    <span>Invoice</span>
                  </button>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="p-1.5 text-brand-muted hover:text-brand-charcoal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Status Update & Tracking Dispatch Panel */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded bg-brand-sand/50 border border-brand-border mb-6 text-xs">
                {/* Status Update */}
                <div className="space-y-2">
                  <span className="font-bold text-brand-charcoal uppercase text-[10px]">
                    Update Order Status:
                  </span>
                  <div className="flex gap-2">
                    <select
                      value={statusToUpdate}
                      onChange={(e) =>
                        setStatusToUpdate(e.target.value as OrderStatus)
                      }
                      className="flex-1 px-3 py-1.5 border border-brand-border rounded bg-white font-medium"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing (Packing)</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="returned">Returned</option>
                    </select>
                    <button
                      onClick={handleApplyStatus}
                      className="px-3 py-1.5 bg-brand-charcoal text-white rounded font-semibold hover:bg-brand-brown"
                    >
                      Update
                    </button>
                  </div>
                </div>

                {/* Add Courier Tracking */}
                <div className="space-y-2">
                  <span className="font-bold text-brand-charcoal uppercase text-[10px]">
                    Courier Dispatch &amp; Tracking:
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={trackingNumberInput}
                      onChange={(e) => setTrackingNumberInput(e.target.value)}
                      placeholder={selectedOrder.trackingNumber || "TCS-901481029"}
                      className="flex-1 px-2.5 py-1.5 border border-brand-border rounded font-mono text-xs"
                    />
                    <button
                      onClick={handleApplyTracking}
                      className="px-3 py-1.5 bg-brand-rose text-white rounded font-semibold hover:bg-brand-rose/90 flex items-center gap-1"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Dispatch</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Customer & Address Details */}
              <div className="grid grid-cols-2 gap-6 text-xs pb-6 border-b border-brand-border mb-6">
                <div>
                  <h4 className="font-bold uppercase tracking-wider text-brand-muted mb-2">
                    Customer Information
                  </h4>
                  <p className="font-bold text-brand-charcoal">
                    {selectedOrder.customer.fullName}
                  </p>
                  <p className="text-brand-muted mt-0.5">
                    {selectedOrder.customer.phone}
                  </p>
                  <p className="text-brand-muted">
                    {selectedOrder.customer.email}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold uppercase tracking-wider text-brand-muted mb-2">
                    Delivery Address
                  </h4>
                  <p className="text-brand-charcoal leading-relaxed">
                    {selectedOrder.customer.address}
                    <br />
                    {selectedOrder.customer.city}, {selectedOrder.customer.province}
                  </p>
                  {selectedOrder.customer.notes && (
                    <p className="text-brand-muted mt-1 italic">
                      Note: &ldquo;{selectedOrder.customer.notes}&rdquo;
                    </p>
                  )}
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3 mb-6">
                <h4 className="font-serif text-sm font-semibold text-brand-charcoal">
                  Ordered Garments ({selectedOrder.items.length})
                </h4>
                <div className="divide-y divide-brand-border/60 text-xs">
                  {selectedOrder.items.map((item) => (
                    <div
                      key={item.id}
                      className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-14 rounded overflow-hidden bg-brand-sand shrink-0">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-brand-charcoal">
                            {item.title}
                          </p>
                          <p className="text-[10px] text-brand-muted">
                            Size: {item.size} • Color: {item.color} • Qty:{" "}
                            {item.quantity}
                          </p>
                        </div>
                      </div>

                      <span className="font-bold text-brand-charcoal">
                        {formatPKR(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Summary */}
              <div className="p-4 bg-brand-sand/30 rounded flex items-center justify-between text-xs">
                <div>
                  <span className="text-brand-muted">Payment: </span>
                  <strong className="text-brand-charcoal uppercase">
                    {selectedOrder.paymentMethod.replace("_", " ")} ({selectedOrder.paymentStatus})
                  </strong>
                </div>
                <div>
                  <span className="text-brand-muted">Total: </span>
                  <strong className="text-sm font-bold text-brand-charcoal">
                    {formatPKR(selectedOrder.total)}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Printable Invoice Modal */}
      <InvoiceModal
        order={invoiceOrder}
        isOpen={!!invoiceOrder}
        onClose={() => setInvoiceOrder(null)}
      />
    </AdminLayout>
  );
}
