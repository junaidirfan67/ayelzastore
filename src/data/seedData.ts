import {
  Product,
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
} from "../types";

export const SEED_PRODUCTS: Product[] = [
  {
    id: "prod-001",
    title: "Gul-e-Noor Embroidered Raw Silk Kalidar",
    slug: "gul-e-noor-embroidered-raw-silk-kalidar",
    tagline: "Handcrafted Zari & Resham Work on Royal Ivory Silk",
    description: "An ethereal 3-piece formal ensemble featuring an ivory pure raw silk flared kalidar adorned with intricate tilla, sitara, and resham thread embroidery. Paired with a contrast hand-embellished organza dupatta and tailored silk cigarette trousers.",
    fabric: "100% Pure Raw Silk Shirt & Pants, Crinkle Chiffon Organza Dupatta",
    careInstructions: "Dry clean only. Store in a breathable muslin garment bag. Do not wring or bleach.",
    price: 24950,
    compareAtPrice: 28500,
    sku: "ALZ-EST-001",
    category: "eastern-wear",
    categoryLabel: "Eastern Wear",
    collection: "Festive Silk & Organza '26",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80"
    ],
    availableSizes: ["XS", "S", "M", "L", "XL"],
    availableColors: [
      { name: "Ivory Gold", hex: "#FAF8F4" },
      { name: "Dusty Peach", hex: "#E8C5B8" }
    ],
    variants: [
      { id: "v-001-1", size: "XS", colorName: "Ivory Gold", colorHex: "#FAF8F4", stock: 6, sku: "ALZ-EST-001-XS-IV" },
      { id: "v-001-2", size: "S", colorName: "Ivory Gold", colorHex: "#FAF8F4", stock: 12, sku: "ALZ-EST-001-S-IV" },
      { id: "v-001-3", size: "M", colorName: "Ivory Gold", colorHex: "#FAF8F4", stock: 9, sku: "ALZ-EST-001-M-IV" },
      { id: "v-001-4", size: "L", colorName: "Ivory Gold", colorHex: "#FAF8F4", stock: 4, sku: "ALZ-EST-001-L-IV" },
      { id: "v-001-5", size: "XL", colorName: "Ivory Gold", colorHex: "#FAF8F4", stock: 3, sku: "ALZ-EST-001-XL-IV" }
    ],
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isSeasonal: true,
    isTrending: true,
    rating: 4.9,
    reviewCount: 38,
    createdAt: "2026-09-12",
    costPrice: 13200,
  },
  {
    id: "prod-002",
    title: "Mehr-un-Nisa Midnight Velvet Kurta Set",
    slug: "mehr-un-nisa-midnight-velvet-kurta-set",
    tagline: "Rich Micro Velvet with Marori Embroidery & Scalloped Borders",
    description: "Indulge in understated opulence with this deep charcoal micro-velvet straight kurta accented with antique copper dabka, moti, and zardozi needlework along the neckline and sleeves. Finished with an embroidered tissue silk dupatta.",
    fabric: "Premium Micro 9000 Velvet with Jacquard Tissue Lining",
    careInstructions: "Professional dry clean only. Steam iron on reverse side with low heat.",
    price: 21500,
    compareAtPrice: 24000,
    sku: "ALZ-FRM-002",
    category: "formal-wear",
    categoryLabel: "Formal Wear",
    collection: "Velvet Soirée Edition",
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80"
    ],
    availableSizes: ["S", "M", "L", "XL"],
    availableColors: [
      { name: "Midnight Charcoal", hex: "#252321" },
      { name: "Royal Plum", hex: "#4A2E35" }
    ],
    variants: [
      { id: "v-002-1", size: "S", colorName: "Midnight Charcoal", colorHex: "#252321", stock: 8, sku: "ALZ-FRM-002-S-MC" },
      { id: "v-002-2", size: "M", colorName: "Midnight Charcoal", colorHex: "#252321", stock: 15, sku: "ALZ-FRM-002-M-MC" },
      { id: "v-002-3", size: "L", colorName: "Midnight Charcoal", colorHex: "#252321", stock: 5, sku: "ALZ-FRM-002-L-MC" },
      { id: "v-002-4", size: "XL", colorName: "Midnight Charcoal", colorHex: "#252321", stock: 2, sku: "ALZ-FRM-002-XL-MC" }
    ],
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isSeasonal: true,
    isTrending: true,
    rating: 5.0,
    reviewCount: 42,
    createdAt: "2026-10-01",
    costPrice: 11000,
  },
  {
    id: "prod-003",
    title: "Zehra Minimalist Linen Co-Ord Set",
    slug: "zehra-minimalist-linen-co-ord-set",
    tagline: "Relaxed Silhouette in Soft Breathable Muted Rose",
    description: "Effortless daytime sophistication. Tailored from premium stonewashed slub linen, featuring an asymmetric high-low tunic shirt with mother-of-pearl buttons and relaxed wide-leg trousers with hidden side pockets.",
    fabric: "100% Breathable Slub Linen Blend",
    careInstructions: "Machine wash cold delicate cycle. Dry in shade. Warm iron.",
    price: 8950,
    sku: "ALZ-CRD-003",
    category: "co-ord-sets",
    categoryLabel: "Co-Ord Sets",
    collection: "Modern Prêt Everyday",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80"
    ],
    availableSizes: ["XS", "S", "M", "L"],
    availableColors: [
      { name: "Muted Rose", hex: "#C69B98" },
      { name: "Oatmeal Beige", hex: "#EDE5DA" },
      { name: "Sage Green", hex: "#8A9A86" }
    ],
    variants: [
      { id: "v-003-1", size: "XS", colorName: "Muted Rose", colorHex: "#C69B98", stock: 10, sku: "ALZ-CRD-003-XS-MR" },
      { id: "v-003-2", size: "S", colorName: "Muted Rose", colorHex: "#C69B98", stock: 18, sku: "ALZ-CRD-003-S-MR" },
      { id: "v-003-3", size: "M", colorName: "Muted Rose", colorHex: "#C69B98", stock: 24, sku: "ALZ-CRD-003-M-MR" },
      { id: "v-003-4", size: "L", colorName: "Muted Rose", colorHex: "#C69B98", stock: 11, sku: "ALZ-CRD-003-L-MR" }
    ],
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    isSeasonal: false,
    isTrending: true,
    rating: 4.8,
    reviewCount: 29,
    createdAt: "2026-10-25",
    costPrice: 4200,
  },
  {
    id: "prod-004",
    title: "Dariya Floral Printed Chiffon Maxi",
    slug: "dariya-floral-printed-chiffon-maxi",
    tagline: "Romantic Tiered Silhouette with Flared Sleeves",
    description: "A dreamy flowy silhouette designed for sunset dinners and modern evening gatherings. Hand-drawn botanical rose motifs printed on sheer crinkle chiffon, with soft smocking around the waistline and a high-neck band collar.",
    fabric: "Crinkle Poly-Chiffon with Soft Viscose Inner Lining",
    careInstructions: "Hand wash cold. Line dry in shade. Cool iron or garment steam.",
    price: 11450,
    compareAtPrice: 13500,
    sku: "ALZ-DRS-004",
    category: "dresses",
    categoryLabel: "Dresses",
    collection: "Spring Reverie '26",
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80"
    ],
    availableSizes: ["XS", "S", "M", "L"],
    availableColors: [
      { name: "Dusty Blossom", hex: "#E2A9A3" },
      { name: "Soft Ivory", hex: "#FAF8F4" }
    ],
    variants: [
      { id: "v-004-1", size: "XS", colorName: "Dusty Blossom", colorHex: "#E2A9A3", stock: 5, sku: "ALZ-DRS-004-XS-DB" },
      { id: "v-004-2", size: "S", colorName: "Dusty Blossom", colorHex: "#E2A9A3", stock: 14, sku: "ALZ-DRS-004-S-DB" },
      { id: "v-004-3", size: "M", colorName: "Dusty Blossom", colorHex: "#E2A9A3", stock: 8, sku: "ALZ-DRS-004-M-DB" },
      { id: "v-004-4", size: "L", colorName: "Dusty Blossom", colorHex: "#E2A9A3", stock: 4, sku: "ALZ-DRS-004-L-DB" }
    ],
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isSeasonal: true,
    rating: 4.7,
    reviewCount: 31,
    createdAt: "2026-08-14",
    costPrice: 5800,
  },
  {
    id: "prod-005",
    title: "Afreen Hand-Embroidered Chikankari Kurti",
    slug: "afreen-hand-embroidered-chikankari-kurti",
    tagline: "Authentic Shadow Work & Cutwork on Pure Swiss Lawn",
    description: "Crafted by master artisans, this straight-cut Swiss lawn kurti showcases authentic delicate shadow embroidery and cutwork lace panels along the hem and sleeve cuffs. Elevated with crochet lace buttons.",
    fabric: "100% Superfine Swiss Voile Lawn",
    careInstructions: "Gentle hand wash with mild liquid soap. Do not soak. Iron while slightly damp.",
    price: 6490,
    compareAtPrice: 7500,
    sku: "ALZ-KRT-005",
    category: "kurtis",
    categoryLabel: "Kurtis",
    collection: "Chikankari Heirloom",
    images: [
      "https://images.unsplash.com/photo-1574015974293-817f0ebebb74?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80"
    ],
    availableSizes: ["XS", "S", "M", "L", "XL"],
    availableColors: [
      { name: "Pristine White", hex: "#FFFFFF" },
      { name: "Soft Beige", hex: "#EDE5DA" }
    ],
    variants: [
      { id: "v-005-1", size: "XS", colorName: "Pristine White", colorHex: "#FFFFFF", stock: 12, sku: "ALZ-KRT-005-XS-PW" },
      { id: "v-005-2", size: "S", colorName: "Pristine White", colorHex: "#FFFFFF", stock: 22, sku: "ALZ-KRT-005-S-PW" },
      { id: "v-005-3", size: "M", colorName: "Pristine White", colorHex: "#FFFFFF", stock: 18, sku: "ALZ-KRT-005-M-PW" },
      { id: "v-005-4", size: "L", colorName: "Pristine White", colorHex: "#FFFFFF", stock: 14, sku: "ALZ-KRT-005-L-PW" },
      { id: "v-005-5", size: "XL", colorName: "Pristine White", colorHex: "#FFFFFF", stock: 7, sku: "ALZ-KRT-005-XL-PW" }
    ],
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: true,
    isSeasonal: false,
    rating: 4.9,
    reviewCount: 54,
    createdAt: "2026-10-18",
    costPrice: 2800,
  },
  {
    id: "prod-006",
    title: "Soraia Tailored Double-Breasted Blazer & Trouser",
    slug: "soraia-tailored-double-breasted-blazer-trouser",
    tagline: "Sharp Modern Power Suiting in Biscuit Sand Wool Blend",
    description: "Redefine work-to-evening dressing with our sharp tailored blazer and matching high-waisted cigarette trousers. Features peak lapels, horn-finish buttons, welt pockets, and a luxurious inner cupro lining.",
    fabric: "Lightweight Wool-Poly Crepe Blend with Stretch Cupro Lining",
    careInstructions: "Dry clean only. Hang on a contoured suit hanger.",
    price: 18500,
    compareAtPrice: 21000,
    sku: "ALZ-WST-006",
    category: "western-wear",
    categoryLabel: "Western Wear",
    collection: "Atelier Tailoring",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
    ],
    availableSizes: ["XS", "S", "M", "L"],
    availableColors: [
      { name: "Biscuit Sand", hex: "#EDE5DA" },
      { name: "Midnight Charcoal", hex: "#252321" }
    ],
    variants: [
      { id: "v-006-1", size: "XS", colorName: "Biscuit Sand", colorHex: "#EDE5DA", stock: 4, sku: "ALZ-WST-006-XS-BS" },
      { id: "v-006-2", size: "S", colorName: "Biscuit Sand", colorHex: "#EDE5DA", stock: 9, sku: "ALZ-WST-006-S-BS" },
      { id: "v-006-3", size: "M", colorName: "Biscuit Sand", colorHex: "#EDE5DA", stock: 11, sku: "ALZ-WST-006-M-BS" },
      { id: "v-006-4", size: "L", colorName: "Biscuit Sand", colorHex: "#EDE5DA", stock: 3, sku: "ALZ-WST-006-L-BS" }
    ],
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    isSeasonal: false,
    rating: 4.8,
    reviewCount: 19,
    createdAt: "2026-11-02",
    costPrice: 9500,
  },
  {
    id: "prod-007",
    title: "Le Marais Structured Leather Top-Handle Bag",
    slug: "le-marais-structured-leather-top-handle-bag",
    tagline: "Full-Grain Italian Calfskin with Brushed Gold Turn-Lock",
    description: "An architectural everyday companion engineered from supple full-grain leather. Comes with a structured top handle, detachable leather crossbody strap, dual interior compartments, and metal protective feet.",
    fabric: "100% Genuine Full-Grain Calfskin Leather with Suede Lining",
    careInstructions: "Wipe clean with a soft dry cloth. Store in dust bag with silica gel packets.",
    price: 15800,
    compareAtPrice: 17500,
    sku: "ALZ-BAG-007",
    category: "handbags",
    categoryLabel: "Handbags",
    collection: "Leathergoods Capsule",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80"
    ],
    availableSizes: ["One Size"],
    availableColors: [
      { name: "Deep Brown", hex: "#55443B" },
      { name: "Creamy Ivory", hex: "#FAF8F4" },
      { name: "Onyx Black", hex: "#1C1B1A" }
    ],
    variants: [
      { id: "v-007-1", size: "One Size", colorName: "Deep Brown", colorHex: "#55443B", stock: 14, sku: "ALZ-BAG-007-OS-DB" },
      { id: "v-007-2", size: "One Size", colorName: "Creamy Ivory", colorHex: "#FAF8F4", stock: 8, sku: "ALZ-BAG-007-OS-CI" }
    ],
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isSeasonal: false,
    rating: 4.9,
    reviewCount: 47,
    createdAt: "2026-07-20",
    costPrice: 7800,
  },
  {
    id: "prod-008",
    title: "Noor Kundan & Pearl Heritage Choker Set",
    slug: "noor-kundan-pearl-heritage-choker-set",
    tagline: "22K Gold Plated Hand-Set Jadau Stones with Freshwater Pearls",
    description: "Inspired by the royal courts of Lahore, this bridal and festive choker features hand-cut kundan stones arranged in floral motifs, fringed with cluster seed pearls and emerald accents. Includes matching drop earrings and maang tikka.",
    fabric: "Brass Base with 22K Gold Micron Plating and Hypoallergenic Coating",
    careInstructions: "Keep away from moisture, perfumes, and hairspray. Store in air-tight pouch.",
    price: 12900,
    compareAtPrice: 14500,
    sku: "ALZ-JWL-008",
    category: "jewelry",
    categoryLabel: "Jewelry",
    collection: "Heritage Jewels",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80"
    ],
    availableSizes: ["One Size"],
    availableColors: [
      { name: "Gold Pearl", hex: "#C5A880" }
    ],
    variants: [
      { id: "v-008-1", size: "One Size", colorName: "Gold Pearl", colorHex: "#C5A880", stock: 10, sku: "ALZ-JWL-008-OS-GP" }
    ],
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isSeasonal: true,
    rating: 4.9,
    reviewCount: 35,
    createdAt: "2026-08-30",
    costPrice: 6200,
  },
  {
    id: "prod-009",
    title: "Silk Twill Heritage Paisley Scarf",
    slug: "silk-twill-heritage-paisley-scarf",
    tagline: "Hand-Rolled Edges on 100% Mulberry Silk",
    description: "A signature 90x90cm square scarf featuring archival Persian paisleys and botanical borders in terracotta, ivory, and soft rose hues. Hand-rolled and stitched by master seamstresses.",
    fabric: "100% Pure Mulberry Silk (16mm Twill)",
    careInstructions: "Dry clean or gentle hand wash in lukewarm water with silk detergent.",
    price: 4950,
    sku: "ALZ-SCF-009",
    category: "scarves",
    categoryLabel: "Scarves",
    collection: "Silk Scarves & Wraps",
    images: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=1000&q=80"
    ],
    availableSizes: ["One Size"],
    availableColors: [
      { name: "Terracotta Rose", hex: "#C69B98" },
      { name: "Ivory Sage", hex: "#FAF8F4" }
    ],
    variants: [
      { id: "v-009-1", size: "One Size", colorName: "Terracotta Rose", colorHex: "#C69B98", stock: 25, sku: "ALZ-SCF-009-OS-TR" },
      { id: "v-009-2", size: "One Size", colorName: "Ivory Sage", colorHex: "#FAF8F4", stock: 18, sku: "ALZ-SCF-009-OS-IS" }
    ],
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    isSeasonal: false,
    rating: 4.8,
    reviewCount: 22,
    createdAt: "2026-10-10",
    costPrice: 2100,
  },
  {
    id: "prod-010",
    title: "Anaya Hand-Blocked Cotton Flared Tunic",
    slug: "anaya-hand-blocked-cotton-flared-tunic",
    tagline: "Natural Vegetable Dyes with Ajrak & Geometric Borders",
    description: "Hand-carved wooden block printed onto pure mulmul cotton by craft clusters in Sindh. Featuring a flared A-line cut, loop button placket, and subtle ladder lace inserts.",
    fabric: "100% Artisanal Mulmul Cotton",
    careInstructions: "Wash separately in cold water with mild detergent. Colors may bleed naturally on first wash.",
    price: 5200,
    sku: "ALZ-CAS-010",
    category: "casual-wear",
    categoryLabel: "Casual Wear",
    collection: "Crafts of Indus",
    images: [
      "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80"
    ],
    availableSizes: ["XS", "S", "M", "L", "XL"],
    availableColors: [
      { name: "Indigo Blue", hex: "#2C4058" },
      { name: "Madder Red", hex: "#8A3324" }
    ],
    variants: [
      { id: "v-010-1", size: "XS", colorName: "Indigo Blue", colorHex: "#2C4058", stock: 8, sku: "ALZ-CAS-010-XS-IB" },
      { id: "v-010-2", size: "S", colorName: "Indigo Blue", colorHex: "#2C4058", stock: 16, sku: "ALZ-CAS-010-S-IB" },
      { id: "v-010-3", size: "M", colorName: "Indigo Blue", colorHex: "#2C4058", stock: 20, sku: "ALZ-CAS-010-M-IB" },
      { id: "v-010-4", size: "L", colorName: "Indigo Blue", colorHex: "#2C4058", stock: 12, sku: "ALZ-CAS-010-L-IB" },
      { id: "v-010-5", size: "XL", colorName: "Indigo Blue", colorHex: "#2C4058", stock: 5, sku: "ALZ-CAS-010-XL-IB" }
    ],
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    isSeasonal: false,
    rating: 4.6,
    reviewCount: 16,
    createdAt: "2026-09-05",
    costPrice: 2200,
  },
  {
    id: "prod-011",
    title: "Bano Embroidered Chiffon Formal Sari",
    slug: "bano-embroidered-chiffon-formal-sari",
    tagline: "Scalloped Pearl Cutwork Border with Unstitched Blouse",
    description: "Exquisite 6.5-yard drape in rose-champagne pure chiffon. Adorned with tone-on-tone sequins, Swarovski crystals, and micro-pearl borders. Accompanied by an embroidered silk blouse piece.",
    fabric: "Pure Micro Chiffon with Heavy Silk Blouse",
    careInstructions: "Specialist dry clean only. Wrap in unbleached cotton when storing.",
    price: 27900,
    compareAtPrice: 32000,
    sku: "ALZ-FRM-011",
    category: "formal-wear",
    categoryLabel: "Formal Wear",
    collection: "Heirloom Sarees",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80"
    ],
    availableSizes: ["One Size"],
    availableColors: [
      { name: "Rose Champagne", hex: "#E8D5CE" },
      { name: "Emerald Mist", hex: "#2E5C47" }
    ],
    variants: [
      { id: "v-011-1", size: "One Size", colorName: "Rose Champagne", colorHex: "#E8D5CE", stock: 4, sku: "ALZ-FRM-011-OS-RC" },
      { id: "v-011-2", size: "One Size", colorName: "Emerald Mist", colorHex: "#2E5C47", stock: 3, sku: "ALZ-FRM-011-OS-EM" }
    ],
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    isSeasonal: true,
    rating: 5.0,
    reviewCount: 14,
    createdAt: "2026-11-01",
    costPrice: 15000,
  },
  {
    id: "prod-012",
    title: "Alina Poplin Oversized Shirt & Culottes",
    slug: "alina-poplin-oversized-shirt-culottes",
    tagline: "Crisp Egyptian Cotton Poplin in Soft Warm Sand",
    description: "A tailored architectural silhouette offering clean Scandinavian minimalism infused with Pakistani modest sensibilities. High drop shoulders, extended French cuffs, and wide cropped culottes.",
    fabric: "100% Giza Long-Staple Cotton Poplin",
    careInstructions: "Machine wash delicate 30°C. Medium iron while damp for crisp finish.",
    price: 9800,
    sku: "ALZ-WST-012",
    category: "western-wear",
    categoryLabel: "Western Wear",
    collection: "Modern Prêt Everyday",
    images: [
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80"
    ],
    availableSizes: ["XS", "S", "M", "L"],
    availableColors: [
      { name: "Warm Sand", hex: "#EDE5DA" },
      { name: "Charcoal Slate", hex: "#252321" }
    ],
    variants: [
      { id: "v-012-1", size: "XS", colorName: "Warm Sand", colorHex: "#EDE5DA", stock: 6, sku: "ALZ-WST-012-XS-WS" },
      { id: "v-012-2", size: "S", colorName: "Warm Sand", colorHex: "#EDE5DA", stock: 15, sku: "ALZ-WST-012-S-WS" },
      { id: "v-012-3", size: "M", colorName: "Warm Sand", colorHex: "#EDE5DA", stock: 12, sku: "ALZ-WST-012-M-WS" },
      { id: "v-012-4", size: "L", colorName: "Warm Sand", colorHex: "#EDE5DA", stock: 7, sku: "ALZ-WST-012-L-WS" }
    ],
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    isSeasonal: false,
    rating: 4.7,
    reviewCount: 23,
    createdAt: "2026-10-28",
    costPrice: 4800,
  },
  {
    id: "prod-013",
    title: "Safia Jacquard Gold Weave Peshwas",
    slug: "safia-jacquard-gold-weave-peshwas",
    tagline: "Opulent Metallic Jacquard with Flared Ghera & Embellished Net Dupatta",
    description: "Designed for grand festive entrances. Woven with pure metallic zari threads creating intricate floral jaal motifs across 18 kaliyan. The look is complete with a heavy zardozi yoke.",
    fabric: "Woven Banarsi Brocade Jacquard with Pure Organza Dupatta",
    careInstructions: "Dry clean only. Do not iron directly on zari.",
    price: 26500,
    compareAtPrice: 29500,
    sku: "ALZ-EST-013",
    category: "eastern-wear",
    categoryLabel: "Eastern Wear",
    collection: "Festive Silk & Organza '26",
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80"
    ],
    availableSizes: ["S", "M", "L", "XL"],
    availableColors: [
      { name: "Gold Ochre", hex: "#C5A880" },
      { name: "Deep Maroon", hex: "#551A24" }
    ],
    variants: [
      { id: "v-013-1", size: "S", colorName: "Gold Ochre", colorHex: "#C5A880", stock: 5, sku: "ALZ-EST-013-S-GO" },
      { id: "v-013-2", size: "M", colorName: "Gold Ochre", colorHex: "#C5A880", stock: 8, sku: "ALZ-EST-013-M-GO" },
      { id: "v-013-3", size: "L", colorName: "Gold Ochre", colorHex: "#C5A880", stock: 4, sku: "ALZ-EST-013-L-GO" },
      { id: "v-013-4", size: "XL", colorName: "Gold Ochre", colorHex: "#C5A880", stock: 2, sku: "ALZ-EST-013-XL-GO" }
    ],
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isSeasonal: true,
    rating: 4.9,
    reviewCount: 39,
    createdAt: "2026-08-01",
    costPrice: 14500,
  },
  {
    id: "prod-014",
    title: "Layla Satin Bias-Cut Slip Dress",
    slug: "layla-satin-bias-cut-slip-dress",
    tagline: "Heavy Liquid Silk Satin with Cowl Neck & Low Back",
    description: "Flowing gracefully along the natural contours of the body. Tailored on the true bias from heavy grade satin silk, featuring delicate adjustable spaghetti straps and French seams.",
    fabric: "Heavyweight Liquid Viscose Silk Satin",
    careInstructions: "Hand wash cold inside out. Hang dry away from direct sunlight.",
    price: 10500,
    compareAtPrice: 12000,
    sku: "ALZ-DRS-014",
    category: "dresses",
    categoryLabel: "Dresses",
    collection: "Modern Prêt Everyday",
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80"
    ],
    availableSizes: ["XS", "S", "M", "L"],
    availableColors: [
      { name: "Champagne Ivory", hex: "#FAF8F4" },
      { name: "Cocoa Bronze", hex: "#55443B" }
    ],
    variants: [
      { id: "v-014-1", size: "XS", colorName: "Champagne Ivory", colorHex: "#FAF8F4", stock: 7, sku: "ALZ-DRS-014-XS-CI" },
      { id: "v-014-2", size: "S", colorName: "Champagne Ivory", colorHex: "#FAF8F4", stock: 16, sku: "ALZ-DRS-014-S-CI" },
      { id: "v-014-3", size: "M", colorName: "Champagne Ivory", colorHex: "#FAF8F4", stock: 10, sku: "ALZ-DRS-014-M-CI" },
      { id: "v-014-4", size: "L", colorName: "Champagne Ivory", colorHex: "#FAF8F4", stock: 5, sku: "ALZ-DRS-014-L-CI" }
    ],
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    isSeasonal: false,
    rating: 4.8,
    reviewCount: 18,
    createdAt: "2026-10-15",
    costPrice: 5100,
  },
  {
    id: "prod-015",
    title: "Kashmiri Pamban Pashmina Shawl",
    slug: "kashmiri-pamban-pashmina-shawl",
    tagline: "100% Himalayan Cashmere Handwoven with Sozni Needlework",
    description: "An investment piece of enduring warmth and grace. Pure Changthangi grade-A cashmere hand-spun and adorned with traditional Sozni needlework across all four borders.",
    fabric: "100% Certified Himalayan Cashmere Pashmina",
    careInstructions: "Dry clean only. Store with natural cedar wood blocks to deter moths.",
    price: 22000,
    compareAtPrice: 26000,
    sku: "ALZ-SCF-015",
    category: "scarves",
    categoryLabel: "Scarves",
    collection: "Silk Scarves & Wraps",
    images: [
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1000&q=80"
    ],
    availableSizes: ["One Size"],
    availableColors: [
      { name: "Natural Ecru", hex: "#EDE5DA" },
      { name: "Midnight Charcoal", hex: "#252321" }
    ],
    variants: [
      { id: "v-015-1", size: "One Size", colorName: "Natural Ecru", colorHex: "#EDE5DA", stock: 7, sku: "ALZ-SCF-015-OS-NE" },
      { id: "v-015-2", size: "One Size", colorName: "Midnight Charcoal", colorHex: "#252321", stock: 5, sku: "ALZ-SCF-015-OS-MC" }
    ],
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isSeasonal: true,
    rating: 5.0,
    reviewCount: 31,
    createdAt: "2026-09-01",
    costPrice: 12500,
  },
  {
    id: "prod-016",
    title: "Palermo Quilted Woven Crossbody Bag",
    slug: "palermo-quilted-woven-crossbody-bag",
    tagline: "Hand-Interlaced Vegan Nappa Leather with Polished Gold Chain",
    description: "Compact yet spacious. Hand-woven intrecciato weave crafted from ultra-soft supple vegan leather with custom gold-finished hardware, magnetic flap closure, and zippered interior pocket.",
    fabric: "Premium Ultra-Supple Microfibre Vegan Leather",
    careInstructions: "Wipe with damp microfiber cloth. Keep away from solvent based liquids.",
    price: 8490,
    compareAtPrice: 9900,
    sku: "ALZ-BAG-016",
    category: "handbags",
    categoryLabel: "Handbags",
    collection: "Leathergoods Capsule",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80"
    ],
    availableSizes: ["One Size"],
    availableColors: [
      { name: "Creamy Beige", hex: "#EDE5DA" },
      { name: "Dark Taupe", hex: "#55443B" }
    ],
    variants: [
      { id: "v-016-1", size: "One Size", colorName: "Creamy Beige", colorHex: "#EDE5DA", stock: 16, sku: "ALZ-BAG-016-OS-CB" },
      { id: "v-016-2", size: "One Size", colorName: "Dark Taupe", colorHex: "#55443B", stock: 11, sku: "ALZ-BAG-016-OS-DT" }
    ],
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: true,
    isSeasonal: false,
    rating: 4.8,
    reviewCount: 28,
    createdAt: "2026-10-20",
    costPrice: 4100,
  },
  {
    id: "prod-017",
    title: "Meena Chandbali Polki Earrings",
    slug: "meena-chandbali-polki-earrings",
    tagline: "Traditional Meenakari Enameling with Clustered Seed Pearls",
    description: "Statement crescent earrings celebrating Mughal craftsmanship. Features reverse pastel meenakari enamel, uncut polki glass stones, and a cascade of tiny freshwater baroque pearls.",
    fabric: "Silver-Alloy with 22K Micro Gold Plating & Hand Enamel",
    careInstructions: "Store individually in soft cotton velvet box.",
    price: 6850,
    compareAtPrice: 7800,
    sku: "ALZ-JWL-017",
    category: "jewelry",
    categoryLabel: "Jewelry",
    collection: "Heritage Jewels",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80"
    ],
    availableSizes: ["One Size"],
    availableColors: [
      { name: "Gold Rose", hex: "#C69B98" }
    ],
    variants: [
      { id: "v-017-1", size: "One Size", colorName: "Gold Rose", colorHex: "#C69B98", stock: 19, sku: "ALZ-JWL-017-OS-GR" }
    ],
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    isSeasonal: true,
    rating: 4.9,
    reviewCount: 21,
    createdAt: "2026-10-05",
    costPrice: 3200,
  },
  {
    id: "prod-018",
    title: "Roya Monochrome Embroidered Lawn Suit",
    slug: "roya-monochrome-embroidered-lawn-suit",
    tagline: "Pure 80s Combed Lawn with Heavy Schiffli Embroidered Voile Dupatta",
    description: "Our signature 3-piece daily luxury suit. Features intricate monochrome thread embroidery over fine lawn, matching cotton cambric trousers, and a lightweight printed chiffon dupatta.",
    fabric: "80s Supima Combed Lawn with Pure Cotton Cambric Trousers",
    careInstructions: "Machine wash gentle cycle cold. Iron at moderate heat.",
    price: 7950,
    sku: "ALZ-CAS-018",
    category: "casual-wear",
    categoryLabel: "Casual Wear",
    collection: "Lawn Reverie '26",
    images: [
      "https://images.unsplash.com/photo-1574015974293-817f0ebebb74?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=1000&q=80"
    ],
    availableSizes: ["XS", "S", "M", "L", "XL"],
    availableColors: [
      { name: "Black & Ivory", hex: "#252321" },
      { name: "Mocha Beige", hex: "#EDE5DA" }
    ],
    variants: [
      { id: "v-018-1", size: "XS", colorName: "Black & Ivory", colorHex: "#252321", stock: 9, sku: "ALZ-CAS-018-XS-BI" },
      { id: "v-018-2", size: "S", colorName: "Black & Ivory", colorHex: "#252321", stock: 24, sku: "ALZ-CAS-018-S-BI" },
      { id: "v-018-3", size: "M", colorName: "Black & Ivory", colorHex: "#252321", stock: 19, sku: "ALZ-CAS-018-M-BI" },
      { id: "v-018-4", size: "L", colorName: "Black & Ivory", colorHex: "#252321", stock: 12, sku: "ALZ-CAS-018-L-BI" },
      { id: "v-018-5", size: "XL", colorName: "Black & Ivory", colorHex: "#252321", stock: 6, sku: "ALZ-CAS-018-XL-BI" }
    ],
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isSeasonal: false,
    rating: 4.8,
    reviewCount: 51,
    createdAt: "2026-08-20",
    costPrice: 3900,
  },
  {
    id: "prod-019",
    title: "Samaa Pleated Organza Tunic & Pant Set",
    slug: "samaa-pleated-organza-tunic-pant-set",
    tagline: "Airy Micro-Pleating with Pearl Button Embellishments",
    description: "An effortless statement ensemble. Flattering accordion pleating structured through sheer crisp organza over a tonal crepe slip. Accompanied by straight cropped trousers.",
    fabric: "Korean Micro-Pleated Sheer Organza with Poly-Crepe Inner",
    careInstructions: "Do not iron pleats directly. Steam vertically from 6 inches away.",
    price: 13800,
    sku: "ALZ-CRD-019",
    category: "co-ord-sets",
    categoryLabel: "Co-Ord Sets",
    collection: "Modern Prêt Everyday",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80"
    ],
    availableSizes: ["XS", "S", "M", "L"],
    availableColors: [
      { name: "Powder Blush", hex: "#C69B98" },
      { name: "Pale Mint", hex: "#B8C9BD" }
    ],
    variants: [
      { id: "v-019-1", size: "XS", colorName: "Powder Blush", colorHex: "#C69B98", stock: 5, sku: "ALZ-CRD-019-XS-PB" },
      { id: "v-019-2", size: "S", colorName: "Powder Blush", colorHex: "#C69B98", stock: 11, sku: "ALZ-CRD-019-S-PB" },
      { id: "v-019-3", size: "M", colorName: "Powder Blush", colorHex: "#C69B98", stock: 9, sku: "ALZ-CRD-019-M-PB" },
      { id: "v-019-4", size: "L", colorName: "Powder Blush", colorHex: "#C69B98", stock: 4, sku: "ALZ-CRD-019-L-PB" }
    ],
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    isSeasonal: true,
    rating: 4.7,
    reviewCount: 17,
    createdAt: "2026-10-30",
    costPrice: 6900,
  },
  {
    id: "prod-020",
    title: "Zehba Hand-Embellished Angrakha Frock",
    slug: "zehba-hand-embellished-angrakha-frock",
    tagline: "Timeless Mughal Angrakha with Dori Tassels & Gotta Patti Details",
    description: "An authentic regal heirloom silhouette. Hand-embroidered gotta patti and gota kinari borders across the diagonal overlap, paired with crushed cotton sharara pants and a gold tissue dupatta.",
    fabric: "Pure Katan Silk Shirt with Crinkled Cotton Sharara",
    careInstructions: "Dry clean only. Hang on padded hangers.",
    price: 23500,
    compareAtPrice: 26000,
    sku: "ALZ-EST-020",
    category: "eastern-wear",
    categoryLabel: "Eastern Wear",
    collection: "Festive Silk & Organza '26",
    images: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80"
    ],
    availableSizes: ["S", "M", "L"],
    availableColors: [
      { name: "Mustard Gold", hex: "#C5A880" },
      { name: "Rose Quartz", hex: "#C69B98" }
    ],
    variants: [
      { id: "v-020-1", size: "S", colorName: "Mustard Gold", colorHex: "#C5A880", stock: 6, sku: "ALZ-EST-020-S-MG" },
      { id: "v-020-2", size: "M", colorName: "Mustard Gold", colorHex: "#C5A880", stock: 10, sku: "ALZ-EST-020-M-MG" },
      { id: "v-020-3", size: "L", colorName: "Mustard Gold", colorHex: "#C5A880", stock: 3, sku: "ALZ-EST-020-L-MG" }
    ],
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isSeasonal: true,
    rating: 4.9,
    reviewCount: 36,
    createdAt: "2026-09-18",
    costPrice: 12800,
  }
];

