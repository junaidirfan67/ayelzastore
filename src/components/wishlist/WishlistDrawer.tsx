"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatPKR } from "@/lib/utils";

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    products,
    addToCart,
  } = useStore();

  if (!isWishlistOpen) return null;

  const handleMoveToBag = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;
    const defaultSize = prod.availableSizes[0] || "M";
    const defaultColor = prod.availableColors[0]?.name || "Original";
    addToCart(prod, defaultSize, defaultColor, 1);
    toggleWishlist(prod);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-brand-ivory shadow-drawer flex flex-col z-50">
          {/* Header */}
          <div className="p-6 border-b border-brand-border flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <Heart className="w-5 h-5 text-brand-rose fill-brand-rose" />
              <h2 className="font-serif text-xl tracking-wide font-medium text-brand-charcoal">
                Saved to Wishlist
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-sand text-brand-muted">
                {wishlist.length}
              </span>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1 text-brand-muted hover:text-brand-charcoal transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-brand-sand flex items-center justify-center text-brand-rose mb-4">
                  <Heart className="w-8 h-8 opacity-40" />
                </div>
                <h3 className="font-serif text-lg text-brand-charcoal mb-2">
                  Your wishlist is empty
                </h3>
                <p className="text-xs text-brand-muted max-w-xs mb-6">
                  Save your favorite silk suits, dresses, and handcrafted accessories to view them anytime.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-6 py-2.5 bg-brand-charcoal text-white text-xs uppercase tracking-widest font-semibold hover:bg-brand-brown transition-colors rounded-sm"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              wishlist.map((item) => (
                <div
                  key={item.productId}
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
                          href={`/product/${item.slug}`}
                          onClick={() => setIsWishlistOpen(false)}
                          className="font-serif text-sm font-medium text-brand-charcoal hover:text-brand-rose line-clamp-1 transition-colors"
                        >
                          {item.title}
                        </Link>
                        <button
                          onClick={() => {
                            const prod = products.find((p) => p.id === item.productId);
                            if (prod) toggleWishlist(prod);
                          }}
                          className="text-brand-muted hover:text-red-600 transition-colors p-0.5"
                          title="Remove from wishlist"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-brand-muted mt-0.5">
                        {item.categoryLabel}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs font-bold text-brand-charcoal">
                          {formatPKR(item.price)}
                        </span>
                        {item.compareAtPrice && (
                          <span className="text-[10px] text-brand-muted line-through">
                            {formatPKR(item.compareAtPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => handleMoveToBag(item.productId)}
                        className="w-full py-1.5 px-3 bg-brand-charcoal text-white text-[11px] uppercase tracking-wider font-medium hover:bg-brand-brown transition-colors rounded-sm flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlist.length > 0 && (
            <div className="p-6 bg-white border-t border-brand-border">
              <Link
                href="/shop"
                onClick={() => setIsWishlistOpen(false)}
                className="w-full py-3 px-4 border border-brand-charcoal text-brand-charcoal text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:bg-brand-charcoal hover:text-white transition-all rounded"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
