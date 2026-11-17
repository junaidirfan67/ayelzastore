"use client";

import React, { useState } from "react";
import {
  Store,
  Sparkles,
  Save,
  Download,
  Mail,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useStore } from "@/context/StoreContext";
import { exportToCSV, formatDate } from "@/lib/utils";

export default function AdminContentPage() {
  const {
    announcement,
    updateAnnouncement,
    hero,
    updateHero,
    promoBanner,
    updatePromoBanner,
    subscribers,
  } = useStore();

  // Announcement state
  const [annText, setAnnText] = useState(announcement.text);
  const [annLinkText, setAnnLinkText] = useState(announcement.linkText || "");
  const [annLinkUrl, setAnnLinkUrl] = useState(announcement.linkUrl || "");
  const [annEnabled, setAnnEnabled] = useState(announcement.enabled);

  // Hero state
  const [heroTagline, setHeroTagline] = useState(hero.tagline);
  const [heroHeadline, setHeroHeadline] = useState(hero.headline);
  const [heroDesc, setHeroDesc] = useState(hero.description);
  const [heroPrimaryCtaText, setHeroPrimaryCtaText] = useState(hero.primaryCtaText);
  const [heroPrimaryCtaLink, setHeroPrimaryCtaLink] = useState(hero.primaryCtaLink);
  const [heroImageUrl, setHeroImageUrl] = useState(hero.imageUrl);

  // Promo Banner state
  const [promoBadge, setPromoBadge] = useState(promoBanner.badge);
  const [promoTitle, setPromoTitle] = useState(promoBanner.title);
  const [promoSubtitle, setPromoSubtitle] = useState(promoBanner.subtitle);
  const [promoCoupon, setPromoCoupon] = useState(promoBanner.couponCode);
  const [promoEnabled, setPromoEnabled] = useState(promoBanner.enabled);

  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    updateAnnouncement({
      text: annText,
      linkText: annLinkText,
      linkUrl: annLinkUrl,
      enabled: annEnabled,
    });
  };

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    updateHero({
      tagline: heroTagline,
      headline: heroHeadline,
      description: heroDesc,
      primaryCtaText: heroPrimaryCtaText,
      primaryCtaLink: heroPrimaryCtaLink,
      secondaryCtaText: hero.secondaryCtaText,
      secondaryCtaLink: hero.secondaryCtaLink,
      imageUrl: heroImageUrl,
    });
  };

  const handleSavePromo = (e: React.FormEvent) => {
    e.preventDefault();
    updatePromoBanner({
      badge: promoBadge,
      title: promoTitle,
      subtitle: promoSubtitle,
      couponCode: promoCoupon,
      expiryText: promoBanner.expiryText,
      imageUrl: promoBanner.imageUrl,
      enabled: promoEnabled,
    });
  };

  const handleExportSubscribers = () => {
    const rows = subscribers.map((s) => ({
      Email: s.email,
      Source: s.source,
      SubscribedAt: s.subscribedAt,
    }));
    exportToCSV("aleyza-newsletter-subscribers", rows);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="pb-6 border-b border-brand-border">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-rose block mb-1">
            Visual Merchandising &amp; Copy
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal">
            Storefront Content &amp; VIP Subscribers
          </h1>
          <p className="text-xs text-brand-muted mt-1">
            Manage announcement strips, campaign hero banners, and email lead generation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Section 1: Announcement Bar */}
          <div className="bg-white rounded border border-brand-border p-6 shadow-subtle space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-brand-border">
              <h2 className="font-serif text-base font-bold text-brand-charcoal">
                Top Announcement Bar
              </h2>
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={annEnabled}
                  onChange={(e) => setAnnEnabled(e.target.checked)}
                  className="rounded text-brand-charcoal"
                />
                <span className="font-semibold text-brand-charcoal">Enabled</span>
              </label>
            </div>

            <form onSubmit={handleSaveAnnouncement} className="space-y-3 text-xs">
              <div>
                <label className="block text-brand-charcoal font-medium mb-1">
                  Announcement Text
                </label>
                <textarea
                  rows={2}
                  value={annText}
                  onChange={(e) => setAnnText(e.target.value)}
                  className="w-full p-2.5 border border-brand-border rounded focus:outline-none focus:border-brand-rose bg-brand-ivory"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-brand-charcoal font-medium mb-1">
                    Action Link Text
                  </label>
                  <input
                    type="text"
                    value={annLinkText}
                    onChange={(e) => setAnnLinkText(e.target.value)}
                    placeholder="e.g. Explore Now"
                    className="w-full px-3 py-2 border border-brand-border rounded focus:outline-none focus:border-brand-rose bg-brand-ivory"
                  />
                </div>
                <div>
                  <label className="block text-brand-charcoal font-medium mb-1">
                    Destination URL
                  </label>
                  <input
                    type="text"
                    value={annLinkUrl}
                    onChange={(e) => setAnnLinkUrl(e.target.value)}
                    placeholder="/shop?sort=newest"
                    className="w-full px-3 py-2 border border-brand-border rounded focus:outline-none focus:border-brand-rose bg-brand-ivory"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-brand-charcoal text-white text-xs font-semibold rounded hover:bg-brand-brown flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Announcement</span>
              </button>
            </form>
          </div>

          {/* Section 2: Promotional Privilege Banner */}
          <div className="bg-white rounded border border-brand-border p-6 shadow-subtle space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-brand-border">
              <h2 className="font-serif text-base font-bold text-brand-charcoal">
                Mid-Season Privilege Banner
              </h2>
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={promoEnabled}
                  onChange={(e) => setPromoEnabled(e.target.checked)}
                  className="rounded text-brand-charcoal"
                />
                <span className="font-semibold text-brand-charcoal">Enabled</span>
              </label>
            </div>

            <form onSubmit={handleSavePromo} className="space-y-3 text-xs">
              <div>
                <label className="block text-brand-charcoal font-medium mb-1">
                  Tagline Badge
                </label>
                <input
                  type="text"
                  value={promoBadge}
                  onChange={(e) => setPromoBadge(e.target.value)}
                  className="w-full px-3 py-2 border border-brand-border rounded bg-brand-ivory"
                />
              </div>

              <div>
                <label className="block text-brand-charcoal font-medium mb-1">
                  Banner Headline
                </label>
                <input
                  type="text"
                  value={promoTitle}
                  onChange={(e) => setPromoTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-brand-border rounded bg-brand-ivory"
                />
              </div>

              <div>
                <label className="block text-brand-charcoal font-medium mb-1">
                  Active Coupon Voucher
                </label>
                <input
                  type="text"
                  value={promoCoupon}
                  onChange={(e) => setPromoCoupon(e.target.value)}
                  className="w-full uppercase font-mono px-3 py-2 border border-brand-border rounded bg-brand-ivory font-bold"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-brand-charcoal text-white text-xs font-semibold rounded hover:bg-brand-brown flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Promotional Banner</span>
              </button>
            </form>
          </div>

          {/* Section 3: Homepage Hero Campaign */}
          <div className="bg-white rounded border border-brand-border p-6 shadow-subtle space-y-4 lg:col-span-2">
            <h2 className="font-serif text-base font-bold text-brand-charcoal pb-3 border-b border-brand-border">
              Homepage Editorial Hero Campaign
            </h2>

            <form onSubmit={handleSaveHero} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-charcoal font-medium mb-1">
                    Editorial Subtitle / Tagline
                  </label>
                  <input
                    type="text"
                    value={heroTagline}
                    onChange={(e) => setHeroTagline(e.target.value)}
                    className="w-full px-3 py-2 border border-brand-border rounded bg-brand-ivory"
                  />
                </div>

                <div>
                  <label className="block text-brand-charcoal font-medium mb-1">
                    Main Hero Headline
                  </label>
                  <input
                    type="text"
                    value={heroHeadline}
                    onChange={(e) => setHeroHeadline(e.target.value)}
                    className="w-full px-3 py-2 border border-brand-border rounded bg-brand-ivory font-serif text-sm font-semibold"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-brand-charcoal font-medium mb-1">
                    Story Introduction
                  </label>
                  <textarea
                    rows={2}
                    value={heroDesc}
                    onChange={(e) => setHeroDesc(e.target.value)}
                    className="w-full p-2.5 border border-brand-border rounded bg-brand-ivory"
                  />
                </div>

                <div>
                  <label className="block text-brand-charcoal font-medium mb-1">
                    Primary CTA Label
                  </label>
                  <input
                    type="text"
                    value={heroPrimaryCtaText}
                    onChange={(e) => setHeroPrimaryCtaText(e.target.value)}
                    className="w-full px-3 py-2 border border-brand-border rounded bg-brand-ivory"
                  />
                </div>

                <div>
                  <label className="block text-brand-charcoal font-medium mb-1">
                    Hero Photography Image URL
                  </label>
                  <input
                    type="url"
                    value={heroImageUrl}
                    onChange={(e) => setHeroImageUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-brand-border rounded bg-brand-ivory"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-brand-charcoal text-white text-xs font-semibold rounded hover:bg-brand-brown flex items-center gap-2"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Hero Campaign</span>
              </button>
            </form>
          </div>

          {/* Section 4: Newsletter Subscribers */}
          <div className="bg-white rounded border border-brand-border p-6 shadow-subtle space-y-4 lg:col-span-2">
            <div className="flex items-center justify-between pb-3 border-b border-brand-border">
              <div>
                <h2 className="font-serif text-base font-bold text-brand-charcoal">
                  VIP Club Newsletter Subscribers ({subscribers.length})
                </h2>
                <p className="text-[11px] text-brand-muted">
                  Patron emails collected via storefront footer and promotional modals
                </p>
              </div>

              <button
                onClick={handleExportSubscribers}
                className="px-3 py-1.5 border border-brand-border text-xs rounded hover:bg-brand-sand flex items-center gap-1.5 font-semibold text-brand-charcoal"
              >
                <Download className="w-3.5 h-3.5 text-brand-rose" />
                <span>Export Subscribers CSV</span>
              </button>
            </div>

            <div className="divide-y divide-brand-border/60 max-h-48 overflow-y-auto text-xs">
              {subscribers.map((sub) => (
                <div
                  key={sub.id}
                  className="py-2.5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-brand-rose" />
                    <span className="font-medium text-brand-charcoal">
                      {sub.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-brand-muted text-[11px]">
                    <span>Source: {sub.source}</span>
                    <span>{formatDate(sub.subscribedAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