export const SEED_CUSTOMERS: Customer[] = [
  {
    id: "cust-001",
    name: "Ayesha Malik",
    email: "ayesha.malik@gmail.com",
    phone: "+92 300 8491023",
    city: "Lahore",
    province: "Punjab",
    totalOrders: 6,
    totalSpent: 114500,
    ltv: 114500,
    segment: "VIP",
    firstOrderDate: "2026-03-14",
    lastPurchaseDate: "2026-11-05",
    orderIds: ["ord-1001", "ord-1008"]
  },
  {
    id: "cust-002",
    name: "Zainab Farooq",
    email: "zainab.farooq92@yahoo.com",
    phone: "+92 321 4455891",
    city: "Karachi",
    province: "Sindh",
    totalOrders: 4,
    totalSpent: 68900,
    ltv: 68900,
    segment: "Loyal",
    firstOrderDate: "2026-05-22",
    lastPurchaseDate: "2026-11-02",
    orderIds: ["ord-1002"]
  },
  {
    id: "cust-003",
    name: "Dr. Mahnoor Tariq",
    email: "mahnoor.tariq@outlook.com",
    phone: "+92 333 5188234",
    city: "Islamabad",
    province: "Islamabad Capital Territory",
    totalOrders: 5,
    totalSpent: 92400,
    ltv: 92400,
    segment: "VIP",
    firstOrderDate: "2026-04-10",
    lastPurchaseDate: "2026-10-29",
    orderIds: ["ord-1003"]
  },
  {
    id: "cust-004",
    name: "Sana Chaudhry",
    email: "sana.chaudhry@gmail.com",
    phone: "+92 312 9901422",
    city: "Faisalabad",
    province: "Punjab",
    totalOrders: 2,
    totalSpent: 26900,
    ltv: 26900,
    segment: "Loyal",
    firstOrderDate: "2026-08-11",
    lastPurchaseDate: "2026-10-18",
    orderIds: ["ord-1004"]
  },
  {
    id: "cust-005",
    name: "Mariam Abbasi",
    email: "mariam.abbasi@gmail.com",
    phone: "+92 345 8823901",
    city: "Rawalpindi",
    province: "Punjab",
    totalOrders: 1,
    totalSpent: 18500,
    ltv: 18500,
    segment: "New",
    firstOrderDate: "2026-11-12",
    lastPurchaseDate: "2026-11-12",
    orderIds: ["ord-1005"]
  },
  {
    id: "cust-006",
    name: "Fatima Noor",
    email: "fatima.noor88@gmail.com",
    phone: "+92 301 7733490",
    city: "Multan",
    province: "Punjab",
    totalOrders: 3,
    totalSpent: 38200,
    ltv: 38200,
    segment: "Loyal",
    firstOrderDate: "2026-06-19",
    lastPurchaseDate: "2026-10-04",
    orderIds: ["ord-1006"]
  },
  {
    id: "cust-007",
    name: "Hiba Khan",
    email: "hiba.khan@hotmail.com",
    phone: "+92 334 9110294",
    city: "Peshawar",
    province: "Khyber Pakhtunkhwa",
    totalOrders: 2,
    totalSpent: 30450,
    ltv: 30450,
    segment: "Loyal",
    firstOrderDate: "2026-07-02",
    lastPurchaseDate: "2026-09-24",
    orderIds: ["ord-1007"]
  }
];

