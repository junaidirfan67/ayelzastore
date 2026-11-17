"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Tag,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatPKR } from "@/lib/utils";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateCartItemQuantity,
    cartSubtotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useStore();

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");

  const freeShippingThreshold = 5000;
  const remainingForFreeShipping = Math.max(
    0,
    freeShippingThreshold - cartSubtotal
  );

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === "percentage") {
      discountAmount = Math.round((cartSubtotal * appliedCoupon.value) / 100);
    } else {
      discountAmount = Math.min(cartSubtotal, appliedCoupon.value);
    }
  }

  const shippingFee = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 250;
  const finalTotal = cartSubtotal - discountAmount + shippingFee;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    if (!couponCode) return;
    const res = applyCoupon(couponCode);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponCode("");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-[11px] uppercase tracking-[0.25em] text-brand-rose font-bold block mb-1">
          Review Your Selections
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-brand-charcoal font-medium">
          Shopping Bag
        </h1>
        <p className="text-xs text-brand-muted mt-2">
          {cart.length} unique creation{cart.length === 1 ? "" : "s"} in your bag
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="max-w-md mx-auto text-center py-16 bg-white rounded border border-brand-border p-8 shadow-subtle">
          <div className="w-16 h-16 rounded-full bg-brand-sand flex items-center justify-center mx-auto mb-4 text-brand-muted">
            <ShoppingBag className="w-8 h-8 opacity-40" />
          </div>
          <h2 className="font-serif text-xl text-brand-charcoal mb-2">
            Your shopping bag is currently empty
          </h2>
          <p className="text-xs text-brand-muted mb-6 leading-relaxed">
            Discover our festive raw silk kalidars, relaxed linen co-ords, or handcrafted bags.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-charcoal text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-brand-brown transition-colors"
          >
            <span>Explore Collections</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Items Table (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Free Shipping Alert Bar */}
            <div className="p-4 bg-brand-sand/70 rounded border border-brand-border flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-brand-rose shrink-0" />
                {remainingForFreeShipping > 0 ? (
                  <span>
                    Add <strong>{formatPKR(remainingForFreeShipping)}</strong> more to qualify for <strong>Free Express Shipping across Pakistan</strong>.
                  </span>
                ) : (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    You have unlocked Complimentary Express Delivery!
                  </span>
                )}
              </div>
            </div>

            {/* List of Cart Items */}
            <div className="bg-white rounded border border-brand-border divide-y divide-brand-border/60 overflow-hidden shadow-subtle">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-26 aspect-[3/4] rounded overflow-hidden bg-brand-sand shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    <div>
                      <Link
                        href={`/product/${item.productSlug}`}
                        className="font-serif text-base font-medium text-brand-charcoal hover:text-brand-rose transition-colors line-clamp-1"
                      >
                        {item.title}
                      </Link>
                      <div className="flex items-center gap-3 text-xs text-brand-muted mt-1">
                        <span>Size: <strong className="text-brand-charcoal">{item.size}</strong></span>
                        <span>•</span>
                        <span>Color: <strong className="text-brand-charcoal">{item.color}</strong></span>
                      </div>
                      <p className="text-xs font-semibold text-brand-charcoal mt-2 sm:hidden">
                        {formatPKR(item.price)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-6 self-end sm:self-auto">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-brand-border rounded bg-brand-ivory">
                      <button
                        onClick={() => updateCartItemQuantity(item.id, -1)}
                        className="p-2 text-brand-charcoal hover:bg-brand-sand transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-bold text-brand-charcoal min-w-[24px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartItemQuantity(item.id, 1)}
                        disabled={item.quantity >= item.maxStock}
                        className="p-2 text-brand-charcoal hover:bg-brand-sand transition-colors disabled:opacity-30"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Total Price */}
                    <div className="text-right min-w-[90px]">
                      <p className="text-sm font-bold text-brand-charcoal">
                        {formatPKR(item.price * item.quantity)}
                      </p>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-brand-muted hover:text-red-600 transition-colors"
                      title="Remove from bag"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <Link
                href="/shop"
                className="text-xs font-semibold text-brand-charcoal hover:text-brand-rose transition-colors flex items-center gap-1.5"
              >
                <span>← Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Order Summary Card (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded border border-brand-border p-6 shadow-subtle space-y-6">
              <h3 className="font-serif text-lg font-medium text-brand-charcoal pb-3 border-b border-brand-border">
                Order Summary
              </h3>

              {/* Coupon Code Section */}
              <div>
                <p className="text-xs font-medium text-brand-charcoal mb-2">
                  Promotional Voucher
                </p>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-brand-rose/10 border border-brand-rose/30 px-3 py-2 rounded text-xs">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-brand-rose" />
                      <div>
                        <span className="font-bold text-brand-charcoal">
                          {appliedCoupon.code}
                        </span>
                        <span className="text-brand-muted ml-1">
                          (-{formatPKR(discountAmount)})
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-brand-muted hover:text-red-500 text-xs underline font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Code (e.g. ALEYZA10)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 uppercase text-xs px-3 py-2 border border-brand-border rounded focus:outline-none focus:border-brand-rose bg-brand-ivory"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-brand-charcoal text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-brand-brown transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-[11px] text-red-600 font-medium">
                        {couponError}
                      </p>
                    )}
                  </form>
                )}
              </div>

              {/* Financial Breakdown */}
              <div className="space-y-2.5 text-xs text-brand-muted pt-4 border-t border-brand-border">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="text-brand-charcoal font-medium">
                    {formatPKR(cartSubtotal)}
                  </span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-{formatPKR(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Courier Delivery (Pakistan)</span>
                  <span className="text-brand-charcoal font-medium">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-semibold uppercase text-[10px]">
                        Complimentary
                      </span>
                    ) : (
                      formatPKR(shippingFee)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-serif font-bold text-brand-charcoal pt-3 border-t border-brand-border">
                  <span>Grand Total</span>
                  <span>{formatPKR(finalTotal)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                className="w-full py-4 px-6 bg-brand-charcoal text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:bg-brand-brown transition-all rounded shadow-subtle group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-brand-border space-y-2 text-[11px] text-brand-muted">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-rose" />
                  <span>Cash on Delivery (COD) supported across Pakistan</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-3.5 h-3.5 text-brand-rose" />
                  <span>7-Day Easy Exchange policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
