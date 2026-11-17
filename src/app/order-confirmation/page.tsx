"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Printer,
  Compass,
  ArrowRight,
  MessageCircle,
  Truck,
  Building2,
  Calendar,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatPKR, formatDate, formatDateTime } from "@/lib/utils";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { orders, getOrderById } = useStore();

  const order = orderId ? getOrderById(orderId) : orders[0];

  if (!order) {
    return (
      <div className="max-w-md mx-auto py-24 text-center">
        <h2 className="font-serif text-2xl text-brand-charcoal mb-3">
          Order Not Found
        </h2>
        <p className="text-xs text-brand-muted mb-6">
          Could not locate the requested order reference.
        </p>
        <Link
          href="/shop"
          className="px-6 py-3 bg-brand-charcoal text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-brand-brown"
        >
          Return to Store
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Aleyza Store Concierge! I have just placed order #${order.orderNumber} for ${formatPKR(
      order.total
    )}. Could you please provide updates on dispatch?`
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Success Banner */}
      <div className="text-center max-w-xl mx-auto mb-10 animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="text-[11px] uppercase tracking-[0.25em] text-brand-rose font-bold block mb-1">
          Order Placed Successfully
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-brand-charcoal font-medium">
          Thank you, {order.customer.fullName}
        </h1>
        <p className="text-xs text-brand-muted mt-2">
          Your order reference is{" "}
          <strong className="text-brand-charcoal font-mono text-sm">
            #{order.orderNumber}
          </strong>
          . A confirmation email and SMS has been dispatched.
        </p>
      </div>

      {/* Main Order Card */}
      <div className="bg-white rounded border border-brand-border shadow-subtle overflow-hidden mb-8">
        {/* Card Header */}
        <div className="p-6 bg-brand-sand/50 border-b border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-brand-muted font-bold block">
              Order Date &amp; Time
            </span>
            <p className="text-xs font-semibold text-brand-charcoal mt-0.5">
              {formatDateTime(order.date)}
            </p>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-wider text-brand-muted font-bold block">
              Payment Method
            </span>
            <p className="text-xs font-semibold text-brand-charcoal uppercase mt-0.5">
              {order.paymentMethod.replace("_", " ")} ({order.paymentStatus})
            </p>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-wider text-brand-muted font-bold block">
              Fulfillment Status
            </span>
            <span className="inline-block px-2.5 py-0.5 mt-0.5 text-[11px] uppercase font-bold rounded bg-amber-100 text-amber-800">
              {order.status}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-white border border-brand-border rounded text-xs font-medium text-brand-charcoal hover:bg-brand-sand transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-brand-rose" />
              <span>Print Invoice</span>
            </button>
          </div>
        </div>

        {/* Ordered Items */}
        <div className="p-6 divide-y divide-brand-border/60">
          <h2 className="font-serif text-base font-semibold text-brand-charcoal pb-4">
            Ordered Pieces ({order.items.length})
          </h2>

          <div className="space-y-4 pt-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-20 rounded overflow-hidden bg-brand-sand shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div>
                    <Link
                      href={`/product/${item.productSlug}`}
                      className="font-serif text-sm font-medium text-brand-charcoal hover:text-brand-rose transition-colors line-clamp-1"
                    >
                      {item.title}
                    </Link>
                    <p className="text-[11px] text-brand-muted mt-0.5">
                      Size: <strong>{item.size}</strong> • Color:{" "}
                      <strong>{item.color}</strong> • Qty:{" "}
                      <strong>{item.quantity}</strong>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs font-bold text-brand-charcoal">
                    {formatPKR(item.price * item.quantity)}
                  </p>
                  {item.quantity > 1 && (
                    <p className="text-[10px] text-brand-muted">
                      {formatPKR(item.price)} each
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer & Shipping Summary Grid */}
        <div className="p-6 bg-brand-sand/30 border-t border-brand-border grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div>
            <h3 className="font-bold uppercase tracking-wider text-brand-charcoal mb-2">
              Shipping Destination
            </h3>
            <p className="font-semibold text-brand-charcoal">
              {order.customer.fullName}
            </p>
            <p className="text-brand-muted mt-1 leading-relaxed">
              {order.customer.address}
              <br />
              {order.customer.city}, {order.customer.province}{" "}
              {order.customer.postalCode && `(${order.customer.postalCode})`}
            </p>
            <p className="text-brand-muted mt-2">
              <strong>Phone:</strong> {order.customer.phone}
            </p>
            <p className="text-brand-muted">
              <strong>Email:</strong> {order.customer.email}
            </p>
            {order.customer.notes && (
              <p className="text-brand-muted mt-2 italic">
                <strong>Delivery Note:</strong> &ldquo;{order.customer.notes}&rdquo;
              </p>
            )}
          </div>

          <div>
            <h3 className="font-bold uppercase tracking-wider text-brand-charcoal mb-2">
              Payment Breakdown
            </h3>
            <div className="space-y-1.5 text-brand-muted">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-medium text-brand-charcoal">
                  {formatPKR(order.subtotal)}
                </span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Coupon Discount ({order.couponCode || "PROMO"}):</span>
                  <span>-{formatPKR(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>TCS Courier Express Delivery:</span>
                <span className="font-medium text-brand-charcoal">
                  {order.shipping === 0 ? "Complimentary" : formatPKR(order.shipping)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-brand-border text-sm font-bold text-brand-charcoal">
                <span>Total Amount:</span>
                <span>{formatPKR(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Progress Bar */}
        <div className="p-6 border-t border-brand-border">
          <h3 className="font-serif text-sm font-semibold text-brand-charcoal mb-4">
            Estimated Delivery Timeline (2–4 Business Days)
          </h3>
          <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
            <div className="p-2 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold">
              ✓ 1. Placed
            </div>
            <div className="p-2 rounded bg-brand-sand border border-brand-border text-brand-charcoal font-medium">
              2. Confirmed
            </div>
            <div className="p-2 rounded bg-brand-sand border border-brand-border text-brand-muted">
              3. Packaging
            </div>
            <div className="p-2 rounded bg-brand-sand border border-brand-border text-brand-muted">
              4. Delivered
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href={`/track?orderId=${order.orderNumber}`}
          className="w-full sm:w-auto px-6 py-3 bg-brand-charcoal text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-brand-brown transition-colors flex items-center justify-center gap-2"
        >
          <Compass className="w-4 h-4 text-brand-rose" />
          <span>Track Order Consignment</span>
        </Link>

        <a
          href={`https://wa.me/923008491023?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-6 py-3 bg-emerald-600 text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat on WhatsApp</span>
        </a>

        <Link
          href="/shop"
          className="w-full sm:w-auto px-6 py-3 border border-brand-border bg-white text-brand-charcoal text-xs uppercase tracking-widest font-semibold rounded hover:bg-brand-sand transition-colors flex items-center justify-center gap-2"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-xs">Loading order confirmation...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