export const SEED_ORDERS: Order[] = [
  {
    id: "ord-1001",
    orderNumber: "ALZ-94821",
    date: "2026-11-15T14:30:00Z",
    status: "processing",
    customer: {
      fullName: "Ayesha Malik",
      email: "ayesha.malik@gmail.com",
      phone: "+92 300 8491023",
      province: "Punjab",
      city: "Lahore",
      address: "House 42, Street 8, Sector Y, Phase 3, DHA",
      postalCode: "54792",
      notes: "Please call before delivery. Gate code #1294."
    },
    items: [
      {
        id: "item-101",
        productId: "prod-001",
        productSlug: "gul-e-noor-embroidered-raw-silk-kalidar",
        title: "Gul-e-Noor Embroidered Raw Silk Kalidar",
        price: 24950,
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
        size: "M",
        color: "Ivory Gold",
        quantity: 1,
        maxStock: 9
      },
      {
        id: "item-102",
        productId: "prod-009",
        productSlug: "silk-twill-heritage-paisley-scarf",
        title: "Silk Twill Heritage Paisley Scarf",
        price: 4950,
        image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=600&q=80",
        size: "One Size",
        color: "Terracotta Rose",
        quantity: 1,
        maxStock: 25
      }
    ],
    subtotal: 29900,
    discount: 2990,
    couponCode: "ALEYZA10",
    shipping: 0,
    total: 26910,
    costTotal: 15300,
    paymentMethod: "bank_transfer",
    paymentStatus: "paid",
    paymentDetails: {
      bankName: "Meezan Bank Ltd",
      transactionRef: "MEZN-948201948"
    },
    trackingNumber: "TCS-901481029",
    courier: "TCS Express",
    timeline: [
      { status: "pending", timestamp: "2026-11-15T14:30:00Z", note: "Order placed online via Bank Transfer" },
      { status: "confirmed", timestamp: "2026-11-15T15:10:00Z", note: "Bank payment verified by Accounts Dept." },
      { status: "processing", timestamp: "2026-11-16T09:00:00Z", note: "Order dispatched to Lahore Atelier packaging team." }
    ]
  },
  {
    id: "ord-1002",
    orderNumber: "ALZ-94822",
    date: "2026-11-14T18:15:00Z",
    status: "shipped",
    customer: {
      fullName: "Zainab Farooq",
      email: "zainab.farooq92@yahoo.com",
      phone: "+92 321 4455891",
      province: "Sindh",
      city: "Karachi",
      address: "Apartment 7-B, Creek Vistas, Phase 8, DHA",
      postalCode: "75500"
    },
    items: [
      {
        id: "item-103",
        productId: "prod-002",
        productSlug: "mehr-un-nisa-midnight-velvet-kurta-set",
        title: "Mehr-un-Nisa Midnight Velvet Kurta Set",
        price: 21500,
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80",
        size: "M",
        color: "Midnight Charcoal",
        quantity: 1,
        maxStock: 15
      }
    ],
    subtotal: 21500,
    discount: 0,
    shipping: 0,
    total: 21500,
    costTotal: 11000,
    paymentMethod: "cod",
    paymentStatus: "pending",
    trackingNumber: "LEO-771920412",
    courier: "Leopards Courier",
    timeline: [
      { status: "pending", timestamp: "2026-11-14T18:15:00Z", note: "Order placed with Cash on Delivery (COD)" },
      { status: "confirmed", timestamp: "2026-11-14T19:00:00Z", note: "Order confirmed by customer via WhatsApp OTP" },
      { status: "processing", timestamp: "2026-11-15T10:30:00Z", note: "Packed in premium luxury ribbon box" },
      { status: "shipped", timestamp: "2026-11-16T11:00:00Z", note: "Handed over to Leopards Courier Karachi Hub" }
    ]
  },
  {
    id: "ord-1003",
    orderNumber: "ALZ-94823",
    date: "2026-11-13T11:45:00Z",
    status: "delivered",
    customer: {
      fullName: "Dr. Mahnoor Tariq",
      email: "mahnoor.tariq@outlook.com",
      phone: "+92 333 5188234",
      province: "Islamabad Capital Territory",
      city: "Islamabad",
      address: "House 18, Street 29, Sector F-7/2",
      postalCode: "44000"
    },
    items: [
      {
        id: "item-104",
        productId: "prod-007",
        productSlug: "le-marais-structured-leather-top-handle-bag",
        title: "Le Marais Structured Leather Top-Handle Bag",
        price: 15800,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
        size: "One Size",
        color: "Deep Brown",
        quantity: 1,
        maxStock: 14
      },
      {
        id: "item-105",
        productId: "prod-003",
        productSlug: "zehra-minimalist-linen-co-ord-set",
        title: "Zehra Minimalist Linen Co-Ord Set",
        price: 8950,
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80",
        size: "S",
        color: "Muted Rose",
        quantity: 1,
        maxStock: 18
      }
    ],
    subtotal: 24750,
    discount: 2475,
    couponCode: "WELCOMEVIP",
    shipping: 0,
    total: 22275,
    costTotal: 12000,
    paymentMethod: "easypaisa",
    paymentStatus: "paid",
    paymentDetails: {
      transactionRef: "EP-8819201934"
    },
    trackingNumber: "TCS-901411200",
    courier: "TCS Express",
    timeline: [
      { status: "pending", timestamp: "2026-11-13T11:45:00Z", note: "Order placed via Easypaisa mobile wallet" },
      { status: "confirmed", timestamp: "2026-11-13T11:50:00Z", note: "Payment automatically confirmed by Easypaisa API" },
      { status: "shipped", timestamp: "2026-11-14T09:20:00Z", note: "Shipped from Islamabad central dispatch" },
      { status: "delivered", timestamp: "2026-11-15T16:00:00Z", note: "Successfully received by Dr. Mahnoor Tariq" }
    ]
  },
  {
    id: "ord-1004",
    orderNumber: "ALZ-94824",
    date: "2026-11-16T09:20:00Z",
    status: "pending",
    customer: {
      fullName: "Sana Chaudhry",
      email: "sana.chaudhry@gmail.com",
      phone: "+92 312 9901422",
      province: "Punjab",
      city: "Faisalabad",
      address: "House 112, Susan Road, Madina Town",
      postalCode: "38000"
    },
    items: [
      {
        id: "item-106",
        productId: "prod-005",
        productSlug: "afreen-hand-embroidered-chikankari-kurti",
        title: "Afreen Hand-Embroidered Chikankari Kurti",
        price: 6490,
        image: "https://images.unsplash.com/photo-1574015974293-817f0ebebb74?auto=format&fit=crop&w=600&q=80",
        size: "M",
        color: "Pristine White",
        quantity: 1,
        maxStock: 18
      }
    ],
    subtotal: 6490,
    discount: 0,
    shipping: 250,
    total: 6740,
    costTotal: 2800,
    paymentMethod: "cod",
    paymentStatus: "pending",
    timeline: [
      { status: "pending", timestamp: "2026-11-16T09:20:00Z", note: "Order placed. Awaiting customer confirmation phone call." }
    ]
  },
  {
    id: "ord-1005",
    orderNumber: "ALZ-94825",
    date: "2026-11-16T12:00:00Z",
    status: "confirmed",
    customer: {
      fullName: "Mariam Abbasi",
      email: "mariam.abbasi@gmail.com",
      phone: "+92 345 8823901",
      province: "Punjab",
      city: "Rawalpindi",
      address: "Plot 89, Bahria Town Phase 7",
      postalCode: "46000"
    },
    items: [
      {
        id: "item-107",
        productId: "prod-006",
        productSlug: "soraia-tailored-double-breasted-blazer-trouser",
        title: "Soraia Tailored Double-Breasted Blazer & Trouser",
        price: 18500,
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80",
        size: "M",
        color: "Biscuit Sand",
        quantity: 1,
        maxStock: 11
      }
    ],
    subtotal: 18500,
    discount: 0,
    shipping: 0,
    total: 18500,
    costTotal: 9500,
    paymentMethod: "jazzcash",
    paymentStatus: "paid",
    paymentDetails: {
      transactionRef: "JC-992100418"
    },
    timeline: [
      { status: "pending", timestamp: "2026-11-16T12:00:00Z", note: "Order placed via JazzCash online gateway" },
      { status: "confirmed", timestamp: "2026-11-16T12:05:00Z", note: "JazzCash payment verified instantly" }
    ]
  }
];

