"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Heart,
  ChevronRight,
  CheckCircle2,
  Instagram,
  Star,
  Quote,
  Clock,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { ProductCard } from "@/components/product/ProductCard";
import { formatPKR } from "@/lib/utils";

export default function HomePage() {
  const { products, hero, promoBanner, subscribeNewsletter } = useStore();
  const [newsletterEmail, setNewsletterEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  // Categorized product slices
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);
  const trendingProducts = products
    .filter((p) => p.isTrending || p.isFeatured)
    .slice(0, 4);
  const festiveSilk = products
    .filter((p) => p.collection.includes("Festive Silk") || p.category === "eastern-wear")
    .slice(0, 4);
  const velvetEdition = products
    .filter((p) => p.collection.includes("Velvet") || p.category === "formal-wear")
    .slice(0, 3);

  const categories = [
    {
      name: "Eastern Wear",
      slug: "eastern-wear",
      count: "Kalidars & Peshwas",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Formal & Festive",
      slug: "formal-wear",
      count: "Velvet & Sarees",
      image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Co-Ord Sets",
      slug: "co-ord-sets",
      count: "Modern Slub Linen",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Kurtis & Tunics",
      slug: "kurtis",
      count: "Chikankari & Voile",
      image: "https://images.unsplash.com/photo-1574015974293-817f0ebebb74?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Western Wear",
      slug: "western-wear",
      count: "Tailored Suiting",
      image: "https://images.unsplash.com/photo-1548624149-f9b1859aa9d0?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Handbags & Bags",
      slug: "handbags",
      count: "Full-Grain Leather",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Heritage Jewelry",
      slug: "jewelry",
      count: "Kundan & Pearls",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Mulberry Silk & Wraps",
      slug: "scarves",
      count: "Pashmina Shawls",
      image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const testimonials = [
    {
      id: 1,
      quote:
        "The Gul-e-Noor raw silk kalidar I ordered for my sister's Baraat in Lahore was absolute perfection. The zari finishing and fall of the raw silk exceeded my expectations. Delivery arrived in 48 hours via TCS in immaculate luxury packaging.",
      author: "Dr. Mahnoor Tariq",
      city: "Islamabad",
      tier: "VIP Patron",
      verified: true,
      purchasedItem: "Gul-e-Noor Embroidered Raw Silk Kalidar",
    },
    {
      id: 2,
      quote:
        "Finally, a Pakistani fashion house that understands modest cuts without compromising high-fashion aesthetics. The linen co-ord sets breathe so well in Karachi's humidity. Ordered 3 colors already!",
      author: "Zainab Farooq",
      city: "Karachi",
      tier: "Loyal Patron",
      verified: true,
      purchasedItem: "Zehra Minimalist Linen Co-Ord Set",
    },
    {
      id: 3,
      quote:
        "The micro velvet embroidery is sensational. Deep rich charcoal tone, delicate scalloped borders, and comfortable lining. Customer support on WhatsApp answered my sizing questions within minutes.",
      author: "Ayesha Malik",
      city: "Lahore",
      tier: "VIP Patron",
      verified: true,
      purchasedItem: "Mehr-un-Nisa Midnight Velvet Kurta Set",
    },
  ];

  const instagramPosts = [
    {
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80",
      handle: "@aleyzastore",
      tag: "#AleyzaInLahore",
    },
    {
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80",
      handle: "@aleyzastore",
      tag: "#FestiveSilk26",
    },
    {
      image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80",
      handle: "@aleyzastore",
      tag: "#VelvetSoiree",
    },
    {
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80",
      handle: "@aleyzastore",
      tag: "#ModernPret",
    },
    {
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
      handle: "@aleyzastore",
      tag: "#LeatherAtelier",
    },
    {
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
      handle: "@aleyzastore",
      tag: "#PakistaniCouture",
    },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    const res = subscribeNewsletter(newsletterEmail, "Homepage VIP Banner");
    if (res.success) {
      setSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <div className="w-full">
      {/* 1. HERO CAMPAIGN SECTION */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-brand-charcoal text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src={hero.imageUrl}
            alt="Aleyza Store Haute Prêt Campaign"
            fill
            priority
            className="object-cover object-top opacity-55 scale-100 transition-transform duration-1000 ease-out hover:scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/40 to-black/30" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-rose text-xs uppercase tracking-[0.25em] font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{hero.tagline}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white mb-6 leading-[1.1]">
            {hero.headline}
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-brand-ivory/80 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            {hero.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={hero.primaryCtaLink || "/shop"}
              className="w-full sm:w-auto px-8 py-4 bg-brand-ivory text-brand-charcoal text-xs uppercase tracking-[0.2em] font-semibold hover:bg-brand-rose hover:text-white transition-all duration-300 rounded-sm shadow-subtle flex items-center justify-center gap-2 group"
            >
              <span>{hero.primaryCtaText || "SHOP NOW"}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href={hero.secondaryCtaLink || "/shop?category=eastern-wear"}
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/40 text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-white/10 hover:border-white transition-all duration-300 rounded-sm flex items-center justify-center gap-2"
            >
              <span>{hero.secondaryCtaText || "EXPLORE COLLECTION"}</span>
            </Link>
          </div>
        </div>

        {/* Floating Quick Feature Bar */}
        <div className="absolute bottom-4 inset-x-4 max-w-5xl mx-auto hidden lg:flex items-center justify-between px-8 py-3 rounded-sm bg-brand-charcoal/80 backdrop-blur-md border border-white/10 text-xs text-brand-ivory/80">
          <span className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-brand-rose" />
            Express TCS Delivery Across Pakistan
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-rose" />
            Cash on Delivery (COD) Available
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-rose" />
            Same-Day Dispatch for In-Stock Prêt
          </span>
        </div>
      </section>

      {/* 2. SHOP BY CATEGORY */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-[0.25em] text-brand-rose font-bold block mb-2">
            Curated Universes
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-charcoal font-medium">
            Shop by Category
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted mt-2">
            Explore our heirloom unstitched silks, contemporary tailoring, and handcrafted accessories.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className="group relative aspect-[3/4] rounded-sm overflow-hidden bg-brand-sand shadow-subtle border border-brand-border/60 hover:shadow-card transition-all duration-500"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-4 inset-x-4 text-white">
                <span className="text-[10px] uppercase tracking-wider text-brand-rose/90 font-medium block">
                  {cat.count}
                </span>
                <h3 className="font-serif text-base sm:text-lg font-medium tracking-wide group-hover:text-brand-rose transition-colors">
                  {cat.name}
                </h3>
                <span className="inline-flex items-center gap-1 text-[11px] text-white/70 group-hover:text-white mt-1 transition-colors">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. NEW ARRIVALS */}
      <section className="py-16 bg-white border-y border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-brand-border/60">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-brand-rose font-bold block mb-1">
                Just Unveiled
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-brand-charcoal font-medium">
                New Arrivals
              </h2>
            </div>
            <Link
              href="/shop?sort=newest"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-brand-charcoal hover:text-brand-rose transition-colors mt-3 sm:mt-0"
            >
              <span>View All New Pieces ({products.filter((p) => p.isNewArrival).length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. EDITORIAL FASHION CAMPAIGN LOOKBOOK */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-brand-sand/70 rounded-sm border border-brand-border p-6 sm:p-12 overflow-hidden">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-brand-rose font-bold block">
              Atelier Editorial • Chapter VII
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-brand-charcoal font-normal leading-[1.15]">
              The Velvet & Silk Soirée
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
              Designed for celebrations under moonlit pavilions. Handcrafted by multigenerational craftspeople in old Lahore, every stitch preserves the regal art of Marori and Zardozi embroidery, married with contemporary minimal silhouettes.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <Link
                href="/shop?category=formal-wear"
                className="px-6 py-3.5 bg-brand-charcoal text-white text-xs uppercase tracking-widest font-semibold hover:bg-brand-brown transition-colors rounded-sm inline-flex items-center justify-center gap-2"
              >
                <span>Shop The Campaign</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/about"
                className="px-6 py-3.5 border border-brand-charcoal text-brand-charcoal text-xs uppercase tracking-widest font-semibold hover:bg-brand-charcoal hover:text-white transition-colors rounded-sm inline-flex items-center justify-center"
              >
                <span>The Craft Story</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden shadow-card">
              <Image
                src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80"
                alt="Velvet Soiree Campaign 1"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 30vw"
              />
            </div>
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden shadow-card mt-8">
              <Image
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
                alt="Velvet Soiree Campaign 2"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 30vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. BEST SELLERS */}
      <section className="py-16 bg-white border-y border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-brand-border/60">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-brand-rose font-bold block mb-1">
                Most Cherished
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-brand-charcoal font-medium">
                Best Sellers
              </h2>
            </div>
            <Link
              href="/shop?sort=best-selling"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-brand-charcoal hover:text-brand-rose transition-colors mt-3 sm:mt-0"
            >
              <span>Explore All Favorites</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. SEASONAL FESTIVE COLLECTION SPOTLIGHT */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-[0.25em] text-brand-rose font-bold block mb-2">
            Festive Edit &apos;26
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-charcoal font-medium">
            Festive Silk &amp; Organza Collection
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted mt-2">
            Pure raw silk flared kalidars, banarsi brocade peshwas, and gotta patti details for weddings and soirees.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {festiveSilk.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. PROMOTIONAL BANNER */}
      {promoBanner.enabled && (
        <section className="py-12 bg-brand-charcoal text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-sm overflow-hidden bg-brand-brown/40 border border-white/10 p-8 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-xl text-center md:text-left">
                <span className="inline-block px-3 py-1 bg-brand-rose text-white text-[11px] uppercase font-bold tracking-widest rounded-sm">
                  {promoBanner.badge}
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl font-medium leading-tight">
                  {promoBanner.title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-ivory/80 leading-relaxed font-light">
                  {promoBanner.subtitle}
                </p>

                <div className="flex items-center gap-3 pt-2 justify-center md:justify-start">
                  <div className="px-4 py-2 border border-dashed border-brand-rose text-brand-rose font-mono text-sm font-bold rounded bg-black/30">
                    {promoBanner.couponCode}
                  </div>
                  <span className="text-xs text-brand-ivory/60 font-light">
                    {promoBanner.expiryText}
                  </span>
                </div>
              </div>

              <div className="shrink-0">
                <Link
                  href="/shop"
                  className="px-8 py-4 bg-brand-ivory text-brand-charcoal text-xs uppercase tracking-widest font-semibold hover:bg-brand-rose hover:text-white transition-colors rounded-sm inline-flex items-center gap-2 shadow-modal"
                >
                  <span>Redeem Privilege</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 8. TRENDING PRODUCTS */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-brand-border/60">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-brand-rose font-bold block mb-1">
              Currently Coveted
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-charcoal font-medium">
              Trending Right Now
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-brand-charcoal hover:text-brand-rose transition-colors mt-3 sm:mt-0"
          >
            <span>Explore All Trending</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 9. BRAND STORY & CRAFT HERITAGE */}
      <section className="py-20 bg-brand-sand/50 border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-card border border-brand-border">
              <Image
                src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80"
                alt="Aleyza Artisan Needlework"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="space-y-6">
              <span className="text-[11px] uppercase tracking-[0.25em] text-brand-rose font-bold block">
                The Aleyza Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-brand-charcoal font-medium leading-tight">
                Imperial Heritage. Contemporary Soul.
              </h2>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                Founded in Lahore, Aleyza Store was born from a desire to honour Pakistan’s illustrious textile traditions — delicate dabka, marori, resham threadwork, and hand-loomed brocades — while sculpting them into fluid, comfortable silhouettes for the modern woman.
              </p>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                We work directly with master craftspeople across Punjab and Sindh, ensuring ethical remuneration, fair atelier working conditions, and the preservation of heirloom needlework techniques passed down through centuries.
              </p>

              <div className="pt-4 grid grid-cols-3 gap-6 border-t border-brand-border text-center sm:text-left">
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal">
                    100%
                  </p>
                  <p className="text-[11px] uppercase tracking-wider text-brand-muted mt-1">
                    Pure Silks &amp; Lawns
                  </p>
                </div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal">
                    250+
                  </p>
                  <p className="text-[11px] uppercase tracking-wider text-brand-muted mt-1">
                    Pakistani Cities Served
                  </p>
                </div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal">
                    4.9★
                  </p>
                  <p className="text-[11px] uppercase tracking-wider text-brand-muted mt-1">
                    Patron Satisfaction
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. CUSTOMER TESTIMONIALS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] uppercase tracking-[0.25em] text-brand-rose font-bold block mb-2">
            Client Reflections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-charcoal font-medium">
            Voices of Aleyza Patrons
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted mt-2">
            Read authentic reviews from women across Lahore, Karachi, and Islamabad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-6 bg-white rounded-sm border border-brand-border shadow-subtle flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-brand-rose/40 mb-3" />
                <p className="text-xs text-brand-charcoal leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-brand-border/60">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-brand-charcoal">
                      {t.author}
                    </h4>
                    <p className="text-[11px] text-brand-muted">
                      {t.city}, Pakistan
                    </p>
                  </div>
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-brand-rose/20 text-brand-brown">
                    {t.tier}
                  </span>
                </div>
                <p className="text-[10px] text-brand-muted mt-2 truncate">
                  Purchased: <strong>{t.purchasedItem}</strong>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. INSTAGRAM GALLERY #AleyzaWomen */}
      <section className="py-16 bg-white border-t border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex flex-col sm:flex-row items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-brand-rose font-bold block mb-1">
              Social Community
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-charcoal font-medium">
              #AleyzaWomen on Instagram
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-brand-charcoal hover:text-brand-rose transition-colors mt-3 sm:mt-0"
          >
            <Instagram className="w-4 h-4 text-brand-rose" />
            <span>Follow @aleyzastore</span>
          </a>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {instagramPosts.map((post, idx) => (
              <div
                key={idx}
                className="group relative aspect-square rounded-sm overflow-hidden bg-brand-sand shadow-subtle"
              >
                <Image
                  src={post.image}
                  alt={post.tag}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center text-white">
                  <Instagram className="w-5 h-5 mb-1 text-brand-rose" />
                  <span className="text-[10px] font-semibold">{post.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. NEWSLETTER VIP CLUB SUBSCRIPTION */}
      <section className="py-20 bg-brand-sand/60 border-t border-brand-border">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="w-12 h-12 rounded-full bg-brand-rose/20 text-brand-rose flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-brand-charcoal font-medium mb-3">
            Step Into the Aleyza Circle
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted max-w-lg mx-auto mb-8 leading-relaxed">
            Be the first to preview festive unstitched launches, seasonal lookbooks, and private sale privileges. Receive 15% off your maiden couture order.
          </p>

          {subscribed ? (
            <div className="inline-flex items-center gap-2 p-4 rounded bg-white border border-emerald-500/30 text-emerald-800 text-xs shadow-subtle">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                You have joined the circle! Use code <strong>WELCOMEVIP</strong> for 15% off your order.
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
            >
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address..."
                required
                className="flex-1 px-4 py-3 bg-white border border-brand-border rounded text-xs text-brand-charcoal focus:outline-none focus:border-brand-rose shadow-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-brand-charcoal text-white text-xs uppercase tracking-widest font-semibold hover:bg-brand-brown transition-colors rounded shadow-sm"
              >
                Join VIP Club
              </button>
            </form>
          )}

          <p className="text-[10px] text-brand-muted mt-4">
            We honor your privacy. Unsubscribe at any time with a single click.
          </p>
        </div>
      </section>
    </div>
  );
}
