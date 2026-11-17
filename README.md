# ALEYZA STORE
### Premium Pakistani Women's Fashion E-Commerce Platform & Advanced Marketing Analytics Suite

[![Framework](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Market](https://img.shields.io/badge/Market-Pakistan_%7C_PKR_(Rs.)-green)](#)
[![Meta CAPI](https://img.shields.io/badge/Meta_CAPI-Event_Deduplication-blue?logo=meta)](#)

---

## 💎 Project Overview

**Aleyza Store** is a flagship haute prêt and couture e-commerce platform engineered specifically for the Pakistani women's luxury fashion market. Transcending generic e-commerce templates, it pairs high-fashion editorial aesthetics (inspired by heritage craftsmanship in Lahore and Karachi) with enterprise-grade business management and marketing telemetry.

The platform is architected into two integrated ecosystems:
1. **Public Storefront (`/`)**: Immersive editorial customer experience with instant multi-currency/PKR calculations, Cash on Delivery (COD), TCS Courier logistics, size & fit guides, and full-funnel pixel tracking.
2. **Executive Admin Dashboard (`/admin`)**: SaaS-grade business suite with live product CRUD, order fulfillment, customer lifetime value (LTV) segmentation, inventory valuation, rule-based marketing intelligence, Meta Conversions API (CAPI) deduplication telemetry, and P&L profitability reporting.

---

## 🎨 Visual Identity & Design Tokens

| Token | Hex | Role |
| :--- | :--- | :--- |
| **Warm Ivory** | `#FAF8F4` | Primary luxury background |
| **Soft Beige** | `#EDE5DA` | Secondary surface & borders |
| **Charcoal** | `#252321` | High-contrast typography & primary actions |
| **Muted Rose** | `#C69B98` | Brand accent & festive highlights |
| **Deep Brown** | `#55443B` | Rich hover tones & couture accents |
| **White** | `#FFFFFF` | Cards & product presentation surfaces |

**Typography:**
- Headings & Editorial Display: *Playfair Display* & *Cormorant Garamond* (Mughal imperial grandeur)
- Body & Interface UI: *Plus Jakarta Sans* (Legible, crisp contemporary sans-serif)

---

## 🔑 Portfolio Demo Credentials

The platform includes built-in demo profiles and 1-click authentication switches so evaluators can test customer accounts and admin capabilities without manual registration:

### 🛡️ Executive Admin Suite
- **Route:** `http://localhost:3000/admin`
- **Role:** Lead Architect & Operations Administrator
- **Access:** Direct Access Enabled (No configuration required)
- **Features Available:** Live catalog CRUD, inventory adjustments, order fulfillment, CSV exports, Meta & Google Ads telemetry, P&L audit.

### 👤 Customer Patron Profiles (1-Click Switch on `/account`)
- **VIP Patron (Lahore):** `ayesha.malik@gmail.com` (Spent: Rs. 114,500 across 6 orders)
- **VIP Patron (Islamabad):** `mahnoor.tariq@outlook.com` (Spent: Rs. 92,400 across 5 orders)
- **Loyal Patron (Karachi):** `zainab.farooq92@yahoo.com` (Spent: Rs. 68,900 across 4 orders)

---

## 🚀 Key Feature Matrix

### 1. Customer-Facing Storefront
- **Editorial Hero & 14 Curated Sections:** Seasonal campaigns, video reels, category carousels, customer reflections, Instagram `#AleyzaWomen` gallery, and VIP Club incentives.
- **Dynamic Category & Shop Filters (`/shop`):** Real-time multi-facet filtering by category, price slider (PKR 4,000–35,000), sizes (XS–XL), color swatches, stock availability, and sorting (Featured, Newest, Best Selling, Price).
- **Product Detail Experience (`/product/[slug]`):** High-res image gallery with interactive thumbnails, size & fit guide in inches/cm, live variant stock counters, customer reviews with verified buyer badges, related products carousel, and "Buy Now with Cash on Delivery".
- **Shopping Bag & Slide-Over Drawer:** Real-time complimentary shipping progress bar (Free delivery over Rs. 5,000 across Pakistan), promotional voucher engine (`ALEYZA10`, `WELCOMEVIP`), order notes.
- **Pakistan-Specific Checkout (`/checkout`):**
  - Province & City selectors (Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, etc.)
  - Payment Gateways:
    - **Cash on Delivery (COD)** with automated courier verification
    - **Direct Bank Transfer** (Meezan Bank Ltd, HBL, Bank Alfalah with IBAN & deposit reference)
    - **Easypaisa & JazzCash** instant mobile wallet prompts
    - **Visa & Mastercard** integration-ready 3D-Secure card architecture
- **Real-Time Consignment Tracker (`/track`):** Live step-by-step audit trail (Placed → Confirmed → Packaging at Lahore Atelier → In Transit via TCS → Delivered).
- **Customer Account Portal (`/account`):** Saved addresses, order history, tracking links, and wishlist management.

---

### 2. Executive Admin & Marketing Analytics Suite (`/admin`)

- **Dashboard Overview (`/admin`):**
  - Live calculated KPIs: Total Revenue (PKR), Total Orders, Patron Count, AOV, Conversion Rate (3.42%), Garments Sold, Pending Dispatch, Low Stock Alerts.
  - Interactive Recharts Area & Bar charts with date filters (Today, 7D, 30D, 90D, Year).
  - Revenue by collection donut chart & recent order stream.
- **Product Management (`/admin/products`):** Full CRUD modal for creating and updating pieces with SKUs, category assignments, collections, pricing, COGS, sizes, colors, and featured toggles.
- **Order Management (`/admin/orders`):** Status pipeline (Pending → Confirmed → Processing → Shipped → Delivered → Returned), tracking consignment generation, official printable Tax Invoices, and CSV export.
- **Customer Intelligence (`/admin/customers`):** Directory with spend metrics, LTV calculations, and RFM-inspired segmentation (VIP, Loyal, New, At Risk).
- **Inventory Warehousing (`/admin/inventory`):** Variant stock breakdown, total inventory cost valuation, stock adjustment modal (+/- units with audit reasons: restock, return, damage write-off).
- **Discounts & Promotions (`/admin/discounts`):** Percentage & fixed discount voucher creator with expiration dates and minimum order constraints.
- **Marketing Overview (`/admin/marketing/overview`):**
  - 12 blended marketing metrics: Ad Spend, Attributed Revenue, Blended ROAS (4.62x), Cost Per Purchase (CPP), CPC, CTR, Impressions, Reach, Link Clicks, Conversions, CAC.
  - Revenue vs Spend correlation chart.
  - Omnichannel platform leaderboard (Meta Ads, Google Ads, Influencers, TikTok).
- **Meta Ads Analytics (`/admin/marketing/meta`):**
  - Full conversion funnel telemetry (Impressions → Clicks → View Content → Add to Cart → Initiate Checkout → Purchase).
  - Campaign, Ad Set, and creative reel performance tables.
  - Meta Marketing API configuration with masked server tokens.
- **Google Ads Analytics (`/admin/marketing/google`):** Performance Max, Brand Search exact match, conversions, conversion value, and MCC account ID settings.
- **Marketing Attribution (`/admin/marketing/attribution`):** Multi-touch attribution model comparer (First-Touch vs Last-Touch vs Linear) distinguishing awareness drivers from conversion channels.
- **Campaign Manager (`/admin/marketing/campaigns`):** Interface for launching, editing, and pausing paid media allocations.
- **Rule-Based Marketing Insights (`/admin/marketing/insights`):** Algorithmically derived recommendations (Top ROAS scaler, bleeding spend warning, dominant city density).
- **Pixel & Tracking Management (`/admin/marketing/tracking`):**
  - Meta Pixel + Meta Conversions API (CAPI) dual-dispatch architecture with unique event deduplication keys (`purch-ALZ-XXXXX`).
  - GA4, GTM, and Google Enhanced Conversions status monitors.
  - Real-time live event stream console with event payloads.
- **Reports & Business Intelligence (`/admin/reports`):**
  - **P&L Profitability Audit:** Gross Revenue minus COGS minus Paid Ads minus Courier Shipping = **True Net Profit & Margin %** (Never confuses revenue with profit).
  - Sales, product gross margins, and marketing reports with 1-click CSV exports and printable PDF view.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 14.2 (App Router, React Server & Client Components)
- **Language:** TypeScript 5.6
- **Styling:** Tailwind CSS 3.4 with custom Aleyza design tokens
- **Data Visualizations:** Recharts 2.13 (AreaChart, BarChart, PieChart)
- **Icons:** Lucide React
- **State & Persistence:** Unified React Context with Client Storage Sync & Server Telemetry
- **Utilities:** clsx, tailwind-merge, custom CSV & Pakistani formatting helpers

---

## 💻 Local Development Setup

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open in browser
# Public Storefront: http://localhost:3000
# Admin Business Suite: http://localhost:3000/admin
```

---

## 📦 Production Build

```bash
npm run build
npm run start
```

---

*Designed and engineered with pride for Aleyza Store (Pvt) Ltd. Handcrafted in Pakistan.*