export const SEED_COUPONS: Coupon[] = [
  {
    code: "ALEYZA10",
    discountType: "percentage",
    value: 10,
    minOrderAmount: 5000,
    expiryDate: "2026-12-31",
    usageLimit: 500,
    usageCount: 142,
    isActive: true,
    description: "10% off on all luxury prêt & unstitched collections above Rs. 5,000"
  },
  {
    code: "WELCOMEVIP",
    discountType: "percentage",
    value: 15,
    minOrderAmount: 8000,
    expiryDate: "2026-12-31",
    usageLimit: 300,
    usageCount: 89,
    isActive: true,
    description: "Welcome privilege of 15% off for first-time email subscribers"
  },
  {
    code: "FLAT1500",
    discountType: "fixed",
    value: 1500,
    minOrderAmount: 15000,
    expiryDate: "2026-12-15",
    usageLimit: 200,
    usageCount: 54,
    isActive: true,
    description: "Flat Rs. 1,500 privilege voucher on high-value formal & wedding wear"
  },
  {
    code: "EIDGLAM",
    discountType: "percentage",
    value: 20,
    minOrderAmount: 10000,
    expiryDate: "2026-06-30",
    usageLimit: 400,
    usageCount: 382,
    isActive: false,
    description: "Festive Eid privilege voucher (Expired seasonal promo)"
  }
];

