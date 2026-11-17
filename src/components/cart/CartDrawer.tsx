"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Tag,
  Truck,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatPKR } from "@/lib/utils";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartItemQuantity,
    cartSubtotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useStore();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [orderNote, setOrderNote] = useState("");
  const [showNote, setShowNote] = useState(false);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 5000;
  const progressPercent = Math.min(
    100,
    Math.round((cartSubtotal / freeShippingThreshold) * 100)
  );
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
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-brand-ivory shadow-drawer flex flex-col z-50">
          {/* Header */}
          <div className="p-6 border-b border-brand-border flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-brand-charcoal" />
              <h2 className="font-serif text-xl tracking-wide font-medium text-brand-charcoal">
                Your Shopping Bag
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-sand text-brand-muted">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 text-brand-muted hover:text-brand-charcoal transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-6 py-3.5 bg-brand-sand/70 border-b border-brand-border">
            <div className="flex items-center gap-2 text-xs font-medium text-brand-charcoal mb-2">
              <Truck className="w-4 h-4 text-brand-rose shrink-0" />
              {remainingForFreeShipping > 0 ? (
                <span>
                  Add{" "}
                  <strong>{formatPKR(remainingForFreeShipping)}</strong> more
                  for <strong>Free Express Delivery</strong>
                </span>
              ) : (
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Unlocked Complimentary Express Delivery across Pakistan!
                </span>
              )}
            </div>
            <div className="w-full bg-brand-border h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-brand-rose h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-brand-sand flex items-center justify-center text-brand-muted mb-4">
                  <ShoppingBag className="w-8 h-8 opacity-40" />
                </div>
                <h3 className="font-serif text-lg text-brand-charcoal mb-2">
                  Your bag is empty
                </h3>
                <p className="text-xs text-brand-muted max-w-xs mb-6">
                  Explore our luxury silk kalidars, tailored co-ord sets, and everyday lawn collections.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-brand-charcoal text-white text-xs uppercase tracking-widest font-semibold hover:bg-brand-brown transition-colors rounded-sm"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-white rounded border border-brand-border/70 hover:border-brand-border transition-colors"
                >
                  <div className="relative w-20 h-24 rounded overflow-hidden bg-brand-sand shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${item.productSlug}`}
                          onClick={() => setIsCartOpen(false)}
                          className="font-serif text-sm font-medium text-brand-charcoal hover:text-brand-rose line-clamp-1 transition-colors"
                        >
                          {item.title}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-brand-muted hover:text-red-600 transition-colors p-0.5"
                          title="Remove item"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] text-brand-muted mt-1">
                        <span>Size: <strong className="text-brand-charcoal">{item.size}</strong></span>
                        <span>•</span>
                        <span>Color: <strong className="text-brand-charcoal">{item.color}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-brand-border rounded">
                        <button
                          onClick={() => updateCartItemQuantity(item.id, -1)}
                          className="p-1 hover:bg-brand-sand transition-colors text-brand-charcoal"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-brand-charcoal min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartItemQuantity(item.id, 1)}
                          disabled={item.quantity >= item.maxStock}
                          className="p-1 hover:bg-brand-sand transition-colors text-brand-charcoal disabled:opacity-30"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
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
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-brand-border space-y-4">
              {/* Coupon Code Section */}
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
                <form onSubmit={handleApplyCoupon} className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promotional code (e.g. ALEYZA10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 uppercase text-xs px-3 py-2 border border-brand-border rounded focus:outline-none focus:border-brand-rose bg-brand-ivory"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-brand-charcoal text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-brand-brown transition-colors"
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

              {/* Order Note Toggle */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowNote(!showNote)}
                  className="text-[11px] text-brand-rose hover:underline"
                >
                  {showNote ? "Hide order notes" : "+ Add special packaging/gift note"}
                </button>
                {showNote && (
                  <textarea
                    rows={2}
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    placeholder="Instructions for courier or gift card message..."
                    className="w-full mt-1.5 p-2 text-xs border border-brand-border rounded focus:outline-none focus:border-brand-rose bg-brand-ivory"
                  />
                )}
              </div>

              {/* Calculation Summary */}
              <div className="space-y-1.5 text-xs text-brand-muted pt-2 border-t border-brand-border">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="text-brand-charcoal font-medium">
                    {formatPKR(cartSubtotal)}
                  </span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Voucher Discount</span>
                    <span>-{formatPKR(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Standard Delivery (Pakistan)</span>
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

                <div className="flex justify-between text-sm font-serif font-bold text-brand-charcoal pt-2 border-t border-brand-border">
                  <span>Estimated Total</span>
                  <span>{formatPKR(finalTotal)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3.5 px-4 bg-brand-charcoal text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:bg-brand-brown transition-all rounded shadow-subtle group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <div className="text-center">
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-[11px] text-brand-muted hover:text-brand-charcoal underline"
                >
                  or Continue Browsing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
