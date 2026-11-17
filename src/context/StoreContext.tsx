"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  Product,
  CartItem,
  WishlistItem,
  Order,
  Customer,
  Coupon,
  MarketingCampaign,
  MetaAdSet,
  MetaAdItem,
  TrafficSource,
  TrackingConfig,
  TrackingLogEvent,
  AnnouncementConfig,
  HeroConfig,
  PromoBannerConfig,
  Subscriber,
  ProductSize,
  OrderStatus,
} from "../types";
import {
  SEED_PRODUCTS,
  SEED_ORDERS,
  SEED_CUSTOMERS,
  SEED_COUPONS,
  SEED_MARKETING_CAMPAIGNS,
  SEED_META_AD_SETS,
  SEED_META_ADS,
  SEED_TRAFFIC_SOURCES,
  SEED_TRACKING_CONFIG,
  SEED_TRACKING_EVENTS,
  SEED_ANNOUNCEMENT,
  SEED_HERO,
  SEED_PROMO_BANNER,
  SEED_SUBSCRIBERS,
} from "../data/seedData";
import { generateOrderNumber, generateTrackingNumber } from "../lib/utils";

interface Toast {
  id: string;
  message: string;
  type: "success" | "info" | "error";
}

interface StoreContextType {
  // Products
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductBySlug: (slug: string) => Product | undefined;