export const SEED_MARKETING_CAMPAIGNS: MarketingCampaign[] = [
  {
    id: "camp-001",
    name: "Festive Silk & Velvet Soirée '26 — Conversion Advantage+",
    channel: "meta",
    channelLabel: "Meta Ads (IG & FB)",
    objective: "Sales / Purchases",
    status: "active",
    budgetDaily: 8500,
    totalSpend: 142500,
    impressions: 489200,
    clicks: 14680,
    ctr: 3.0,
    cpc: 9.7,
    cpm: 291.2,
    purchases: 84,
    revenue: 698200,
    roas: 4.9,
    costPerPurchase: 1696,
    startDate: "2026-10-15"
  },
  {
    id: "camp-002",
    name: "Modern Prêt Co-Ords & Everyday Linen — Reels Catalog",
    channel: "meta",
    channelLabel: "Meta Ads (IG & FB)",
    objective: "Sales / Purchases",
    status: "active",
    budgetDaily: 5000,
    totalSpend: 82000,
    impressions: 312000,
    clicks: 11200,
    ctr: 3.59,
    cpc: 7.3,
    cpm: 262.8,
    purchases: 62,
    revenue: 341000,
    roas: 4.16,
    costPerPurchase: 1322,
    startDate: "2026-10-20"
  },
  {
    id: "camp-003",
    name: "Google Performance Max — High-Intent Pakistani Fashion",
    channel: "google",
    channelLabel: "Google Ads",
    objective: "Sales / Purchases",
    status: "active",
    budgetDaily: 6000,
    totalSpend: 96000,
    impressions: 210400,
    clicks: 8900,
    ctr: 4.23,
    cpc: 10.78,
    cpm: 456.2,
    purchases: 51,
    revenue: 412800,
    roas: 4.3,
    costPerPurchase: 1882,
    startDate: "2026-10-01"
  },
  {
    id: "camp-004",
    name: "Brand Search Protect — 'Aleyza Store' Exact Match",
    channel: "google",
    channelLabel: "Google Ads",
    objective: "Traffic / Clicks",
    status: "active",
    budgetDaily: 2000,
    totalSpend: 31000,
    impressions: 54000,
    clicks: 6480,
    ctr: 12.0,
    cpc: 4.78,
    cpm: 574.0,
    purchases: 39,
    revenue: 289400,
    roas: 9.33,
    costPerPurchase: 795,
    startDate: "2026-09-01"
  },
  {
    id: "camp-005",
    name: "Lahore & Karachi Top Fashion Influencers Collab Boost",
    channel: "influencer",
    channelLabel: "Influencer / Social",
    objective: "Brand Awareness",
    status: "completed",
    budgetDaily: 0,
    totalSpend: 75000,
    impressions: 620000,
    clicks: 18500,
    ctr: 2.98,
    cpc: 4.05,
    cpm: 120.9,
    purchases: 45,
    revenue: 310500,
    roas: 4.14,
    costPerPurchase: 1667,
    startDate: "2026-09-15",
    endDate: "2026-10-15"
  },
  {
    id: "camp-006",
    name: "TikTok Spark Ads — Gen-Z Kurtis & Western Wear",
    channel: "tiktok",
    channelLabel: "TikTok Ads",
    objective: "Traffic / Clicks",
    status: "paused",
    budgetDaily: 3000,
    totalSpend: 36000,
    impressions: 290000,
    clicks: 7250,
    ctr: 2.5,
    cpc: 4.96,
    cpm: 124.1,
    purchases: 14,
    revenue: 78400,
    roas: 2.18,
    costPerPurchase: 2571,
    startDate: "2026-10-10",
    endDate: "2026-10-22"
  }
];

