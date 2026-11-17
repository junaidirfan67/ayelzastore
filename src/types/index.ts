export type ProductCategory =
  | "eastern-wear"
  | "western-wear"
  | "casual-wear"
  | "formal-wear"
  | "dresses"
  | "co-ord-sets"
  | "kurtis"
  | "handbags"
  | "jewelry"
  | "scarves";

export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "One Size";

export interface ProductVariant {
  id: string;
  size: ProductSize;
  colorName: string;
  colorHex: string;
  stock: number;
  sku: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  city?: string;
  verified: boolean;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  tagline?: string;
  description: string;
  fabric: string;
  careInstructions: string;
  price: number; // in PKR
  compareAtPrice?: number; // original price if discounted
  sku: string;
  category: ProductCategory;
  categoryLabel: string;
  collection: string;
  images: string[];
  variants: ProductVariant[];
  availableSizes: ProductSize[];
  availableColors: { name: string; hex: string }[];
  isFeatured: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  isSeasonal?: boolean;
  isTrending?: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
  costPrice?: number; // for admin profit calculation
}

export interface CartItem {
  id: string; // unique item id
  productId: string;
  productSlug: string;
  title: string;
  price: number;
  image: string;
  size: ProductSize;
  color: string;
  quantity: number;
  maxStock: number;
}

export interface WishlistItem {
  productId: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  slug: string;
  categoryLabel: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned";

export type PaymentMethod =
  | "cod"
  | "bank_transfer"
  | "easypaisa"
  | "jazzcash"
  | "card";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  province: string;
  city: string;
  address: string;
  postalCode?: string;
  notes?: string;
}

export interface OrderTimelineItem {
  status: OrderStatus;
  timestamp: string;
  note: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. ALZ-9821
  date: string;
  status: OrderStatus;
  customer: OrderCustomer;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shipping: number;
  total: number;
  costTotal?: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentDetails?: {
    transactionRef?: string;
    bankName?: string;
  };
  trackingNumber?: string;
  courier?: string; // TCS, Leopards, CallCourier
  timeline: OrderTimelineItem[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  province: string;
  totalOrders: number;
  totalSpent: number;
  ltv: number;
  segment: "VIP" | "Loyal" | "New" | "At Risk" | "Regular";
  firstOrderDate: string;
  lastPurchaseDate: string;
  orderIds: string[];
}

export interface Coupon {
  code: string;
  discountType: "percentage" | "fixed";
  value: number; // e.g. 15 for 15%, or 1000 for Rs. 1000
  minOrderAmount: number;
  expiryDate: string;
  usageLimit: number;
  usageCount: number;
  isActive: boolean;
  description: string;
}

export interface MarketingCampaign {
  id: string;
  name: string;
  channel: "meta" | "google" | "tiktok" | "email" | "influencer";
  channelLabel: string;
  objective: "Sales / Purchases" | "Traffic / Clicks" | "Brand Awareness" | "Lead Gen";
  status: "active" | "paused" | "completed";
  budgetDaily: number;
  totalSpend: number;
  impressions: number;
  clicks: number;
  ctr: number; // percentage e.g. 3.4
  cpc: number; // PKR
  cpm: number; // PKR
  purchases: number;
  revenue: number; // PKR
  roas: number; // e.g. 4.2x
  costPerPurchase: number; // PKR
  startDate: string;
  endDate?: string;
}

export interface MetaAdSet {
  id: string;
  campaignId: string;
  name: string;
  targeting: string;
  budget: number;
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  purchases: number;
  revenue: number;
  roas: number;
  status: "active" | "paused";
}

export interface MetaAdItem {
  id: string;
  adSetId: string;
  name: string;
  format: "Single Image" | "Carousel" | "Video Reel";
  creativeTitle: string;
  thumbnailUrl: string;
  spend: number;
  impressions: number;
  clicks: number;
  purchases: number;
  revenue: number;
  roas: number;
  status: "active" | "paused";
}

export interface TrafficSource {
  channel: string;
  sessions: number;
  users: number;
  orders: number;
  revenue: number;
  conversionRate: number;
  aov: number;
  firstTouchShare: number; // percentage
  lastTouchShare: number; // percentage
}

export interface TrackingConfig {
  metaPixelId: string;
  metaAccessToken: string; // masked in UI
  metaTestEventCode: string;
  metaCapiEnabled: boolean;
  ga4MeasurementId: string;
  gtmContainerId: string;
  googleAdsConversionId: string;
  googleAdsEnhancedConversions: boolean;
  status: {
    metaPixel: boolean;
    metaCapi: boolean;
    ga4: boolean;
    gtm: boolean;
    googleAds: boolean;
  };
}

export interface TrackingLogEvent {
  id: string;
  timestamp: string;
  eventName: "PageView" | "ViewContent" | "Search" | "AddToCart" | "InitiateCheckout" | "AddPaymentInfo" | "Purchase";
  source: "Client (Browser Pixel)" | "Server (Meta Conversions API / CAPI)";
  deduplicationEventId: string;
  payload: {
    content_name?: string;
    content_category?: string;
    value?: number;
    currency?: string;
    order_id?: string;
    num_items?: number;
    user_email_hashed?: string;
  };
  status: "processed" | "deduplicated" | "dispatched";
}

export interface AnnouncementConfig {
  text: string;
  linkText?: string;
  linkUrl?: string;
  enabled: boolean;
}

export interface HeroConfig {
  tagline: string;
  headline: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  imageUrl: string;
}

export interface PromoBannerConfig {
  badge: string;
  title: string;
  subtitle: string;
  couponCode: string;
  expiryText: string;
  imageUrl: string;
  enabled: boolean;
}

export interface Subscriber {
  id: string;
  email: string;
  source: string;
  subscribedAt: string;
}
