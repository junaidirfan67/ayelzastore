"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Building2,
  Smartphone,
  Banknote,
  Lock,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  Tag,
  AlertCircle,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { PaymentMethod } from "@/types";
import { formatPKR } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    cartSubtotal,
    appliedCoupon,
    createOrder,
    trackEvent,
    currentCustomer,
  } = useStore();

  // Customer Contact & Shipping Address Form
  const [fullName, setFullName] = useState(currentCustomer?.name || "");
  const [email, setEmail] = useState(currentCustomer?.email || "");
  const [phone, setPhone] = useState(currentCustomer?.phone || "");
  const [province, setProvince] = useState(currentCustomer?.province || "Punjab");
  const [city, setCity] = useState(currentCustomer?.city || "Lahore");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState("");

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [transactionRef, setTransactionRef] = useState("");
  const [walletPhone, setWalletPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // Track InitiateCheckout event on mount
  useEffect(() => {
    if (cart.length > 0) {
      trackEvent("InitiateCheckout", {
        value: cartSubtotal,
        currency: "PKR",
        num_items: cart.length,
      });
    }
  }, [cart, cartSubtotal, trackEvent]);

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto py-24 px-4 text-center">
        <h2 className="font-serif text-2xl text-brand-charcoal mb-3">
          Your bag is empty
        </h2>
        <p className="text-xs text-brand-muted mb-6">
          Please add items to your shopping bag before proceeding to checkout.
        </p>
        <Link
          href="/shop"
          className="px-6 py-3 bg-brand-charcoal text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-brand-brown"
        >
          Explore Collections
        </Link>
      </div>
    );
  }

  // Calculations
  const freeShippingThreshold = 5000;
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === "percentage") {
      discountAmount = Math.round((cartSubtotal * appliedCoupon.value) / 100);
    } else {
      discountAmount = Math.min(cartSubtotal, appliedCoupon.value);
    }
  }
  const shippingFee = cartSubtotal >= freeShippingThreshold ? 0 : 250;
  const grandTotal = cartSubtotal - discountAmount + shippingFee;

  const pakistaniProvinces = [
    "Punjab",
    "Sindh",
    "Islamabad Capital Territory",
    "Khyber Pakhtunkhwa",
    "Balochistan",
    "Azad Jammu & Kashmir",
    "Gilgit-Baltistan",
  ];

  const popularCities = [
    "Lahore",
    "Karachi",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Peshawar",
    "Quetta",
    "Sialkot",
    "Gujranwala",
    "Hyderabad",
    "Abbottabad",
    "Bahawalpur",
    "Sargodha",
    "Mardan",
  ];

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!fullName.trim() || !email.trim() || !phone.trim() || !address.trim() || !city.trim()) {
      setFormError("Please complete all required customer and shipping address fields.");
      return;
    }

    // Phone validation
    const cleanPhone = phone.replace(/\s+/g, "");
    if (cleanPhone.length < 10) {
      setFormError("Please enter a valid Pakistani mobile number (e.g. 0300 1234567).");
      return;
    }

    setIsSubmitting(true);

    try {
      const order = createOrder({
        customer: {
          fullName,
          email,
          phone,
          province,
          city,
          address,
          postalCode,
          notes: deliveryNotes,
        },
        paymentMethod,
        paymentDetails: {
          transactionRef:
            transactionRef ||
            (paymentMethod === "card" ? "AUTH-CARD-9921" : walletPhone ? `MOB-${walletPhone}` : undefined),
          bankName:
            paymentMethod === "bank_transfer"
              ? "Meezan Bank Ltd"
              : paymentMethod === "easypaisa"
              ? "Easypaisa"
              : paymentMethod === "jazzcash"
              ? "JazzCash"
              : undefined,
        },
      });

      // Redirect to Order Confirmation
      setTimeout(() => {
        router.push(`/order-confirmation?orderId=${order.id}`);
      }, 600);
    } catch {
      setFormError("An unexpected error occurred while placing your order. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Checkout Header */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-brand-border">
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-xs text-brand-muted hover:text-brand-charcoal transition-colors font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Return to Bag</span>
        </Link>

        <div className="text-center">
          <span className="font-serif text-xl sm:text-2xl font-medium tracking-widest text-brand-charcoal uppercase">
            Aleyza Checkout
          </span>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
          <Lock className="w-3.5 h-3.5" />
          <span>256-Bit SSL Encrypted</span>
        </div>
      </div>

      <form onSubmit={handleSubmitOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact, Shipping, Payment (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            {formError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{formError}</span>
              </div>
            )}

            {/* Step 1: Customer Contact */}
            <div className="bg-white rounded border border-brand-border p-6 shadow-subtle space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-brand-border">
                <h2 className="font-serif text-base font-semibold text-brand-charcoal">
                  1. Contact Information
                </h2>
                <span className="text-[11px] text-brand-muted">
                  Order updates will be sent here
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-brand-charcoal font-medium mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ayesha Malik"
                    className="w-full px-3 py-2.5 border border-brand-border rounded focus:outline-none focus:border-brand-rose bg-brand-ivory text-brand-charcoal"
                  />
                </div>

                <div>
                  <label className="block text-brand-charcoal font-medium mb-1">
                    Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0300 1234567"
                    className="w-full px-3 py-2.5 border border-brand-border rounded focus:outline-none focus:border-brand-rose bg-brand-ivory text-brand-charcoal"
                  />
                  <span className="text-[10px] text-brand-muted mt-1 block">
                    Used for TCS delivery confirmation &amp; OTP
                  </span>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-brand-charcoal font-medium mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ayesha.malik@example.com"
                    className="w-full px-3 py-2.5 border border-brand-border rounded focus:outline-none focus:border-brand-rose bg-brand-ivory text-brand-charcoal"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Destination across Pakistan */}
            <div className="bg-white rounded border border-brand-border p-6 shadow-subtle space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-brand-border">
                <h2 className="font-serif text-base font-semibold text-brand-charcoal">
                  2. Delivery Address in Pakistan
                </h2>
                <span className="text-[11px] text-brand-rose font-medium flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" />
                  Courier Delivery
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-brand-charcoal font-medium mb-1">
                    Province <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full px-3 py-2.5 border border-brand-border rounded focus:outline-none focus:border-brand-rose bg-brand-ivory text-brand-charcoal"
                  >
                    {pakistaniProvinces.map((prov) => (
                      <option key={prov} value={prov}>
                        {prov}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-brand-charcoal font-medium mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2.5 border border-brand-border rounded focus:outline-none focus:border-brand-rose bg-brand-ivory text-brand-charcoal"
                  >
                    {popularCities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-brand-charcoal font-medium mb-1">
                    Complete Street Address (House / Street / Sector) <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. House #42, Street 8, Sector Y, Phase 3, DHA"
                    className="w-full px-3 py-2.5 border border-brand-border rounded focus:outline-none focus:border-brand-rose bg-brand-ivory text-brand-charcoal"
                  />
                </div>

                <div>
                  <label className="block text-brand-charcoal font-medium mb-1">
                    Postal Code (Optional)
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="e.g. 54792"
                    className="w-full px-3 py-2.5 border border-brand-border rounded focus:outline-none focus:border-brand-rose bg-brand-ivory text-brand-charcoal"
                  />
                </div>

                <div>
                  <label className="block text-brand-charcoal font-medium mb-1">
                    Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    placeholder="e.g. Please ring gate bell or call before arriving"
                    className="w-full px-3 py-2.5 border border-brand-border rounded focus:outline-none focus:border-brand-rose bg-brand-ivory text-brand-charcoal"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="bg-white rounded border border-brand-border p-6 shadow-subtle space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-brand-border">
                <h2 className="font-serif text-base font-semibold text-brand-charcoal">
                  3. Select Payment Method
                </h2>
                <span className="text-[11px] text-emerald-700 font-semibold">
                  Secure &amp; Verified
                </span>
              </div>

              {/* Payment Method Options */}
              <div className="space-y-3">
                {/* 1. Cash on Delivery (COD) */}
                <label
                  className={`flex items-start gap-3 p-3.5 rounded border cursor-pointer transition-all ${
                    paymentMethod === "cod"
                      ? "border-brand-charcoal bg-brand-sand/50 ring-1 ring-brand-charcoal"
                      : "border-brand-border hover:bg-brand-sand/20"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="mt-1 text-brand-charcoal focus:ring-brand-rose"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-charcoal flex items-center gap-1.5">
                        <Banknote className="w-4 h-4 text-emerald-600" />
                        Cash on Delivery (COD)
                      </span>
                      <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        Most Popular
                      </span>
                    </div>
                    <p className="text-[11px] text-brand-muted mt-1">
                      Pay cash to the courier representative upon receiving your package at your doorstep anywhere in Pakistan.
                    </p>
                  </div>
                </label>

                {/* 2. Direct Bank Transfer */}
                <label
                  className={`flex items-start gap-3 p-3.5 rounded border cursor-pointer transition-all ${
                    paymentMethod === "bank_transfer"
                      ? "border-brand-charcoal bg-brand-sand/50 ring-1 ring-brand-charcoal"
                      : "border-brand-border hover:bg-brand-sand/20"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="bank_transfer"
                    checked={paymentMethod === "bank_transfer"}
                    onChange={() => setPaymentMethod("bank_transfer")}
                    className="mt-1 text-brand-charcoal focus:ring-brand-rose"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-charcoal flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-brand-rose" />
                        Online Bank Transfer (Meezan / HBL / Alfalah)
                      </span>
                    </div>
                    <p className="text-[11px] text-brand-muted mt-1">
                      Transfer directly via online banking or ATM to our corporate bank account.
                    </p>

                    {paymentMethod === "bank_transfer" && (
                      <div className="mt-3 p-3 bg-white rounded border border-brand-border space-y-2 text-[11px] animate-fadeIn">
                        <p className="font-semibold text-brand-charcoal">
                          Official Corporate Account:
                        </p>
                        <p className="text-brand-charcoal">
                          <strong>Bank:</strong> Meezan Bank Ltd (Gulberg Branch, Lahore)<br />
                          <strong>Account Title:</strong> Aleyza Store (Pvt) Ltd<br />
                          <strong>IBAN:</strong> PK88MEZN0001092849102948
                        </p>
                        <div className="pt-2">
                          <label className="block text-brand-muted mb-1">
                            Transaction Reference / Deposit ID:
                          </label>
                          <input
                            type="text"
                            value={transactionRef}
                            onChange={(e) => setTransactionRef(e.target.value)}
                            placeholder="e.g. MEZN-948201948 or ATM slip #"
                            className="w-full px-2.5 py-1.5 border border-brand-border rounded text-xs focus:outline-none focus:border-brand-rose"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </label>

                {/* 3. Easypaisa */}
                <label
                  className={`flex items-start gap-3 p-3.5 rounded border cursor-pointer transition-all ${
                    paymentMethod === "easypaisa"
                      ? "border-brand-charcoal bg-brand-sand/50 ring-1 ring-brand-charcoal"
                      : "border-brand-border hover:bg-brand-sand/20"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="easypaisa"
                    checked={paymentMethod === "easypaisa"}
                    onChange={() => setPaymentMethod("easypaisa")}
                    className="mt-1 text-brand-charcoal focus:ring-brand-rose"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-charcoal flex items-center gap-1.5">
                        <Smartphone className="w-4 h-4 text-emerald-600" />
                        Easypaisa Mobile Wallet
                      </span>
                      <span className="text-[10px] text-brand-muted">Instant</span>
                    </div>

                    {paymentMethod === "easypaisa" && (
                      <div className="mt-3 p-3 bg-white rounded border border-brand-border space-y-2 text-[11px] animate-fadeIn">
                        <label className="block text-brand-muted mb-1">
                          Enter your Easypaisa Registered Mobile Number:
                        </label>
                        <input
                          type="tel"
                          value={walletPhone}
                          onChange={(e) => setWalletPhone(e.target.value)}
                          placeholder="03xx xxxxxxx"
                          className="w-full px-2.5 py-1.5 border border-brand-border rounded text-xs focus:outline-none focus:border-brand-rose"
                        />
                        <p className="text-[10px] text-brand-muted">
                          You will receive an in-app approval prompt or OTP on your Easypaisa phone.
                        </p>
                      </div>
                    )}
                  </div>
                </label>

                {/* 4. JazzCash */}
                <label
                  className={`flex items-start gap-3 p-3.5 rounded border cursor-pointer transition-all ${
                    paymentMethod === "jazzcash"
                      ? "border-brand-charcoal bg-brand-sand/50 ring-1 ring-brand-charcoal"
                      : "border-brand-border hover:bg-brand-sand/20"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="jazzcash"
                    checked={paymentMethod === "jazzcash"}
                    onChange={() => setPaymentMethod("jazzcash")}
                    className="mt-1 text-brand-charcoal focus:ring-brand-rose"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-charcoal flex items-center gap-1.5">
                        <Smartphone className="w-4 h-4 text-red-600" />
                        JazzCash Mobile Wallet
                      </span>
                      <span className="text-[10px] text-brand-muted">Instant</span>
                    </div>

                    {paymentMethod === "jazzcash" && (
                      <div className="mt-3 p-3 bg-white rounded border border-brand-border space-y-2 text-[11px] animate-fadeIn">
                        <label className="block text-brand-muted mb-1">
                          Enter your JazzCash Account Number:
                        </label>
                        <input
                          type="tel"
                          value={walletPhone}
                          onChange={(e) => setWalletPhone(e.target.value)}
                          placeholder="03xx xxxxxxx"
                          className="w-full px-2.5 py-1.5 border border-brand-border rounded text-xs focus:outline-none focus:border-brand-rose"
                        />
                        <p className="text-[10px] text-brand-muted">
                          A payment authorization prompt will be dispatched to your JazzCash app.
                        </p>
                      </div>
                    )}
                  </div>
                </label>

                {/* 5. Credit / Debit Card (Integration Ready) */}
                <label
                  className={`flex items-start gap-3 p-3.5 rounded border cursor-pointer transition-all ${
                    paymentMethod === "card"
                      ? "border-brand-charcoal bg-brand-sand/50 ring-1 ring-brand-charcoal"
                      : "border-brand-border hover:bg-brand-sand/20"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="mt-1 text-brand-charcoal focus:ring-brand-rose"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-charcoal flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-blue-600" />
                        Visa / Mastercard / PayPak (Online Card)
                      </span>
                      <span className="text-[10px] font-mono text-brand-muted">
                        Integration-Ready
                      </span>
                    </div>
                    <p className="text-[11px] text-brand-muted mt-1">
                      Pay securely with 3D-Secure verified domestic or international credit/debit card.
                    </p>

                    {paymentMethod === "card" && (
                      <div className="mt-3 p-3 bg-white rounded border border-brand-border space-y-3 text-xs animate-fadeIn">
                        <div>
                          <label className="block text-brand-muted mb-1 text-[11px]">
                            Card Number:
                          </label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="4000 1234 5678 9010"
                            maxLength={19}
                            className="w-full px-2.5 py-1.5 border border-brand-border rounded text-xs focus:outline-none focus:border-brand-rose"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-brand-muted mb-1 text-[11px]">
                              MM / YY:
                            </label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="12/28"
                              maxLength={5}
                              className="w-full px-2.5 py-1.5 border border-brand-border rounded text-xs focus:outline-none focus:border-brand-rose"
                            />
                          </div>
                          <div>
                            <label className="block text-brand-muted mb-1 text-[11px]">
                              CVC / CVV:
                            </label>
                            <input
                              type="password"
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value)}
                              placeholder="123"
                              maxLength={4}
                              className="w-full px-2.5 py-1.5 border border-brand-border rounded text-xs focus:outline-none focus:border-brand-rose"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>

            {/* Place Order CTA Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-brand-charcoal text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:bg-brand-brown transition-all rounded shadow-modal group disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Securing Order...</span>
                ) : (
                  <>
                    <span>Confirm Order ({formatPKR(grandTotal)})</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
              <p className="text-[11px] text-brand-muted text-center mt-3">
                By placing your order, you agree to Aleyza Store terms of service and exchange guidelines.
              </p>
            </div>
          </div>

          {/* Right Column: Order Summary (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded border border-brand-border p-6 shadow-subtle space-y-6 sticky top-28">
              <h3 className="font-serif text-lg font-medium text-brand-charcoal pb-3 border-b border-brand-border flex items-center justify-between">
                <span>Bag Summary</span>
                <span className="text-xs text-brand-muted font-sans">
                  {cart.reduce((a, b) => a + b.quantity, 0)} Items
                </span>
              </h3>

              {/* Items List */}
              <div className="max-h-72 overflow-y-auto divide-y divide-brand-border/60 space-y-3 pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex gap-3">
                    <div className="relative w-14 h-18 rounded overflow-hidden bg-brand-sand shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="60px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-xs font-medium text-brand-charcoal line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-brand-muted mt-0.5">
                        Qty: {item.quantity} • Size: {item.size} • Color: {item.color}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-bold text-brand-charcoal">
                        {formatPKR(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Applied Coupon Info */}
              {appliedCoupon && (
                <div className="flex items-center justify-between bg-brand-rose/10 border border-brand-rose/30 px-3 py-2 rounded text-xs">
                  <div className="flex items-center gap-1.5 text-brand-charcoal font-medium">
                    <Tag className="w-3.5 h-3.5 text-brand-rose" />
                    <span>Applied Coupon: {appliedCoupon.code}</span>
                  </div>
                  <span className="text-emerald-700 font-bold">
                    -{formatPKR(discountAmount)}
                  </span>
                </div>
              )}

              {/* Price Calculation */}
              <div className="space-y-2 text-xs text-brand-muted pt-4 border-t border-brand-border">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-brand-charcoal font-medium">
                    {formatPKR(cartSubtotal)}
                  </span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount Voucher</span>
                    <span>-{formatPKR(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping Fee (TCS Nationwide)</span>
                  <span className="text-brand-charcoal font-medium">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-semibold uppercase text-[10px]">
                        Free Delivery
                      </span>
                    ) : (
                      formatPKR(shippingFee)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-serif font-bold text-brand-charcoal pt-3 border-t border-brand-border">
                  <span>Total Amount Due</span>
                  <span>{formatPKR(grandTotal)}</span>
                </div>
              </div>

              <div className="p-3 bg-brand-sand/50 rounded border border-brand-border/60 text-[11px] text-brand-muted space-y-1">
                <p>• Estimated Delivery: 2 to 4 working days.</p>
                <p>• Courier will call before arrival to verify address.</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