export const SEED_META_AD_SETS: MetaAdSet[] = [
  {
    id: "adset-01",
    campaignId: "camp-001",
    name: "Women 22-45 | Lahore, Karachi, Islamabad | Luxury Fashion & Eid Shoppers",
    targeting: "Lahore, Karachi, Islamabad, Rawalpindi | Women 22-45 | Interests: Luxury goods, Designer clothing, Chiffon, Khaadi, Maria B",
    budget: 5000,
    spend: 88500,
    impressions: 304000,
    clicks: 9400,
    ctr: 3.09,
    purchases: 54,
    revenue: 448200,
    roas: 5.06,
    status: "active"
  },
  {
    id: "adset-02",
    campaignId: "camp-001",
    name: "Retargeting: 30-Day Website Visitors & Add To Cart Abandoners",
    targeting: "All Pakistan | Custom Audience: ViewContent 30D + AddToCart 14D (Exclude 30D Purchasers)",
    budget: 3500,
    spend: 54000,
    impressions: 185200,
    clicks: 5280,
    ctr: 2.85,
    purchases: 30,
    revenue: 250000,
    roas: 4.63,
    status: "active"
  }
];

export const SEED_META_ADS: MetaAdItem[] = [
  {
    id: "ad-001",
    adSetId: "adset-01",
    name: "Video Reel: Gul-e-Noor Silk Flow & Artisan Zari Closeups",
    format: "Video Reel",
    creativeTitle: "Drape Yourself in Pure Raw Silk Luxury — Shop Gul-e-Noor",
    thumbnailUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    spend: 48000,
    impressions: 168000,
    clicks: 5320,
    purchases: 32,
    revenue: 274000,
    roas: 5.71,
    status: "active"
  },
  {
    id: "ad-002",
    adSetId: "adset-01",
    name: "Carousel: Velvet Soirée '26 Micro 9000 Highlights",
    format: "Carousel",
    creativeTitle: "Opulent Velvet for Festive Evenings — Explore Collection",
    thumbnailUrl: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80",
    spend: 40500,
    impressions: 136000,
    clicks: 4080,
    purchases: 22,
    revenue: 174200,
    roas: 4.3,
    status: "active"
  }
];

