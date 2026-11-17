"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Eye, ShoppingBag, Sparkles } from "lucide-react";
import { Product } from "@/types";
import { useStore } from "@/context/StoreContext";
import { formatPKR } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, isInWishlist, setQuickViewProduct, addToCart } =
    useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const primaryImage =
    product.images?.[0] ||
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80";
  const secondaryImage = product.images?.[1];
  const hasSecondImage = Boolean(secondaryImage);
  const discountPercent = product.compareAtPrice
    ? Math.round(
        ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
      )
    : 0;

  const handleQuickAdd = (size: string) => {
    const defaultColor = product.availableColors[0]?.name || "Original";
    addToCart(product, size as any, defaultColor, 1);
    setShowQuickAdd(false);
  };

  return (
    <div
      className="group flex flex-col relative bg-white border border-brand-border/60 hover:border-brand-border hover:shadow-card transition-all duration-300 rounded-sm overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickAdd(false);
      }}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-brand-sand">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          {/* Primary Image */}
          <Image
            src={primaryImage}
            alt={product.title}
            fill
            className={`object-cover object-top transition-all duration-700 ${
              hasSecondImage && isHovered ? "opacity-0 scale-105" : "opacity-100 scale-100"
            }`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Secondary Hover Image */}
          {hasSecondImage && secondaryImage && (
            <Image
              src={secondaryImage}
              alt={`${product.title} preview`}
              fill
              className={`object-cover object-top transition-all duration-700 ${
                isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
              }`}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isNewArrival && (
            <span className="px-2 py-0.5 bg-brand-charcoal text-white text-[10px] uppercase font-semibold tracking-wider rounded-sm shadow-sm">
              New
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2 py-0.5 bg-brand-goldDark text-white text-[10px] uppercase font-semibold tracking-wider rounded-sm shadow-sm flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              Best Seller
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 bg-brand-rose text-white text-[10px] uppercase font-semibold tracking-wider rounded-sm shadow-sm">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 ${
            inWishlist
              ? "bg-brand-rose text-white shadow-md scale-110"
              : "bg-white/80 text-brand-charcoal hover:bg-white hover:text-brand-rose shadow-sm"
          }`}
          aria-label="Add to Wishlist"
        >
          <Heart
            className={`w-4 h-4 ${inWishlist ? "fill-white" : ""}`}
          />
        </button>

        {/* Quick View Button (Desktop Hover) */}
        <div className="absolute bottom-3 inset-x-3 hidden sm:flex items-center gap-2 transition-all duration-300 transform opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 z-10">
          <button
            onClick={() => setQuickViewProduct(product)}
            className="flex-1 py-2 px-3 bg-white/95 hover:bg-white text-brand-charcoal text-[11px] uppercase tracking-wider font-semibold rounded-sm shadow-sm transition-colors flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>

          <button
            onClick={() => setShowQuickAdd(!showQuickAdd)}
            className="py-2 px-3 bg-brand-charcoal hover:bg-brand-brown text-white text-[11px] uppercase tracking-wider font-semibold rounded-sm shadow-sm transition-colors flex items-center justify-center"
            title="Quick Add to Bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Add Sizes Overlay */}
        {showQuickAdd && (
          <div className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-sm p-3 border-t border-brand-border z-20 animate-slideUp">
            <p className="text-[10px] uppercase font-semibold tracking-wider text-brand-muted mb-2 text-center">
              Select Size to Add:
            </p>
            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              {product.availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleQuickAdd(size)}
                  className="px-2.5 py-1 text-xs border border-brand-border rounded hover:border-brand-charcoal hover:bg-brand-charcoal hover:text-white transition-colors font-medium text-brand-charcoal"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          <div className="flex items-center justify-between text-[11px] text-brand-muted uppercase tracking-wider mb-1">
            <span>{product.categoryLabel}</span>
            {product.rating > 0 && (
              <span className="flex items-center gap-1 text-brand-charcoal font-medium">
                ★ {product.rating.toFixed(1)}
              </span>
            )}
          </div>

          <Link
            href={`/product/${product.slug}`}
            className="font-serif text-sm font-medium text-brand-charcoal hover:text-brand-rose line-clamp-1 transition-colors block mb-1.5"
          >
            {product.title}
          </Link>

          {/* Color swatches preview */}
          {product.availableColors.length > 0 && (
            <div className="flex items-center gap-1.5 mb-2">
              {product.availableColors.map((color) => (
                <span
                  key={color.name}
                  title={color.name}
                  className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                  style={{ backgroundColor: color.hex }}
                />
              ))}
              <span className="text-[10px] text-brand-muted">
                {product.availableColors.length > 1
                  ? `${product.availableColors.length} colors`
                  : product.availableColors[0].name}
              </span>
            </div>
          )}
        </div>

        {/* Price & Mobile Add */}
        <div className="pt-2 border-t border-brand-border/40 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-brand-charcoal">
                {formatPKR(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-[11px] text-brand-muted line-through">
                  {formatPKR(product.compareAtPrice)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => setQuickViewProduct(product)}
            className="sm:hidden p-1.5 bg-brand-sand hover:bg-brand-rose hover:text-white rounded text-brand-charcoal transition-colors"
            title="View Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
