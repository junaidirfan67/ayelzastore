"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ArrowRight, Tag } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatPKR } from "@/lib/utils";

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products, trackEvent } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setSearchTerm("");
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const quickPills = [
    "Raw Silk",
    "Velvet",
    "Co-Ord Sets",
    "Chikankari",
    "Pashmina",
    "Leather Bag",
    "Lawn",
  ];

  const filteredProducts = searchTerm.trim()
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.fabric.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.collection.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSelectPill = (pill: string) => {
    setSearchTerm(pill);
    trackEvent("Search", { search_string: pill });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length > 2) {
      trackEvent("Search", { search_string: e.target.value });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative min-h-screen flex items-start justify-center p-4 sm:p-6 lg:p-8 pt-16 sm:pt-24">
        <div className="relative w-full max-w-2xl bg-brand-ivory rounded shadow-modal border border-brand-border overflow-hidden z-50 animate-slideUp">
          {/* Search Header */}
          <div className="p-4 sm:p-6 border-b border-brand-border bg-white flex items-center gap-3">
            <Search className="w-5 h-5 text-brand-muted shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Search silk suits, velvet dresses, bags, jewelry..."
              className="flex-1 text-sm sm:text-base bg-transparent border-none focus:outline-none text-brand-charcoal placeholder-brand-muted/70"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="p-1 text-brand-muted hover:text-brand-charcoal"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="ml-2 px-2.5 py-1 text-xs text-brand-muted hover:text-brand-charcoal border border-brand-border rounded"
            >
              ESC
            </button>
          </div>

          {/* Quick suggestions pills */}
          <div className="px-6 py-3 bg-brand-sand/60 border-b border-brand-border flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-[11px] text-brand-muted uppercase font-semibold shrink-0">
              Popular:
            </span>
            {quickPills.map((pill) => (
              <button
                key={pill}
                onClick={() => handleSelectPill(pill)}
                className="px-2.5 py-1 rounded-full bg-white border border-brand-border/80 text-brand-charcoal/80 hover:text-brand-charcoal hover:border-brand-rose transition-colors shrink-0"
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Results Area */}
          <div className="max-h-96 overflow-y-auto p-4 sm:p-6 space-y-3">
            {searchTerm.trim() ? (
              filteredProducts.length > 0 ? (
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-brand-muted mb-3 font-semibold">
                    Found {filteredProducts.length} matching piece
                    {filteredProducts.length === 1 ? "" : "s"}
                  </p>
                  <div className="space-y-2">
                    {filteredProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-4 p-2.5 rounded bg-white hover:bg-brand-sand/60 border border-brand-border/60 hover:border-brand-border transition-colors group"
                      >
                        <div className="relative w-14 h-16 rounded overflow-hidden bg-brand-sand shrink-0">
                          <Image
                            src={product.images[0]}
                            alt={product.title}
                            fill
                            className="object-cover"
                            sizes="60px"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-serif text-sm font-medium text-brand-charcoal group-hover:text-brand-rose truncate transition-colors">
                            {product.title}
                          </p>
                          <div className="flex items-center gap-2 text-[11px] text-brand-muted mt-0.5">
                            <span>{product.categoryLabel}</span>
                            <span>•</span>
                            <span>{product.fabric.split(" ")[0]}</span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <p className="text-xs font-bold text-brand-charcoal">
                            {formatPKR(product.price)}
                          </p>
                          {product.compareAtPrice && (
                            <span className="text-[10px] text-brand-muted line-through block">
                              {formatPKR(product.compareAtPrice)}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="font-serif text-base text-brand-charcoal mb-1">
                    No results for &ldquo;{searchTerm}&rdquo;
                  </p>
                  <p className="text-xs text-brand-muted mb-4">
                    Try searching for fabric types such as &quot;Silk&quot;, &quot;Lawn&quot;, &quot;Velvet&quot; or browse all collections.
                  </p>
                  <Link
                    href="/shop"
                    onClick={() => setIsSearchOpen(false)}
                    className="inline-flex items-center gap-1.5 text-xs text-brand-rose font-semibold hover:underline"
                  >
                    <span>Browse All Collections</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )
            ) : (
              <div className="text-center py-8 text-xs text-brand-muted">
                Type above to discover couture kalidars, suits, dresses and luxury accessories.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