  // Cart
  cart: CartItem[];
  addToCart: (
    product: Product,
    size: ProductSize,
    color: string,
    quantity?: number
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartItemQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Wishlist
  wishlist: WishlistItem[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;

  // Coupons
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  addCoupon: (coupon: Coupon) => void;
  toggleCouponStatus: (code: string) => void;
  deleteCoupon: (code: string) => void;

  // Orders
  orders: Order[];
  createOrder: (orderData: {
    customer: Order["customer"];
    paymentMethod: Order["paymentMethod"];
    paymentDetails?: Order["paymentDetails"];
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  addOrderTracking: (orderId: string, trackingNumber: string, courier: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getOrderByNumber: (orderNumber: string) => Order | undefined;

  // Customers
  customers: Customer[];
  currentCustomer: Customer | null;
  loginCustomer: (email: string) => boolean;
  logoutCustomer: () => void;
  registerCustomer: (customerData: Partial<Customer>) => Customer;

  // Marketing & Campaigns
  campaigns: MarketingCampaign[];
  addCampaign: (campaign: MarketingCampaign) => void;
  updateCampaignStatus: (
    id: string,
    status: "active" | "paused" | "completed"
  ) => void;
  trafficSources: TrafficSource[];
  adSets: MetaAdSet[];
  ads: MetaAdItem[];

  // Pixels & Tracking
  trackingConfig: TrackingConfig;
  updateTrackingConfig: (updates: Partial<TrackingConfig>) => void;
  trackingEvents: TrackingLogEvent[];
  trackEvent: (
    eventName: TrackingLogEvent["eventName"],
    payload?: any,
    source?: TrackingLogEvent["source"]
  ) => void;

  // Content Configuration
  announcement: AnnouncementConfig;
  updateAnnouncement: (ann: AnnouncementConfig) => void;
  hero: HeroConfig;
  updateHero: (hero: HeroConfig) => void;
  promoBanner: PromoBannerConfig;
  updatePromoBanner: (promo: PromoBannerConfig) => void;
  subscribers: Subscriber[];
  subscribeNewsletter: (
    email: string,
    source?: string
  ) => { success: boolean; message: string };

  // Modals & UI
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Toasts
  toasts: Toast[];
  addToast: (message: string, type?: "success" | "info" | "error") => void;
  removeToast: (id: string) => void;

  // Reset to initial seed
  resetStoreData: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: "aleyza_store_products_v2",
  CART: "aleyza_store_cart_v2",
  WISHLIST: "aleyza_store_wishlist_v2",
  ORDERS: "aleyza_store_orders_v2",
  CUSTOMERS: "aleyza_store_customers_v2",
  COUPONS: "aleyza_store_coupons_v2",
  CAMPAIGNS: "aleyza_store_campaigns_v2",
  TRACKING_CONFIG: "aleyza_store_tracking_config_v2",
  TRACKING_EVENTS: "aleyza_store_tracking_events_v2",
  ANNOUNCEMENT: "aleyza_store_announcement_v2",
  HERO: "aleyza_store_hero_v2",
  PROMO_BANNER: "aleyza_store_promo_v2",
  SUBSCRIBERS: "aleyza_store_subscribers_v2",
  CURRENT_CUSTOMER: "aleyza_store_current_cust_v2",
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // State initialization with localStorage fallback
  const [products, setProducts] = useState<Product[]>(SEED_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(SEED_ORDERS);
  const [customers, setCustomers] = useState<Customer[]>(SEED_CUSTOMERS);
  const [coupons, setCoupons] = useState<Coupon[]>(SEED_COUPONS);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>(
    SEED_MARKETING_CAMPAIGNS
  );
  const [trafficSources] = useState<TrafficSource[]>(SEED_TRAFFIC_SOURCES);
  const [adSets] = useState<MetaAdSet[]>(SEED_META_AD_SETS);
  const [ads] = useState<MetaAdItem[]>(SEED_META_ADS);
  const [trackingConfig, setTrackingConfig] =
    useState<TrackingConfig>(SEED_TRACKING_CONFIG);
  const [trackingEvents, setTrackingEvents] =
    useState<TrackingLogEvent[]>(SEED_TRACKING_EVENTS);
  const [announcement, setAnnouncement] =
    useState<AnnouncementConfig>(SEED_ANNOUNCEMENT);
  const [hero, setHero] = useState<HeroConfig>(SEED_HERO);
  const [promoBanner, setPromoBanner] =
    useState<PromoBannerConfig>(SEED_PROMO_BANNER);
  const [subscribers, setSubscribers] =
    useState<Subscriber[]>(SEED_SUBSCRIBERS);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(
    SEED_CUSTOMERS[0]
  );

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Load persisted data on client mount
  useEffect(() => {
    try {
      const p = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (p) setProducts(JSON.parse(p));

      const c = localStorage.getItem(STORAGE_KEYS.CART);
      if (c) setCart(JSON.parse(c));

      const w = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      if (w) setWishlist(JSON.parse(w));

      const o = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (o) setOrders(JSON.parse(o));

      const cust = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
      if (cust) setCustomers(JSON.parse(cust));

      const coup = localStorage.getItem(STORAGE_KEYS.COUPONS);
      if (coup) setCoupons(JSON.parse(coup));

      const camp = localStorage.getItem(STORAGE_KEYS.CAMPAIGNS);
      if (camp) setCampaigns(JSON.parse(camp));

      const tc = localStorage.getItem(STORAGE_KEYS.TRACKING_CONFIG);
      if (tc) setTrackingConfig(JSON.parse(tc));

      const te = localStorage.getItem(STORAGE_KEYS.TRACKING_EVENTS);
      if (te) setTrackingEvents(JSON.parse(te));

      const ann = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENT);
      if (ann) setAnnouncement(JSON.parse(ann));

      const h = localStorage.getItem(STORAGE_KEYS.HERO);
      if (h) setHero(JSON.parse(h));

      const pb = localStorage.getItem(STORAGE_KEYS.PROMO_BANNER);
      if (pb) setPromoBanner(JSON.parse(pb));

      const sub = localStorage.getItem(STORAGE_KEYS.SUBSCRIBERS);
      if (sub) setSubscribers(JSON.parse(sub));

      const curCust = localStorage.getItem(STORAGE_KEYS.CURRENT_CUSTOMER);
      if (curCust) setCurrentCustomer(JSON.parse(curCust));
    } catch {
      // In SSR or private browsing mode, seed data remains active
    }
  }, []);

  // Save changes to localStorage
  const saveToStorage = (key: string, data: any) => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(data));
      }
    } catch {
      // Storage unavailable
    }
  };

  // Toast Helper
  const addToast = (
    message: string,
    type: "success" | "info" | "error" = "info"
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Tracking Event Engine
  const trackEvent = useCallback(
    (
      eventName: TrackingLogEvent["eventName"],
      payload: any = {},
      source: TrackingLogEvent["source"] = "Client (Browser Pixel)"
    ) => {
      const deduplicationEventId = `${eventName.toLowerCase()}-${Date.now()}-${Math.floor(
        Math.random() * 10000
      )}`;

      const newEvent: TrackingLogEvent = {
        id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        timestamp: new Date().toISOString(),
        eventName,
        source,
        deduplicationEventId,
        payload,
        status: source.includes("Server") ? "processed" : "dispatched",
      };

      setTrackingEvents((prev) => {
        const updated = [newEvent, ...prev.slice(0, 49)];
        saveToStorage(STORAGE_KEYS.TRACKING_EVENTS, updated);
        return updated;
      });

      // Also trigger server-side twin if CAPI is enabled for conversion events
      if (
        trackingConfig.metaCapiEnabled &&
        (eventName === "Purchase" ||
          eventName === "InitiateCheckout" ||
          eventName === "AddToCart") &&
        source.includes("Client")
      ) {
        setTimeout(() => {
          const capiEvent: TrackingLogEvent = {
            id: `evt-capi-${Date.now()}`,
            timestamp: new Date().toISOString(),
            eventName,
            source: "Server (Meta Conversions API / CAPI)",
            deduplicationEventId, // same deduplication ID for Meta deduplication!
            payload: {
              ...payload,
              event_source_url:
                typeof window !== "undefined"
                  ? window.location.href
                  : "https://aleyzastore.pk",
            },
            status: "processed",
          };
          setTrackingEvents((p) => {
            const up = [capiEvent, ...p.slice(0, 49)];
            saveToStorage(STORAGE_KEYS.TRACKING_EVENTS, up);
            return up;
          });
        }, 600);
      }
    },
    [trackingConfig.metaCapiEnabled]
  );

  // Product Management
  const addProduct = (product: Product) => {
    setProducts((prev) => {
      const updated = [product, ...prev];
      saveToStorage(STORAGE_KEYS.PRODUCTS, updated);
      return updated;
    });
    addToast(`Added "${product.title}" to catalog.`, "success");
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) => {
      const updated = prev.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      );
      saveToStorage(STORAGE_KEYS.PRODUCTS, updated);
      return updated;
    });
    addToast("Product updated successfully.", "success");
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => {
      const target = prev.find((p) => p.id === id);
      const updated = prev.filter((p) => p.id !== id);
      saveToStorage(STORAGE_KEYS.PRODUCTS, updated);
      if (target) {
        addToast(`Removed "${target.title}" from store.`, "info");
      }
      return updated;
    });
  };

  const getProductBySlug = (slug: string) => {
    return products.find((p) => p.slug === slug);
  };

  // Cart Calculations & Management
  const cartSubtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const addToCart = (
    product: Product,
    size: ProductSize,
    color: string,
    quantity: number = 1
  ) => {
    const existingIndex = cart.findIndex(
      (item) =>
        item.productId === product.id &&
        item.size === size &&
        item.color === color
    );

    let updatedCart: CartItem[];

    // Variant stock check
    const matchedVariant = product.variants.find(
      (v) => v.size === size && v.colorName.toLowerCase() === color.toLowerCase()
    );
    const maxStock = matchedVariant ? matchedVariant.stock : 20;

    if (existingIndex > -1) {
      updatedCart = [...cart];
      const newQty = Math.min(
        maxStock,
        updatedCart[existingIndex].quantity + quantity
      );
      updatedCart[existingIndex].quantity = newQty;
    } else {
      const newItem: CartItem = {
        id: `cart-${product.id}-${size}-${color}`,
        productId: product.id,
        productSlug: product.slug,
        title: product.title,
        price: product.price,
        image: product.images[0] || "",
        size,
        color,
        quantity: Math.min(maxStock, quantity),
        maxStock,
      };
      updatedCart = [...cart, newItem];
    }

    setCart(updatedCart);
    saveToStorage(STORAGE_KEYS.CART, updatedCart);
    setIsCartOpen(true);
    addToast(`Added "${product.title} (${size})" to bag.`, "success");

    // Track AddToCart event
    trackEvent("AddToCart", {
      content_name: product.title,
      content_category: product.categoryLabel,
      value: product.price * quantity,
      currency: "PKR",
      size,
      color,
    });
  };

  const removeFromCart = (cartItemId: string) => {
    const updatedCart = cart.filter((item) => item.id !== cartItemId);
    setCart(updatedCart);
    saveToStorage(STORAGE_KEYS.CART, updatedCart);
    addToast("Item removed from your shopping bag.", "info");
  };

  const updateCartItemQuantity = (cartItemId: string, delta: number) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === cartItemId) {
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null;
          return {
            ...item,
            quantity: Math.min(item.maxStock, newQty),
          };
        }
        return item;
      })
      .filter(Boolean) as CartItem[];

    setCart(updatedCart);
    saveToStorage(STORAGE_KEYS.CART, updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    saveToStorage(STORAGE_KEYS.CART, []);
  };

  // Wishlist
  const toggleWishlist = (product: Product) => {
    const exists = wishlist.some((item) => item.productId === product.id);
    let updated: WishlistItem[];

    if (exists) {
      updated = wishlist.filter((item) => item.productId !== product.id);
      addToast(`Removed "${product.title}" from wishlist.`, "info");
    } else {
      updated = [
        ...wishlist,
        {
          productId: product.id,
          title: product.title,
          price: product.price,
          compareAtPrice: product.compareAtPrice,
          image: product.images[0] || "",
          slug: product.slug,
          categoryLabel: product.categoryLabel,
        },
      ];
      addToast(`Saved "${product.title}" to your wishlist.`, "success");
    }

    setWishlist(updated);
    saveToStorage(STORAGE_KEYS.WISHLIST, updated);
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.productId === productId);
  };

  // Coupons
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const coupon = coupons.find(
      (c) => c.code.toUpperCase() === cleanCode && c.isActive
    );

    if (!coupon) {
      return { success: false, message: "Invalid or expired promotional code." };
    }

    if (cartSubtotal < coupon.minOrderAmount) {
      return {
        success: false,
        message: `This privilege code requires a minimum bag value of Rs. ${coupon.minOrderAmount.toLocaleString(
          "en-PK"
        )}.`,
      };
    }

    setAppliedCoupon(coupon);
    addToast(`Privilege code "${coupon.code}" applied successfully!`, "success");
    return { success: true, message: "Promotional discount applied!" };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast("Promotional voucher removed.", "info");
  };

  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => {
      const updated = [coupon, ...prev];
      saveToStorage(STORAGE_KEYS.COUPONS, updated);
      return updated;
    });
    addToast(`Created promotion "${coupon.code}".`, "success");
  };

  const toggleCouponStatus = (code: string) => {
    setCoupons((prev) => {
      const updated = prev.map((c) =>
        c.code === code ? { ...c, isActive: !c.isActive } : c
      );
      saveToStorage(STORAGE_KEYS.COUPONS, updated);
      return updated;
    });
  };

  const deleteCoupon = (code: string) => {
    setCoupons((prev) => {
      const updated = prev.filter((c) => c.code !== code);
      saveToStorage(STORAGE_KEYS.COUPONS, updated);
      return updated;
    });
    addToast("Promotion voucher deleted.", "info");
  };

  // Orders & Checkout
  const createOrder = ({
    customer,
    paymentMethod,
    paymentDetails,
  }: {
    customer: Order["customer"];
    paymentMethod: Order["paymentMethod"];
    paymentDetails?: Order["paymentDetails"];
  }): Order => {
    const orderNumber = generateOrderNumber();
    const subtotal = cartSubtotal;

    let discount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.discountType === "percentage") {
        discount = Math.round((subtotal * appliedCoupon.value) / 100);
      } else {
        discount = Math.min(subtotal, appliedCoupon.value);
      }
    }

    // Complimentary shipping above Rs. 5,000 across Pakistan
    const shipping = subtotal >= 5000 ? 0 : 250;
    const total = subtotal - discount + shipping;

    // Estimate COGS (cost total)
    const costTotal = cart.reduce((sum, item) => {
      const matched = products.find((p) => p.id === item.productId);
      const unitCost = matched?.costPrice || Math.round(item.price * 0.5);
      return sum + unitCost * item.quantity;
    }, 0);

    const isPaid =
      paymentMethod === "card" ||
      paymentMethod === "easypaisa" ||
      paymentMethod === "jazzcash" ||
      paymentMethod === "bank_transfer";

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      date: new Date().toISOString(),
      status: "pending",
      customer,
      items: [...cart],
      subtotal,
      discount,
      couponCode: appliedCoupon?.code,
      shipping,
      total,
      costTotal,
      paymentMethod,
      paymentStatus: isPaid ? "paid" : "pending",
      paymentDetails,
      timeline: [
        {
          status: "pending",
          timestamp: new Date().toISOString(),
          note: `Order placed via ${paymentMethod.toUpperCase().replace("_", " ")}.`,
        },
      ],
    };

    // Update orders list
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    saveToStorage(STORAGE_KEYS.ORDERS, updatedOrders);

    // Decrement inventory stock
    const updatedProducts = products.map((prod) => {
      const inCart = cart.filter((c) => c.productId === prod.id);
      if (!inCart.length) return prod;

      const updatedVariants = prod.variants.map((v) => {
        const item = inCart.find(
          (c) =>
            c.size === v.size &&
            c.color.toLowerCase() === v.colorName.toLowerCase()
        );
        if (item) {
          return {
            ...v,
            stock: Math.max(0, v.stock - item.quantity),
          };
        }
        return v;
      });

      return {
        ...prod,
        variants: updatedVariants,
      };
    });

    setProducts(updatedProducts);
    saveToStorage(STORAGE_KEYS.PRODUCTS, updatedProducts);

    // Update Customer record or create new customer
    let matchedCustomer = customers.find(
      (c) => c.email.toLowerCase() === customer.email.toLowerCase()
    );

    let updatedCustomers: Customer[];
    if (matchedCustomer) {
      updatedCustomers = customers.map((c) =>
        c.id === matchedCustomer!.id
          ? {
              ...c,
              totalOrders: c.totalOrders + 1,
              totalSpent: c.totalSpent + total,
              ltv: c.ltv + total,
              lastPurchaseDate: new Date().toISOString().split("T")[0],
              segment:
                c.totalSpent + total > 75000
                  ? "VIP"
                  : c.totalOrders >= 2
                  ? "Loyal"
                  : "Regular",
              orderIds: [newOrder.id, ...c.orderIds],
            }
          : c
      );
    } else {
      const newCust: Customer = {
        id: `cust-${Date.now()}`,
        name: customer.fullName,
        email: customer.email,
        phone: customer.phone,
        city: customer.city,
        province: customer.province,
        totalOrders: 1,
        totalSpent: total,
        ltv: total,
        segment: "New",
        firstOrderDate: new Date().toISOString().split("T")[0],
        lastPurchaseDate: new Date().toISOString().split("T")[0],
        orderIds: [newOrder.id],
      };
      updatedCustomers = [newCust, ...customers];
    }

    setCustomers(updatedCustomers);
    saveToStorage(STORAGE_KEYS.CUSTOMERS, updatedCustomers);

    // Fire Purchase event (Meta Pixel + CAPI deduplicated)
    trackEvent("Purchase", {
      order_id: newOrder.orderNumber,
      value: newOrder.total,
      currency: "PKR",
      num_items: cartCount,
      shipping: newOrder.shipping,
      coupon: newOrder.couponCode || "NONE",
      items: cart.map((i) => ({
        id: i.productId,
        name: i.title,
        price: i.price,
        quantity: i.quantity,
      })),
    });

    // Clear cart
    clearCart();

    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string,
    status: OrderStatus,
    note?: string
  ) => {
    setOrders((prev) => {
      const updated = prev.map((ord) => {
        if (ord.id === orderId) {
          const newTimelineItem = {
            status,
            timestamp: new Date().toISOString(),
            note:
              note ||
              `Status updated to ${status.toUpperCase()} by Fulfillment Manager.`,
          };
          return {
            ...ord,
            status,
            timeline: [...ord.timeline, newTimelineItem],
          };
        }
        return ord;
      });
      saveToStorage(STORAGE_KEYS.ORDERS, updated);
      return updated;
    });
    addToast(`Order status updated to ${status}.`, "success");
  };

  const addOrderTracking = (
    orderId: string,
    trackingNumber: string,
    courier: string
  ) => {
    setOrders((prev) => {
      const updated = prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            trackingNumber,
            courier,
            status: "shipped" as OrderStatus,
            timeline: [
              ...ord.timeline,
              {
                status: "shipped" as OrderStatus,
                timestamp: new Date().toISOString(),
                note: `Dispatched via ${courier}. Consignment tracking #${trackingNumber}`,
              },
            ],
          };
        }
        return ord;
      });
      saveToStorage(STORAGE_KEYS.ORDERS, updated);
      return updated;
    });
    addToast(
      `Dispatched order with ${courier} tracking #${trackingNumber}`,
      "success"
    );
  };

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.id === orderId);
  };

  const getOrderByNumber = (orderNumber: string) => {
    const clean = orderNumber.trim().toUpperCase().replace(/^#/, "");
    return orders.find(
      (o) =>
        o.orderNumber.toUpperCase().replace(/^#/, "") === clean ||
        (o.trackingNumber && o.trackingNumber.toUpperCase() === clean) ||
        o.id === orderNumber.trim()
    );
  };

  // Customers
  const loginCustomer = (email: string) => {
    const matched = customers.find(
      (c) => c.email.toLowerCase() === email.toLowerCase()
    );
    if (matched) {
      setCurrentCustomer(matched);
      saveToStorage(STORAGE_KEYS.CURRENT_CUSTOMER, matched);
      addToast(`Welcome back, ${matched.name}.`, "success");
      return true;
    }
    return false;
  };

  const logoutCustomer = () => {
    setCurrentCustomer(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_CUSTOMER);
    }
    addToast("Logged out of customer account.", "info");
  };

  const registerCustomer = (data: Partial<Customer>) => {
    const newCust: Customer = {
      id: `cust-${Date.now()}`,
      name: data.name || "Aleyza Patron",
      email: data.email || "",
      phone: data.phone || "",
      city: data.city || "Lahore",
      province: data.province || "Punjab",
      totalOrders: 0,
      totalSpent: 0,
      ltv: 0,
      segment: "New",
      firstOrderDate: new Date().toISOString().split("T")[0],
      lastPurchaseDate: new Date().toISOString().split("T")[0],
      orderIds: [],
    };
    const updated = [newCust, ...customers];
    setCustomers(updated);
    setCurrentCustomer(newCust);
    saveToStorage(STORAGE_KEYS.CUSTOMERS, updated);
    saveToStorage(STORAGE_KEYS.CURRENT_CUSTOMER, newCust);
    addToast(`Account created. Welcome to Aleyza Store, ${newCust.name}!`, "success");
    return newCust;
  };

  // Marketing Campaigns
  const addCampaign = (campaign: MarketingCampaign) => {
    setCampaigns((prev) => {
      const updated = [campaign, ...prev];
      saveToStorage(STORAGE_KEYS.CAMPAIGNS, updated);
      return updated;
    });
    addToast(`Campaign "${campaign.name}" created.`, "success");
  };

  const updateCampaignStatus = (
    id: string,
    status: "active" | "paused" | "completed"
  ) => {
    setCampaigns((prev) => {
      const updated = prev.map((c) =>
        c.id === id ? { ...c, status } : c
      );
      saveToStorage(STORAGE_KEYS.CAMPAIGNS, updated);
      return updated;
    });
    addToast(`Campaign status updated to ${status}.`, "info");
  };

  // Tracking Configuration
  const updateTrackingConfig = (updates: Partial<TrackingConfig>) => {
    setTrackingConfig((prev) => {
      const updated = { ...prev, ...updates };
      saveToStorage(STORAGE_KEYS.TRACKING_CONFIG, updated);
      return updated;
    });
    addToast("Pixel & Conversions API settings updated.", "success");
  };

  // Content Configuration
  const updateAnnouncement = (ann: AnnouncementConfig) => {
    setAnnouncement(ann);
    saveToStorage(STORAGE_KEYS.ANNOUNCEMENT, ann);
    addToast("Announcement bar updated.", "success");
  };

  const updateHero = (h: HeroConfig) => {
    setHero(h);
    saveToStorage(STORAGE_KEYS.HERO, h);
    addToast("Homepage hero campaign updated.", "success");
  };

  const updatePromoBanner = (pb: PromoBannerConfig) => {
    setPromoBanner(pb);
    saveToStorage(STORAGE_KEYS.PROMO_BANNER, pb);
    addToast("Promotional banner updated.", "success");
  };

  const subscribeNewsletter = (email: string, source: string = "Storefront") => {
    const clean = email.trim().toLowerCase();
    if (!clean || !clean.includes("@")) {
      return { success: false, message: "Please enter a valid email address." };
    }

    const already = subscribers.some((s) => s.email.toLowerCase() === clean);
    if (already) {
      return {
        success: true,
        message: "You are already a valued member of our VIP Club!",
      };
    }

    const newSub: Subscriber = {
      id: `sub-${Date.now()}`,
      email: clean,
      source,
      subscribedAt: new Date().toISOString().split("T")[0],
    };

    const updated = [newSub, ...subscribers];
    setSubscribers(updated);
    saveToStorage(STORAGE_KEYS.SUBSCRIBERS, updated);
    addToast("Thank you for joining Aleyza VIP Club! Use WELCOMEVIP for 15% off.", "success");
    return {
      success: true,
      message: "Welcome privilege unlocked! Check your inbox.",
    };
  };

  const resetStoreData = () => {
    if (typeof window !== "undefined") {
      Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
    }
    setProducts(SEED_PRODUCTS);
    setCart([]);
    setWishlist([]);
    setOrders(SEED_ORDERS);
    setCustomers(SEED_CUSTOMERS);
    setCoupons(SEED_COUPONS);
    setCampaigns(SEED_MARKETING_CAMPAIGNS);
    setTrackingConfig(SEED_TRACKING_CONFIG);
    setTrackingEvents(SEED_TRACKING_EVENTS);
    setAnnouncement(SEED_ANNOUNCEMENT);
    setHero(SEED_HERO);
    setPromoBanner(SEED_PROMO_BANNER);
    setSubscribers(SEED_SUBSCRIBERS);
    setCurrentCustomer(SEED_CUSTOMERS[0]);
    addToast("Store data restored to fresh demo state.", "info");
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductBySlug,

        cart,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        cartSubtotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,

        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,

        coupons,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        addCoupon,
        toggleCouponStatus,
        deleteCoupon,

        orders,
        createOrder,
        updateOrderStatus,
        addOrderTracking,
        getOrderById,
        getOrderByNumber,

        customers,
        currentCustomer,
        loginCustomer,
        logoutCustomer,
        registerCustomer,

        campaigns,
        addCampaign,
        updateCampaignStatus,
        trafficSources,
        adSets,
        ads,

        trackingConfig,
        updateTrackingConfig,
        trackingEvents,
        trackEvent,

        announcement,
        updateAnnouncement,
        hero,
        updateHero,
        promoBanner,
        updatePromoBanner,
        subscribers,
        subscribeNewsletter,

        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        quickViewProduct,
        setQuickViewProduct,

        toasts,
        addToast,
        removeToast,

        resetStoreData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
