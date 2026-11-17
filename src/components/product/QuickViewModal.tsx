"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  ShoppingBag,
  Heart,
  Ruler,
  Check,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { ProductSize } from "@/types";
import { formatPKR } from "@/lib/utils";
import { SizeGuideModal } from "./SizeGuideModal";

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useStore();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ProductSize>("M");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  // Sync state when product opens
  React.useEffect(() => {
    if (quickViewProduct) {
      setSelectedImage(0);
      setSelectedSize(quickViewProduct.availableSizes[0] || "M");
      setSelectedColor(quickViewProduct.availableColors[0]?.name || "Original");
      setQuantity(1);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const inWishlist = isInWishlist(quickViewProduct.id);

  // Find variant stock
  const currentVariant = quickViewProduct.variants.find(
    (v) =>
      v.size === selectedSize &&
      v.colorName.toLowerCase() === selectedColor.toLowerCase()
  );
  const stockAvailable = currentVariant ? currentVariant.stock : 10;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedSize, selectedColor, quantity);
    setQuickViewProduct(null);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setQuickViewProduct(null)}
        />

        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="relative w-full max-w-4xl bg-brand-ivory rounded shadow-modal border border-brand-border overflow-hidden z-50 animate-slideUp">
            {/* Close Button */}
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-brand-charcoal transition-colors shadow-sm"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left Column: Image Gallery */}
              <div className="p-6 bg-white border-b md:border-b-0 md:border-r border-brand-border flex flex-col justify-between">
                <div className="relative aspect-[3/4] w-full rounded overflow-hidden bg-brand-sand mb-4">
                  <Image
                    src={
                      quickViewProduct.images[selectedImage] ||
                      quickViewProduct.images[0]
                    }
                    alt={quickViewProduct.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Thumbnails */}
                {quickViewProduct.images.length > 1 && (
                  <div className="flex gap-2">
                    {quickViewProduct.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`relative w-14 h-18 aspect-[3/4] rounded overflow-hidden border-2 transition-all ${
                          selectedImage === idx
                            ? "border-brand-charcoal ring-1 ring-brand-charcoal"
                            : "border-brand-border hover:border-brand-rose"
                        }`}
                      >
                        <Image
                          src={img}
                          alt="thumbnail"
                          fill
                          className="object-cover"
                          sizes="60px"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Product Details */}
              <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between text-xs text-brand-muted uppercase tracking-wider mb-2">
                    <span>{quickViewProduct.categoryLabel}</span>
                    <span className="font-mono text-[10px]">
                      SKU: {quickViewProduct.sku}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl font-medium text-brand-charcoal leading-snug mb-2">
                    {quickViewProduct.title}
                  </h2>

                  {/* Rating */}
                  {quickViewProduct.rating > 0 && (
                    <div className="flex items-center gap-2 text-xs text-brand-muted mb-4">
                      <div className="flex text-amber-500">
                        {"★".repeat(Math.round(quickViewProduct.rating))}
                      </div>
                      <span className="font-semibold text-brand-charcoal">
                        {quickViewProduct.rating.toFixed(1)}
                      </span>
                      <span>({quickViewProduct.reviewCount} verified reviews)</span>
                    </div>
                  )}

                  {/* Pricing */}
                  <div className="flex items-center gap-3 pb-4 border-b border-brand-border">
                    <span className="text-xl font-bold text-brand-charcoal">
                      {formatPKR(quickViewProduct.price)}
                    </span>
                    {quickViewProduct.compareAtPrice && (
                      <span className="text-sm text-brand-muted line-through">
                        {formatPKR(quickViewProduct.compareAtPrice)}
                      </span>
                    )}
                    {quickViewProduct.compareAtPrice && (
                      <span className="px-2 py-0.5 bg-brand-rose text-white text-[11px] uppercase font-bold rounded">
                        Save{" "}
                        {formatPKR(
                          quickViewProduct.compareAtPrice -
                            quickViewProduct.price
                        )}
                      </span>
                    )}
                  </div>

                  {/* Color Selector */}
                  {quickViewProduct.availableColors.length > 0 && (
                    <div className="py-3">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-medium text-brand-charcoal">
                          Color: <strong>{selectedColor}</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {quickViewProduct.availableColors.map((color) => (
                          <button
                            key={color.name}
                            onClick={() => setSelectedColor(color.name)}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-xs transition-all ${
                              selectedColor === color.name
                                ? "border-brand-charcoal bg-white ring-1 ring-brand-charcoal font-semibold"
                                : "border-brand-border hover:border-brand-charcoal/40 bg-white"
                            }`}
                          >
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0"
                              style={{ backgroundColor: color.hex }}
                            />
                            <span>{color.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Size Selector */}
                  <div className="py-3">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-medium text-brand-charcoal">
                        Size: <strong>{selectedSize}</strong>
                      </span>
                      <button
                        onClick={() => setSizeGuideOpen(true)}
                        className="flex items-center gap-1 text-[11px] text-brand-rose hover:underline"
                      >
                        <Ruler className="w-3 h-3" />
                        <span>Size Guide</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      {quickViewProduct.availableSizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-11 h-9 rounded text-xs font-semibold uppercase flex items-center justify-center transition-all ${
                            selectedSize === size
                              ? "bg-brand-charcoal text-white shadow-sm"
                              : "bg-white border border-brand-border text-brand-charcoal hover:border-brand-charcoal"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>

                    {/* Stock Alert */}
                    <p className="text-[11px] mt-2 text-brand-muted">
                      {stockAvailable > 0 ? (
                        stockAvailable <= 5 ? (
                          <span className="text-amber-700 font-medium">
                            Low Stock: Only {stockAvailable} left in {selectedSize}!
                          </span>
                        ) : (
                          <span className="text-emerald-700 font-medium">
                            ✓ In Stock ({stockAvailable} units ready to dispatch)
                          </span>
                        )
                      ) : (
                        <span className="text-red-600 font-medium">
                          Out of stock in selected size
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Quantity & Actions */}
                  <div className="py-3 flex items-center gap-3">
                    <div className="flex items-center border border-brand-border rounded bg-white">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2.5 text-brand-charcoal hover:bg-brand-sand transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-brand-charcoal min-w-[28px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() =>
                          setQuantity(Math.min(stockAvailable, quantity + 1))
                        }
                        disabled={quantity >= stockAvailable}
                        className="p-2.5 text-brand-charcoal hover:bg-brand-sand transition-colors disabled:opacity-30"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      disabled={stockAvailable === 0}
                      className="flex-1 py-3 px-4 bg-brand-charcoal text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-brand-brown transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-40"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Shopping Bag</span>
                    </button>

                    <button
                      onClick={() => toggleWishlist(quickViewProduct)}
                      className={`p-3 rounded border transition-colors ${
                        inWishlist
                          ? "bg-brand-rose border-brand-rose text-white"
                          : "bg-white border-brand-border text-brand-charcoal hover:border-brand-rose hover:text-brand-rose"
                      }`}
                      title="Save to Wishlist"
                    >
                      <Heart
                        className={`w-4 h-4 ${inWishlist ? "fill-white" : ""}`}
                      />
                    </button>
                  </div>
                </div>

                {/* Footer link to PDP */}
                <div className="pt-4 border-t border-brand-border flex items-center justify-between text-xs">
                  <span className="text-brand-muted">
                    {quickViewProduct.fabric.split(",")[0]}
                  </span>
                  <Link
                    href={`/product/${quickViewProduct.slug}`}
                    onClick={() => setQuickViewProduct(null)}
                    className="inline-flex items-center gap-1.5 font-semibold text-brand-rose hover:underline"
                  >
                    <span>View Complete Product Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />
    </>
  );
};