export const SEED_TRAFFIC_SOURCES: TrafficSource[] = [
  {
    channel: "Paid Social (Meta Ads)",
    sessions: 25880,
    users: 18900,
    orders: 146,
    revenue: 1039200,
    conversionRate: 0.56,
    aov: 7117,
    firstTouchShare: 44.5,
    lastTouchShare: 38.2
  },
  {
    channel: "Paid Search (Google Ads)",
    sessions: 15380,
    users: 11200,
    orders: 90,
    revenue: 702200,
    conversionRate: 0.58,
    aov: 7802,
    firstTouchShare: 24.2,
    lastTouchShare: 26.8
  },
  {
    channel: "Organic Search (Google)",
    sessions: 18450,
    users: 13400,
    orders: 78,
    revenue: 524000,
    conversionRate: 0.42,
    aov: 6718,
    firstTouchShare: 16.4,
    lastTouchShare: 19.5
  },
  {
    channel: "Direct Traffic",
    sessions: 9200,
    users: 6800,
    orders: 48,
    revenue: 338000,
    conversionRate: 0.52,
    aov: 7041,
    firstTouchShare: 7.2,
    lastTouchShare: 9.8
  },
  {
    channel: "Email Marketing / VIP Club",
    sessions: 3400,
    users: 2450,
    orders: 28,
    revenue: 204500,
    conversionRate: 0.82,
    aov: 7303,
    firstTouchShare: 4.1,
    lastTouchShare: 3.5
  },
  {
    channel: "Influencer / Referral",
    sessions: 4120,
    users: 3100,
    orders: 22,
    revenue: 158200,
    conversionRate: 0.53,
    aov: 7190,
    firstTouchShare: 3.6,
    lastTouchShare: 2.2
  }
];

