"use client";

import React from "react";
import { X, Printer, Download, Sparkles } from "lucide-react";
import { Order } from "@/types";
import { formatPKR, formatDateTime } from "@/lib/utils";

interface InvoiceModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm print:hidden"
        onClick={onClose}
      />

      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-3xl bg-white rounded shadow-modal border border-brand-border p-8 sm:p-12 z-50 print:p-0 print:border-none print:shadow-none animate-slideUp">
          {/* Action Header (Hidden in print) */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-brand-border print:hidden">
            <span className="text-xs uppercase font-bold tracking-wider text-brand-muted">
              Official Tax Invoice Preview
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-brand-charcoal text-white text-xs uppercase font-semibold rounded hover:bg-brand-brown flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 text-brand-muted hover:text-brand-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Invoice Body */}
          <div className="space-y-8 text-brand-charcoal">
            {/* Letterhead */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b-2 border-brand-charcoal">
              <div>
                <h1 className="font-serif text-3xl font-bold tracking-widest uppercase">
                  ALEYZA STORE
                </h1>
                <p className="text-xs text-brand-muted uppercase tracking-widest mt-0.5">
                  Haute Prêt • Luxury Pakistani Fashion
                </p>
                <p className="text-xs text-brand-muted mt-2">
                  14-L, Mini Market, Gulberg III, Lahore, Pakistan<br />
                  Sales Tax Reg (STRN): 32778761-9 • NTN: 8941029-4<br />
                  Tel: +92 42 3578 9901 • accounts@aleyzastore.pk
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="inline-block px-3 py-1 bg-brand-sand font-mono text-sm font-bold uppercase rounded">
                  INVOICE #{order.orderNumber}
                </span>
                <p className="text-xs text-brand-muted mt-2">
                  <strong>Date:</strong> {formatDateTime(order.date)}<br />
                  <strong>Payment:</strong> {order.paymentMethod.toUpperCase().replace("_", " ")} ({order.paymentStatus.toUpperCase()})<br />
                  {order.trackingNumber && (
                    <span><strong>Consignment:</strong> {order.trackingNumber}</span>
                  )}
                </p>
              </div>
            </div>

            {/* Bill To & Ship To */}
            <div className="grid grid-cols-2 gap-8 text-xs">
              <div>
                <h3 className="font-bold uppercase tracking-wider text-brand-muted mb-2">
                  Billed To (Patron):
                </h3>
                <p className="font-bold text-sm text-brand-charcoal">
                  {order.customer.fullName}
                </p>
                <p className="text-brand-muted mt-1 leading-relaxed">
                  {order.customer.email}<br />
                  {order.customer.phone}
                </p>
              </div>

              <div>
                <h3 className="font-bold uppercase tracking-wider text-brand-muted mb-2">
                  Shipping Destination:
                </h3>
                <p className="font-bold text-sm text-brand-charcoal">
                  {order.customer.city}, {order.customer.province}
                </p>
                <p className="text-brand-muted mt-1 leading-relaxed">
                  {order.customer.address}
                  {order.customer.postalCode && ` - ${order.customer.postalCode}`}
                </p>
              </div>
            </div>

            {/* Invoice Line Items Table */}
            <div className="border border-brand-border rounded overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-sand text-brand-charcoal font-bold uppercase tracking-wider border-b border-brand-border">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">Description</th>
                    <th className="p-3">Size / Color</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-right">Unit Price</th>
                    <th className="p-3 text-right">Total (PKR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border">
                  {order.items.map((item, idx) => (
                    <tr key={item.id}>
                      <td className="p-3 text-brand-muted">{idx + 1}</td>
                      <td className="p-3 font-medium text-brand-charcoal">
                        {item.title}
                      </td>
                      <td className="p-3 text-brand-muted">
                        {item.size} / {item.color}
                      </td>
                      <td className="p-3 text-center">{item.quantity}</td>
                      <td className="p-3 text-right">{formatPKR(item.price)}</td>
                      <td className="p-3 text-right font-semibold">
                        {formatPKR(item.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals Calculation */}
            <div className="flex justify-end text-xs">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-brand-muted">
                  <span>Subtotal:</span>
                  <span className="font-medium text-brand-charcoal">
                    {formatPKR(order.subtotal)}
                  </span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount ({order.couponCode || "VOUCHER"}):</span>
                    <span>-{formatPKR(order.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-brand-muted">
                  <span>Courier Delivery (Pakistan):</span>
                  <span className="font-medium text-brand-charcoal">
                    {order.shipping === 0 ? "Complimentary" : formatPKR(order.shipping)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t-2 border-brand-charcoal font-bold text-sm">
                  <span>Total Due (PKR):</span>
                  <span>{formatPKR(order.total)}</span>
                </div>
              </div>
            </div>

            {/* Footer notes */}
            <div className="pt-8 border-t border-brand-border text-[11px] text-brand-muted text-center space-y-1">
              <p>
                Thank you for patronizing Aleyza Store. Every piece is handcrafted with pride in Pakistan.
              </p>
              <p>
                For exchanges within 7 days, please contact concierge@aleyzastore.pk or WhatsApp +92 300 8491023.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
