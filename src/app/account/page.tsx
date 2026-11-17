"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Package,
  MapPin,
  Heart,
  LogOut,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Compass,
  ArrowRight,
  Sparkles,
  Truck,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatPKR, formatDate } from "@/lib/utils";

export default function AccountPage() {
  const {
    currentCustomer,
    loginCustomer,
    logoutCustomer,
    registerCustomer,
    orders,
    wishlist,
    customers,
  } = useStore();

  const [activeTab, setActiveTab] = useState<"orders" | "profile" | "addresses" | "wishlist">("orders");
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Register form state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regCity, setRegCity] = useState("Lahore");
  const [regProvince, setRegProvince] = useState("Punjab");

  // Customer orders
  const customerOrders = currentCustomer
    ? orders.filter(
        (o) =>
          o.customer.email.toLowerCase() ===
          currentCustomer.email.toLowerCase()
      )
    : [];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const success = loginCustomer(loginEmail);
    if (!success) {
      setLoginError(
        "Email address not found. Please choose an example patron below or register a new account."
      );
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    registerCustomer({
      name: regName,
      email: regEmail,
      phone: regPhone,
      city: regCity,
      province: regProvince,
    });
  };

  const handleQuickDemoLogin = (email: string) => {
    loginCustomer(email);
  };

  // If NOT logged in, show Auth Screen
  if (!currentCustomer) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded border border-brand-border p-8 shadow-subtle">
          <div className="text-center mb-6">
            <span className="font-serif text-2xl font-medium tracking-widest uppercase block text-brand-charcoal">
              Aleyza Patron Portal
            </span>
            <p className="text-xs text-brand-muted mt-1">
              {authMode === "login"
                ? "Sign in to track orders, manage addresses & redeem VIP rewards"
                : "Create an account to join the Aleyza Circle"}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex border-b border-brand-border mb-6 text-xs font-semibold uppercase tracking-wider">
            <button
              onClick={() => {
                setAuthMode("login");
                setLoginError("");
              }}
              className={`flex-1 pb-2.5 text-center transition-colors border-b-2 ${
                authMode === "login"
                  ? "border-brand-charcoal text-brand-charcoal"
                  : "border-transparent text-brand-muted hover:text-brand-charcoal"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setAuthMode("register");
                setLoginError("");
              }}
              className={`flex-1 pb-2.5 text-center transition-colors border-b-2 ${
                authMode === "register"
                  ? "border-brand-charcoal text-brand-charcoal"
                  : "border-transparent text-brand-muted hover:text-brand-charcoal"
              }`}
            >
              Register
            </button>
          </div>

          {loginError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-xs text-red-700 rounded">
              {loginError}
            </div>
          )}

          {authMode === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div>
                <label className="block text-brand-charcoal font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="e.g. ayesha.malik@gmail.com"
                  className="w-full px-3 py-2.5 border border-brand-border rounded focus:outline-none focus:border-brand-rose bg-brand-ivory"
                />
              </div>

              <div>
                <label className="block text-brand-charcoal font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2.5 border border-brand-border rounded focus:outline-none focus:border-brand-rose bg-brand-ivory"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-charcoal text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-brand-brown transition-colors shadow-sm"
              >
                Sign In
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3 text-xs">
              <div>
                <label className="block text-brand-charcoal font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Zara Shah"
                  className="w-full px-3 py-2 border border-brand-border rounded focus:outline-none focus:border-brand-rose bg-brand-ivory"
                />
              </div>

              <div>
                <label className="block text-brand-charcoal font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="zara.shah@example.com"
                  className="w-full px-3 py-2 border border-brand-border rounded focus:outline-none focus:border-brand-rose bg-brand-ivory"
                />
              </div>

              <div>
                <label className="block text-brand-charcoal font-medium mb-1">
                  Phone (Pakistan)
                </label>
                <input
                  type="tel"
                  required
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="0300 1234567"
                  className="w-full px-3 py-2 border border-brand-border rounded focus:outline-none focus:border-brand-rose bg-brand-ivory"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-brand-charcoal font-medium mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={regCity}
                    onChange={(e) => setRegCity(e.target.value)}
                    className="w-full px-3 py-2 border border-brand-border rounded focus:outline-none focus:border-brand-rose bg-brand-ivory"
                  />
                </div>
                <div>
                  <label className="block text-brand-charcoal font-medium mb-1">
                    Province
                  </label>
                  <input
                    type="text"
                    required
                    value={regProvince}
                    onChange={(e) => setRegProvince(e.target.value)}
                    className="w-full px-3 py-2 border border-brand-border rounded focus:outline-none focus:border-brand-rose bg-brand-ivory"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-2 bg-brand-charcoal text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-brand-brown transition-colors shadow-sm"
              >
                Create Account
              </button>
            </form>
          )}

          {/* Quick Demo Switcher */}
          <div className="mt-8 pt-6 border-t border-brand-border">
            <span className="text-[10px] uppercase tracking-wider text-brand-muted font-bold block mb-2 text-center">
              Portfolio Demo: 1-Click Fast Sign-In
            </span>
            <div className="space-y-1.5 text-xs">
              {customers.slice(0, 3).map((cust) => (
                <button
                  key={cust.id}
                  onClick={() => handleQuickDemoLogin(cust.email)}
                  className="w-full py-2 px-3 bg-brand-sand/60 hover:bg-brand-sand border border-brand-border rounded text-left flex items-center justify-between text-brand-charcoal transition-colors"
                >
                  <div>
                    <span className="font-semibold block">{cust.name}</span>
                    <span className="text-[10px] text-brand-muted">
                      {cust.city} • {cust.segment} Patron
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-brand-rose uppercase">
                    Select →
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // LOGGED IN DASHBOARD
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Profile Summary */}
      <div className="bg-white rounded border border-brand-border p-6 shadow-subtle mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-brand-sand border border-brand-border flex items-center justify-center font-serif text-2xl font-bold text-brand-charcoal">
            {currentCustomer.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-medium text-brand-charcoal">
                {currentCustomer.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded text-[10px] uppercase font-bold bg-brand-rose/20 text-brand-brown">
                {currentCustomer.segment} Tier
              </span>
            </div>
            <p className="text-xs text-brand-muted mt-0.5">
              {currentCustomer.email} • {currentCustomer.phone} • {currentCustomer.city}, {currentCustomer.province}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-brand-muted">
          <div>
            <span className="text-[10px] uppercase tracking-wider block">Total Spent</span>
            <span className="font-serif text-base font-bold text-brand-charcoal">
              {formatPKR(currentCustomer.totalSpent)}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider block">Total Orders</span>
            <span className="font-serif text-base font-bold text-brand-charcoal">
              {currentCustomer.totalOrders}
            </span>
          </div>
          <button
            onClick={logoutCustomer}
            className="px-3 py-2 border border-brand-border rounded hover:bg-brand-sand text-brand-charcoal transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-brand-border mb-8 overflow-x-auto text-xs font-semibold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab("orders")}
          className={`pb-3 px-4 transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === "orders"
              ? "border-brand-charcoal text-brand-charcoal"
              : "border-transparent text-brand-muted hover:text-brand-charcoal"
          }`}
        >
          <Package className="w-4 h-4 text-brand-rose" />
          <span>My Orders ({customerOrders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("wishlist")}
          className={`pb-3 px-4 transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === "wishlist"
              ? "border-brand-charcoal text-brand-charcoal"
              : "border-transparent text-brand-muted hover:text-brand-charcoal"
          }`}
        >
          <Heart className="w-4 h-4 text-brand-rose" />
          <span>Wishlist ({wishlist.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("profile")}
          className={`pb-3 px-4 transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === "profile"
              ? "border-brand-charcoal text-brand-charcoal"
              : "border-transparent text-brand-muted hover:text-brand-charcoal"
          }`}
        >
          <User className="w-4 h-4 text-brand-rose" />
          <span>Profile Details</span>
        </button>
      </div>

      {/* Tab Content: Orders */}
      {activeTab === "orders" && (
        <div className="space-y-6">
          {customerOrders.length === 0 ? (
            <div className="bg-white rounded border border-brand-border p-12 text-center max-w-md mx-auto">
              <Package className="w-12 h-12 text-brand-muted/40 mx-auto mb-3" />
              <h3 className="font-serif text-lg text-brand-charcoal mb-1">
                No orders placed yet
              </h3>
              <p className="text-xs text-brand-muted mb-6">
                When you place an order, live tracking details will appear here.
              </p>
              <Link
                href="/shop"
                className="px-6 py-2.5 bg-brand-charcoal text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-brand-brown"
              >
                Shop Collections
              </Link>
            </div>
          ) : (
            customerOrders.map((ord) => (
              <div
                key={ord.id}
                className="bg-white rounded border border-brand-border overflow-hidden shadow-subtle"
              >
                <div className="p-4 sm:p-6 bg-brand-sand/50 border-b border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-mono text-sm font-bold text-brand-charcoal">
                      #{ord.orderNumber}
                    </span>
                    <span className="text-brand-muted ml-3">
                      {formatDate(ord.date)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-bold text-brand-charcoal text-sm">
                      {formatPKR(ord.total)}
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-[10px] uppercase font-bold bg-amber-100 text-amber-800">
                      {ord.status}
                    </span>
                  </div>
                </div>

                <div className="p-6 divide-y divide-brand-border/60">
                  {ord.items.map((item) => (
                    <div
                      key={item.id}
                      className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-14 h-18 rounded overflow-hidden bg-brand-sand shrink-0">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="60px"
                          />
                        </div>
                        <div>
                          <Link
                            href={`/product/${item.productSlug}`}
                            className="font-serif text-sm font-medium text-brand-charcoal hover:text-brand-rose line-clamp-1"
                          >
                            {item.title}
                          </Link>
                          <p className="text-[11px] text-brand-muted mt-0.5">
                            Size: {item.size} • Color: {item.color} • Qty:{" "}
                            {item.quantity}
                          </p>
                        </div>
                      </div>

                      <span className="text-xs font-bold text-brand-charcoal">
                        {formatPKR(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-brand-sand/20 border-t border-brand-border flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-brand-muted">
                    <Truck className="w-3.5 h-3.5 text-brand-rose" />
                    <span>
                      {ord.trackingNumber
                        ? `Consignment: ${ord.trackingNumber} (${ord.courier || "TCS"})`
                        : "Preparing at Lahore Atelier for courier dispatch"}
                    </span>
                  </div>

                  <Link
                    href={`/track?orderId=${ord.orderNumber}`}
                    className="text-brand-rose font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>Track Live</span>
                    <Compass className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab Content: Wishlist */}
      {activeTab === "wishlist" && (
        <div>
          {wishlist.length === 0 ? (
            <div className="bg-white rounded border border-brand-border p-12 text-center max-w-md mx-auto">
              <Heart className="w-12 h-12 text-brand-rose/40 mx-auto mb-3" />
              <h3 className="font-serif text-lg text-brand-charcoal mb-1">
                Your wishlist is empty
              </h3>
              <p className="text-xs text-brand-muted mb-6">
                Save pieces as you browse to revisit them anytime.
              </p>
              <Link
                href="/shop"
                className="px-6 py-2.5 bg-brand-charcoal text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-brand-brown"
              >
                Browse Catalog
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlist.map((item) => (
                <div
                  key={item.productId}
                  className="bg-white rounded border border-brand-border p-4 shadow-subtle flex flex-col justify-between"
                >
                  <div className="relative aspect-[3/4] rounded overflow-hidden bg-brand-sand mb-3">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-brand-muted uppercase">
                      {item.categoryLabel}
                    </span>
                    <Link
                      href={`/product/${item.slug}`}
                      className="font-serif text-sm font-medium text-brand-charcoal block line-clamp-1 hover:text-brand-rose mt-0.5"
                    >
                      {item.title}
                    </Link>
                    <p className="text-xs font-bold text-brand-charcoal mt-1">
                      {formatPKR(item.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Content: Profile */}
      {activeTab === "profile" && (
        <div className="max-w-xl bg-white rounded border border-brand-border p-6 shadow-subtle space-y-4 text-xs">
          <h3 className="font-serif text-base font-semibold text-brand-charcoal pb-3 border-b border-brand-border">
            Personal &amp; Delivery Information
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-brand-muted block mb-1">Full Name</span>
              <p className="font-semibold text-brand-charcoal">
                {currentCustomer.name}
              </p>
            </div>
            <div>
              <span className="text-brand-muted block mb-1">Email Address</span>
              <p className="font-semibold text-brand-charcoal">
                {currentCustomer.email}
              </p>
            </div>
            <div>
              <span className="text-brand-muted block mb-1">Phone Number</span>
              <p className="font-semibold text-brand-charcoal">
                {currentCustomer.phone}
              </p>
            </div>
            <div>
              <span className="text-brand-muted block mb-1">City &amp; Province</span>
              <p className="font-semibold text-brand-charcoal">
                {currentCustomer.city}, {currentCustomer.province}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