export const SEED_TRACKING_CONFIG: TrackingConfig = {
  metaPixelId: "789102948102948",
  metaAccessToken: "EAAJ29...[SERVER_SIDE_SECURE_TOKEN_ENCRYPTED]",
  metaTestEventCode: "TEST89421",
  metaCapiEnabled: true,
  ga4MeasurementId: "G-ALZ881024",
  gtmContainerId: "GTM-ALZ9210",
  googleAdsConversionId: "AW-1092849102",
  googleAdsEnhancedConversions: true,
  status: {
    metaPixel: true,
    metaCapi: true,
    ga4: true,
    gtm: true,
    googleAds: true
  }
};

export const SEED_TRACKING_EVENTS: TrackingLogEvent[] = [
  {
    id: "evt-001",
    timestamp: "2026-11-17T15:20:12Z",
    eventName: "PageView",
    source: "Client (Browser Pixel)",
    deduplicationEventId: "pg-home-884910",
    payload: { content_name: "Aleyza Store - Luxury Pakistani Fashion" },
    status: "dispatched"
  },
  {
    id: "evt-002",
    timestamp: "2026-11-17T15:21:40Z",
    eventName: "ViewContent",
    source: "Client (Browser Pixel)",
    deduplicationEventId: "vc-prod-001-9481",
    payload: {
      content_name: "Gul-e-Noor Embroidered Raw Silk Kalidar",
      content_category: "Eastern Wear",
      value: 24950,
      currency: "PKR"
    },
    status: "dispatched"
  },
  {
    id: "evt-003",
    timestamp: "2026-11-17T15:22:04Z",
    eventName: "AddToCart",
    source: "Client (Browser Pixel)",
    deduplicationEventId: "atc-prod-001-9481",
    payload: {
      content_name: "Gul-e-Noor Embroidered Raw Silk Kalidar",
      value: 24950,
      currency: "PKR"
    },
    status: "dispatched"
  },
  {
    id: "evt-004",
    timestamp: "2026-11-17T15:23:10Z",
    eventName: "InitiateCheckout",
    source: "Client (Browser Pixel)",
    deduplicationEventId: "chk-sess-10294",
    payload: {
      value: 24950,
      currency: "PKR",
      num_items: 1
    },
    status: "dispatched"
  },
  {
    id: "evt-005",
    timestamp: "2026-11-17T15:25:30Z",
    eventName: "Purchase",
    source: "Server (Meta Conversions API / CAPI)",
    deduplicationEventId: "purch-ALZ-94821",
    payload: {
      order_id: "ALZ-94821",
      value: 26910,
      currency: "PKR",
      num_items: 2,
      user_email_hashed: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    },
    status: "processed"
  },
  {
    id: "evt-006",
    timestamp: "2026-11-17T15:25:31Z",
    eventName: "Purchase",
    source: "Client (Browser Pixel)",
    deduplicationEventId: "purch-ALZ-94821",
    payload: {
      order_id: "ALZ-94821",
      value: 26910,
      currency: "PKR",
      num_items: 2
    },
    status: "deduplicated"
  }
];

export const SEED_ANNOUNCEMENT: AnnouncementConfig = {
  text: "Complimentary Express Delivery Across Pakistan on All Orders Above Rs. 5,000 | Cash on Delivery Available",
  linkText: "Explore New Arrivals",
  linkUrl: "/shop?sort=newest",
  enabled: true
};

export const SEED_HERO: HeroConfig = {
  tagline: "WINTER FESTIVE COUTURE '26",
  headline: "Poetry in Pure Silk & Velvet",
  description: "An homage to imperial Pakistani craftsmanship reimagined with effortless contemporary silhouettes. Intricate zardozi embroidery, gossamer organza, and rich jewel tones.",
  primaryCtaText: "SHOP NEW ARRIVALS",
  primaryCtaLink: "/shop",
  secondaryCtaText: "EXPLORE LOOKBOOK",
  secondaryCtaLink: "/shop?category=eastern-wear",
  imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85"
};

export const SEED_PROMO_BANNER: PromoBannerConfig = {
  badge: "MID-SEASON LUXURY PRIVILEGE",
  title: "Indulge in 15% Off Your First Couture Order",
  subtitle: "Use code WELCOMEVIP at checkout. Valid across all luxury prêt, formal kalidars & handcrafted leather accessories.",
  couponCode: "WELCOMEVIP",
  expiryText: "Limited time privilege for discerning women.",
  imageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80",
  enabled: true
};

export const SEED_SUBSCRIBERS: Subscriber[] = [
  { id: "sub-1", email: "hira.nawaz@gmail.com", source: "Footer Newsletter", subscribedAt: "2026-11-10" },
  { id: "sub-2", email: "anoushey.iqbal@yahoo.com", source: "Checkout Opt-In", subscribedAt: "2026-11-12" },
  { id: "sub-3", email: "bushra.ansari@outlook.com", source: "Welcome Privilege Modal", subscribedAt: "2026-11-14" },
  { id: "sub-4", email: "kinza.hashmi@gmail.com", source: "VIP Club Banner", subscribedAt: "2026-11-16" }
];
