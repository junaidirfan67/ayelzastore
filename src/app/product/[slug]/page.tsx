"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Heart,
  ShoppingBag,
  Ruler,
  Truck,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Star,
  Plus,
  Minus,
  ArrowRight,
  Share2,
  MessageSquare,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { ProductCard } from "@/components/product/ProductCard";
import { SizeGuideModal } from "@/components/product/SizeGuideModal";
import { ProductSize } from "@/types";
import { formatPKR } from "@/lib/utils";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const {
    products,
    getProductBySlug,
    addToCart,
    toggleWishlist,
    isInWishlist,
    trackEvent,
    addToast,
  } = useStore();

  const product = getProductBySlug(slug) || products[0];

  // Component states
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ProductSize>("M");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "fabric" | "delivery" | "returns">("description");

  // Reviews submission state
  const [reviewsList, setReviewsList] = useState([
    {
      id: "rev-1",
      author: "Mahnoor T.",
      city: "Islamabad",
      rating: 5,
      date: "3 days ago",
      comment: "Absolutely breathtaking! The raw silk has a royal weight and the hand zardozi work along the sleeves is so delicate. Wore it to a wedding and received compliments all night.",
      verified: true,
    },
    {
      id: "rev-2",
      author: "Sobia R.",
      city: "Lahore",
      rating: 5,
      date: "1 week ago",
      comment: "Arrived in 48 hours via TCS. Pristine packaging with branded garment cover. Size Medium fits true to Pakistani standard measurements.",
      verified: true,
    },
  ]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewerName, setReviewerName] = useState("");
  const [reviewerCity, setReviewerCity] = useState("Lahore");
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewerComment, setReviewerComment] = useState("");

  // Sync default options when product changes
  useEffect(() => {
    if (product) {
      setActiveImageIndex(0);
      setSelectedSize(product.availableSizes[0] || "M");
      setSelectedColor(product.availableColors[0]?.name || "Original");
      setQuantity(1);

      // Track ViewContent event
      trackEvent("ViewContent", {
        content_name: product.title,
        content_category: product.categoryLabel,
        value: product.price,
        currency: "PKR",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id]);

  if (!product) {
    return (
      <div className="py-24 text-center">
        <p className="font-serif text-xl mb-4">Product not found</p>
        <Link href="/shop" className="text-xs uppercase font-bold text-brand-rose underline">
          Return to collections
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  // Variant matching
  const currentVariant = product.variants.find(
    (v) =>
      v.size === selectedSize &&
      v.colorName.toLowerCase() === selectedColor.toLowerCase()
  );
  const stockAvailable = currentVariant ? currentVariant.stock : 8;

  // Add to cart handler
  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  // Instant Buy Now handler
  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    router.push("/checkout");
  };

  // Submit review handler
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName || !reviewerComment) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      author: reviewerName,
      city: reviewerCity,
      rating: reviewerRating,
      date: "Just now",
      comment: reviewerComment,
      verified: true,
    };

    setReviewsList([newRev, ...reviewsList]);
    setShowReviewForm(false);
    setReviewerName("");
    setReviewerComment("");
    addToast("Thank you for sharing your review with the Aleyza community!", "success");
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-brand-muted mb-8 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-brand-charcoal transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-brand-charcoal transition-colors">
          Shop
        </Link>
        <span>/</span>
        <Link
          href={`/shop?category=${product.category}`}
          className="hover:text-brand-charcoal transition-colors"
        >
          {product.categoryLabel}
        </Link>
        <span>/</span>
        <span className="text-brand-charcoal font-medium truncate max-w-xs">
          {product.title}
        </span>
      </nav>

      {/* Main Product Section: Gallery + Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left: Image Gallery (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails list */}
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[600px] shrink-0">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-16 h-20 md:w-20 md:h-26 rounded overflow-hidden border-2 transition-all ${
                  activeImageIndex === idx
                    ? "border-brand-charcoal ring-1 ring-brand-charcoal"
                    : "border-brand-border/70 hover:border-brand-rose opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.title} angle ${idx + 1}`}
                  fill
                  className="object-cover object-top"
                  sizes="80px"
                />
              </button>
            ))}
          </div>

          {/* Main Selected Image */}
          <div className="relative flex-1 aspect-[3/4] rounded-sm overflow-hidden bg-brand-sand shadow-subtle border border-brand-border/60 group">
            <Image
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.title}
              fill
              priority
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
              {product.isNewArrival && (
                <span className="px-2.5 py-1 bg-brand-charcoal text-white text-[10px] uppercase font-semibold tracking-wider rounded-sm shadow-sm">
                  New Arrival
                </span>
              )}
              {product.isBestSeller && (
                <span className="px-2.5 py-1 bg-brand-goldDark text-white text-[10px] uppercase font-semibold tracking-wider rounded-sm shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Best Seller
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Product Details & Purchase Form (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-brand-muted uppercase tracking-wider mb-2">
              <span className="font-semibold text-brand-rose">
                {product.collection}
              </span>
              <span className="font-mono text-[11px]">SKU: {product.sku}</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-brand-charcoal leading-tight mb-2">
              {product.title}
            </h1>

            {product.tagline && (
              <p className="text-xs sm:text-sm text-brand-muted italic mb-4">
                &ldquo;{product.tagline}&rdquo;
              </p>
            )}

            {/* Rating Stars */}
            <div className="flex items-center gap-2 text-xs text-brand-muted pb-4 border-b border-brand-border">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating)
                        ? "fill-amber-500"
                        : "text-amber-300"
                    }`}
                  />
                ))}
              </div>
              <span className="font-bold text-brand-charcoal">
                {product.rating.toFixed(1)}
              </span>
              <span>•</span>
              <span className="underline cursor-pointer">
                {product.reviewCount} Patron Reviews
              </span>
            </div>

            {/* Price section */}
            <div className="py-4 border-b border-brand-border flex items-baseline gap-3 flex-wrap">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal">
                {formatPKR(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm sm:text-base text-brand-muted line-through">
                  {formatPKR(product.compareAtPrice)}
                </span>
              )}
              {product.compareAtPrice && (
                <span className="px-2 py-0.5 bg-brand-rose text-white text-xs uppercase font-bold rounded">
                  Save{" "}
                  {formatPKR(product.compareAtPrice - product.price)} (
                  {Math.round(
                    ((product.compareAtPrice - product.price) /
                      product.compareAtPrice) *
                      100
                  )}
                  % OFF)
                </span>
              )}
            </div>

            {/* Color Swatches */}
            {product.availableColors.length > 0 && (
              <div className="py-4 border-b border-brand-border">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-brand-muted">
                    Color:{" "}
                    <strong className="text-brand-charcoal">
                      {selectedColor}
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {product.availableColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs transition-all ${
                        selectedColor === color.name
                          ? "border-brand-charcoal bg-white ring-1 ring-brand-charcoal font-semibold text-brand-charcoal"
                          : "border-brand-border hover:border-brand-charcoal/40 bg-white text-brand-charcoal"
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
            <div className="py-4 border-b border-brand-border">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-brand-muted">
                  Size:{" "}
                  <strong className="text-brand-charcoal">
                    {selectedSize}
                  </strong>
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="flex items-center gap-1 text-[11px] text-brand-rose font-medium hover:underline"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size &amp; Fit Guide</span>
                </button>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {product.availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-10 rounded text-xs font-semibold uppercase flex items-center justify-center transition-all ${
                      selectedSize === size
                        ? "bg-brand-charcoal text-white shadow-sm ring-1 ring-brand-charcoal"
                        : "bg-white border border-brand-border text-brand-charcoal hover:border-brand-charcoal"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* Stock Warning */}
              <div className="mt-3 flex items-center gap-2 text-xs">
                {stockAvailable > 0 ? (
                  stockAvailable <= 5 ? (
                    <span className="text-amber-700 font-semibold flex items-center gap-1">
                      <span>⚠️ Only {stockAvailable} units remaining in {selectedSize}!</span>
                    </span>
                  ) : (
                    <span className="text-emerald-700 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      In Stock • Ready to dispatch from Lahore atelier
                    </span>
                  )
                ) : (
                  <span className="text-red-600 font-semibold">
                    Currently sold out in selected size
                  </span>
                )}
              </div>
            </div>

            {/* Quantity Selector + Actions */}
            <div className="py-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-brand-border rounded bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-brand-charcoal hover:bg-brand-sand transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-bold text-brand-charcoal min-w-[32px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(stockAvailable, quantity + 1))
                    }
                    disabled={quantity >= stockAvailable}
                    className="p-3 text-brand-charcoal hover:bg-brand-sand transition-colors disabled:opacity-30"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  onClick={handleAddToCart}
                  disabled={stockAvailable === 0}
                  className="flex-1 py-3.5 px-6 bg-brand-charcoal text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-brand-brown transition-all shadow-subtle flex items-center justify-center gap-2 disabled:opacity-40"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Shopping Bag</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3.5 rounded border transition-colors ${
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

              {/* Instant Buy Now Button */}
              <button
                onClick={handleBuyNow}
                disabled={stockAvailable === 0}
                className="w-full py-3.5 px-6 bg-brand-rose text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-brand-rose/90 transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-40"
              >
                <span>Buy Now with Cash on Delivery</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Value Props Accordion / Strip */}
            <div className="bg-brand-sand/60 rounded p-4 border border-brand-border space-y-2.5 text-xs text-brand-charcoal">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-brand-rose shrink-0" />
                <span>
                  <strong>Complimentary Express Delivery</strong> on orders above Rs. 5,000 (2-4 business days)
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-brand-rose shrink-0" />
                <span>
                  <strong>Cash on Delivery (COD)</strong> &amp; Secure Bank/Wallet transfers available
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw className="w-4 h-4 text-brand-rose shrink-0" />
                <span>
                  <strong>7-Day Easy Exchange</strong> nationwide across Pakistan
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Description, Fabric & Care, Delivery, Returns */}
      <div className="mt-16 pt-8 border-t border-brand-border">
        <div className="flex items-center gap-4 border-b border-brand-border pb-2 overflow-x-auto text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab("description")}
            className={`pb-2 transition-colors border-b-2 ${
              activeTab === "description"
                ? "border-brand-charcoal text-brand-charcoal"
                : "border-transparent text-brand-muted hover:text-brand-charcoal"
            }`}
          >
            Design Notes
          </button>
          <button
            onClick={() => setActiveTab("fabric")}
            className={`pb-2 transition-colors border-b-2 ${
              activeTab === "fabric"
                ? "border-brand-charcoal text-brand-charcoal"
                : "border-transparent text-brand-muted hover:text-brand-charcoal"
            }`}
          >
            Fabric &amp; Care
          </button>
          <button
            onClick={() => setActiveTab("delivery")}
            className={`pb-2 transition-colors border-b-2 ${
              activeTab === "delivery"
                ? "border-brand-charcoal text-brand-charcoal"
                : "border-transparent text-brand-muted hover:text-brand-charcoal"
            }`}
          >
            Delivery &amp; Courier
          </button>
          <button
            onClick={() => setActiveTab("returns")}
            className={`pb-2 transition-colors border-b-2 ${
              activeTab === "returns"
                ? "border-brand-charcoal text-brand-charcoal"
                : "border-transparent text-brand-muted hover:text-brand-charcoal"
            }`}
          >
            Exchange Policy
          </button>
        </div>

        <div className="py-6 max-w-3xl text-xs sm:text-sm text-brand-charcoal leading-relaxed">
          {activeTab === "description" && (
            <div className="space-y-4">
              <p>{product.description}</p>
              <p className="text-brand-muted">
                Each Aleyza creation undergoes meticulous double-inspection at our Lahore flagship atelier before being lovingly hand-wrapped in acid-free tissue paper and boxed in our signature luxury presentation packaging.
              </p>
            </div>
          )}

          {activeTab === "fabric" && (
            <div className="space-y-3">
              <div>
                <strong className="text-brand-charcoal block mb-1">
                  Fabric Composition:
                </strong>
                <p className="text-brand-muted">{product.fabric}</p>
              </div>
              <div className="pt-2">
                <strong className="text-brand-charcoal block mb-1">
                  Care Instructions:
                </strong>
                <p className="text-brand-muted">{product.careInstructions}</p>
              </div>
            </div>
          )}

          {activeTab === "delivery" && (
            <div className="space-y-3 text-brand-muted">
              <p>
                • <strong>Lahore, Karachi, Islamabad, Rawalpindi:</strong> 2 to 3 business days via TCS Express / Leopards.
              </p>
              <p>
                • <strong>Faisalabad, Multan, Peshawar, Sialkot, Quetta:</strong> 3 to 4 business days.
              </p>
              <p>
                • <strong>Delivery Charges:</strong> Free delivery on all orders above Rs. 5,000. Flat Rs. 250 for orders below Rs. 5,000.
              </p>
            </div>
          )}

          {activeTab === "returns" && (
            <div className="space-y-3 text-brand-muted">
              <p>
                We want you to be enchanted by your Aleyza ensemble. If the size does not fit or you wish to exchange for another color, we offer a hassle-free 7-day exchange window.
              </p>
              <p>
                Garments must be unworn, in original unwashed condition with all brand tags and presentation packaging intact.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="mt-16 pt-12 border-t border-brand-border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="font-serif text-2xl font-medium text-brand-charcoal">
              Patron Reviews &amp; Reflections
            </h3>
            <p className="text-xs text-brand-muted mt-1">
              Verified feedback from women who own this design.
            </p>
          </div>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-4 py-2 border border-brand-charcoal text-brand-charcoal text-xs uppercase tracking-wider font-semibold rounded hover:bg-brand-charcoal hover:text-white transition-colors flex items-center gap-2"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Review Submission Form */}
        {showReviewForm && (
          <form
            onSubmit={handleReviewSubmit}
            className="p-6 bg-white rounded border border-brand-border mb-8 max-w-xl space-y-4 animate-slideUp"
          >
            <h4 className="font-serif text-base font-semibold text-brand-charcoal">
              Share Your Experience with {product.title}
            </h4>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-brand-muted mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="e.g. Ayesha Khan"
                  className="w-full px-3 py-2 border border-brand-border rounded focus:outline-none focus:border-brand-rose"
                />
              </div>
              <div>
                <label className="block text-brand-muted mb-1">City</label>
                <select
                  value={reviewerCity}
                  onChange={(e) => setReviewerCity(e.target.value)}
                  className="w-full px-3 py-2 border border-brand-border rounded focus:outline-none focus:border-brand-rose"
                >
                  <option value="Lahore">Lahore</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                  <option value="Faisalabad">Faisalabad</option>
                  <option value="Peshawar">Peshawar</option>
                  <option value="Multan">Multan</option>
                  <option value="Other">Other City</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-brand-muted mb-1">
                Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setReviewerRating(num)}
                    className="p-1 text-amber-500"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        num <= reviewerRating
                          ? "fill-amber-500"
                          : "text-brand-border"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs text-brand-muted mb-1">
                Your Review
              </label>
              <textarea
                rows={3}
                required
                value={reviewerComment}
                onChange={(e) => setReviewerComment(e.target.value)}
                placeholder="Describe fabric quality, fitting, delivery experience..."
                className="w-full p-2.5 text-xs border border-brand-border rounded focus:outline-none focus:border-brand-rose"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-brand-charcoal text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-brand-brown"
              >
                Submit Review
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-4 py-2 border border-brand-border text-xs text-brand-muted rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Reviews List */}
        <div className="space-y-4 max-w-3xl">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="p-4 bg-white rounded border border-brand-border/70 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-brand-charcoal">
                    {rev.author}
                  </span>
                  <span className="text-[10px] text-brand-muted">
                    ({rev.city})
                  </span>
                  {rev.verified && (
                    <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
                      Verified Buyer
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-brand-muted">{rev.date}</span>
              </div>

              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < rev.rating ? "fill-amber-500" : "text-amber-200"
                    }`}
                  />
                ))}
              </div>

              <p className="text-xs text-brand-charcoal/90 leading-relaxed">
                {rev.comment}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-20 pt-12 border-t border-brand-border">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] uppercase tracking-[0.25em] text-brand-rose font-bold block mb-1">
              You May Also Adore
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-brand-charcoal font-medium">
              Complete the Look
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
}
