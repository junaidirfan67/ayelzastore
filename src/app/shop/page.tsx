"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  LayoutGrid,
  Grid3X3,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductCategory, ProductSize } from "@/types";
import { formatPKR } from "@/lib/utils";

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { products, trackEvent } = useStore();

  // URL Params
  const categoryParam = searchParams.get("category") as ProductCategory | null;
  const sortParam = searchParams.get("sort") || "featured";

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categoryParam || "all"
  );
  const [selectedSort, setSelectedSort] = useState<string>(sortParam);
  const [selectedSizes, setSelectedSizes] = useState<ProductSize[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 35000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<string>("all");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 4>(4);

  // Sync with URL params
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    if (sortParam) {
      setSelectedSort(sortParam);
    }
  }, [categoryParam, sortParam]);

  // Track PageView & Category View
  useEffect(() => {
    trackEvent("PageView", {
      page: "Shop",
      category: selectedCategory,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  // Available categories
  const categoryList: { label: string; value: string }[] = [
    { label: "All Collections", value: "all" },
    { label: "Eastern Wear", value: "eastern-wear" },
    { label: "Formal & Festive", value: "formal-wear" },
    { label: "Co-Ord Sets", value: "co-ord-sets" },
    { label: "Kurtis & Tunics", value: "kurtis" },
    { label: "Western Wear", value: "western-wear" },
    { label: "Dresses & Maxis", value: "dresses" },
    { label: "Handbags & Bags", value: "handbags" },
    { label: "Heritage Jewelry", value: "jewelry" },
    { label: "Scarves & Pashmina", value: "scarves" },
  ];

  // Available collections
  const collectionsList = [
    "all",
    "Festive Silk & Organza '26",
    "Velvet Soirée Edition",
    "Modern Prêt Everyday",
    "Chikankari Heirloom",
    "Leathergoods Capsule",
    "Heritage Jewels",
    "Silk Scarves & Wraps",
  ];

  const allSizes: ProductSize[] = ["XS", "S", "M", "L", "XL", "One Size"];

  const allColors = [
    { name: "Ivory", hex: "#FAF8F4" },
    { name: "Charcoal", hex: "#252321" },
    { name: "Muted Rose", hex: "#C69B98" },
    { name: "Gold", hex: "#C5A880" },
    { name: "Sand Beige", hex: "#EDE5DA" },
    { name: "Brown", hex: "#55443B" },
  ];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category
        if (selectedCategory !== "all" && product.category !== selectedCategory) {
          return false;
        }

        // Collection
        if (
          selectedCollection !== "all" &&
          product.collection !== selectedCollection
        ) {
          return false;
        }

        // Price
        if (
          product.price < priceRange[0] ||
          product.price > priceRange[1]
        ) {
          return false;
        }

        // Size
        if (selectedSizes.length > 0) {
          const hasSize = product.availableSizes.some((s) =>
            selectedSizes.includes(s)
          );
          if (!hasSize) return false;
        }

        // Color
        if (selectedColors.length > 0) {
          const hasColor = product.availableColors.some((c) =>
            selectedColors.some((sc) =>
              c.name.toLowerCase().includes(sc.toLowerCase())
            )
          );
          if (!hasColor) return false;
        }

        // In stock
        if (inStockOnly) {
          const totalStock = product.variants.reduce((a, b) => a + b.stock, 0);
          if (totalStock <= 0) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (selectedSort === "price-low") return a.price - b.price;
        if (selectedSort === "price-high") return b.price - a.price;
        if (selectedSort === "newest") {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (selectedSort === "best-selling") {
          return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        }
        // Default: featured
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [
    products,
    selectedCategory,
    selectedCollection,
    priceRange,
    selectedSizes,
    selectedColors,
    inStockOnly,
    selectedSort,
  ]);

  const toggleSize = (size: ProductSize) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (colorName: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorName)
        ? prev.filter((c) => c !== colorName)
        : [...prev, colorName]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setSelectedCollection("all");
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 35000]);
    setInStockOnly(false);
    setSelectedSort("featured");
    router.push("/shop");
  };

  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) +
    (selectedCollection !== "all" ? 1 : 0) +
    selectedSizes.length +
    selectedColors.length +
    (inStockOnly ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 35000 ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-[11px] uppercase tracking-[0.25em] text-brand-rose font-bold block mb-2">
          Haute Prêt &amp; Unstitched Couture
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-brand-charcoal font-medium">
          {categoryList.find((c) => c.value === selectedCategory)?.label ||
            "All Collections"}
        </h1>
        <p className="text-xs sm:text-sm text-brand-muted mt-2">
          Handcrafted in pure silks, fine lawn, and luxurious micro velvet. Delivered across Pakistan with Cash on Delivery.
        </p>
      </div>

      {/* Main Bar with Filters Trigger, Active Pills & Sorting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-brand-border">
        {/* Left: Mobile Filters Trigger & Results Count */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden px-4 py-2 bg-white border border-brand-border rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-2 text-brand-charcoal"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-brand-rose" />
            <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
          </button>

          <span className="text-xs text-brand-muted">
            Showing <strong>{filteredProducts.length}</strong> creations
          </span>
        </div>

        {/* Right: Grid Switcher & Sorting */}
        <div className="flex items-center gap-4 self-end md:self-auto">
          {/* Grid Toggle (Desktop) */}
          <div className="hidden lg:flex items-center gap-1 border border-brand-border rounded p-1 bg-white">
            <button
              onClick={() => setGridCols(3)}
              className={`p-1.5 rounded transition-colors ${
                gridCols === 3
                  ? "bg-brand-sand text-brand-charcoal"
                  : "text-brand-muted hover:text-brand-charcoal"
              }`}
              title="3 Columns"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridCols(4)}
              className={`p-1.5 rounded transition-colors ${
                gridCols === 4
                  ? "bg-brand-sand text-brand-charcoal"
                  : "text-brand-muted hover:text-brand-charcoal"
              }`}
              title="4 Columns"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-brand-muted hidden sm:inline">Sort:</span>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="text-xs bg-white border border-brand-border rounded px-3 py-2 text-brand-charcoal focus:outline-none focus:border-brand-rose font-medium"
            >
              <option value="featured">Featured Pieces</option>
              <option value="newest">Newest Arrivals</option>
              <option value="best-selling">Best Selling</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap mb-6 pb-4 border-b border-brand-border/60 text-xs">
          <span className="text-[11px] text-brand-muted uppercase font-semibold">
            Active:
          </span>

          {selectedCategory !== "all" && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-sand border border-brand-border text-brand-charcoal font-medium">
              <span>
                Category:{" "}
                {categoryList.find((c) => c.value === selectedCategory)?.label}
              </span>
              <button onClick={() => setSelectedCategory("all")}>
                <X className="w-3 h-3 text-brand-muted hover:text-brand-charcoal" />
              </button>
            </span>
          )}

          {selectedCollection !== "all" && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-sand border border-brand-border text-brand-charcoal font-medium">
              <span>Collection: {selectedCollection}</span>
              <button onClick={() => setSelectedCollection("all")}>
                <X className="w-3 h-3 text-brand-muted hover:text-brand-charcoal" />
              </button>
            </span>
          )}

          {selectedSizes.map((size) => (
            <span
              key={size}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-sand border border-brand-border text-brand-charcoal font-medium"
            >
              <span>Size: {size}</span>
              <button onClick={() => toggleSize(size)}>
                <X className="w-3 h-3 text-brand-muted hover:text-brand-charcoal" />
              </button>
            </span>
          ))}

          {selectedColors.map((color) => (
            <span
              key={color}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-sand border border-brand-border text-brand-charcoal font-medium"
            >
              <span>Color: {color}</span>
              <button onClick={() => toggleColor(color)}>
                <X className="w-3 h-3 text-brand-muted hover:text-brand-charcoal" />
              </button>
            </span>
          ))}

          {inStockOnly && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-sand border border-brand-border text-brand-charcoal font-medium">
              <span>In Stock Only</span>
              <button onClick={() => setInStockOnly(false)}>
                <X className="w-3 h-3 text-brand-muted hover:text-brand-charcoal" />
              </button>
            </span>
          )}

          <button
            onClick={clearAllFilters}
            className="text-xs text-brand-rose underline hover:text-brand-brown font-semibold ml-2 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        </div>
      )}

      {/* Main Layout: Sidebar Filters + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block space-y-8 pr-4 border-r border-brand-border/60">
          {/* Categories */}
          <div>
            <h3 className="font-serif text-sm uppercase tracking-wider font-semibold text-brand-charcoal mb-3">
              Categories
            </h3>
            <div className="space-y-1.5 text-xs">
              {categoryList.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`w-full text-left py-1 px-2 rounded transition-colors flex items-center justify-between ${
                    selectedCategory === cat.value
                      ? "bg-brand-charcoal text-white font-medium"
                      : "text-brand-charcoal/80 hover:bg-brand-sand"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className="text-[10px] opacity-70">
                    {cat.value === "all"
                      ? products.length
                      : products.filter((p) => p.category === cat.value).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif text-sm uppercase tracking-wider font-semibold text-brand-charcoal">
                Price (PKR)
              </h3>
              <span className="text-[11px] text-brand-muted">
                Up to {formatPKR(priceRange[1])}
              </span>
            </div>
            <input
              type="range"
              min="4000"
              max="35000"
              step="500"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], parseInt(e.target.value)])
              }
              className="w-full accent-brand-rose"
            />
            <div className="flex justify-between text-[10px] text-brand-muted mt-1">
              <span>Rs. 4,000</span>
              <span>Rs. 35,000</span>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="font-serif text-sm uppercase tracking-wider font-semibold text-brand-charcoal mb-3">
              Select Size
            </h3>
            <div className="grid grid-cols-3 gap-1.5">
              {allSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`py-1.5 text-xs rounded border text-center transition-all ${
                    selectedSizes.includes(size)
                      ? "bg-brand-charcoal text-white border-brand-charcoal font-bold"
                      : "bg-white text-brand-charcoal border-brand-border hover:border-brand-charcoal/60"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <h3 className="font-serif text-sm uppercase tracking-wider font-semibold text-brand-charcoal mb-3">
              Color Family
            </h3>
            <div className="space-y-1.5 text-xs">
              {allColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => toggleColor(color.name)}
                  className={`w-full flex items-center gap-2.5 py-1 px-2 rounded transition-colors ${
                    selectedColors.includes(color.name)
                      ? "bg-brand-rose/20 text-brand-charcoal font-semibold"
                      : "text-brand-charcoal/80 hover:bg-brand-sand"
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

          {/* Collections */}
          <div>
            <h3 className="font-serif text-sm uppercase tracking-wider font-semibold text-brand-charcoal mb-3">
              Curated Collections
            </h3>
            <div className="space-y-1 text-xs">
              {collectionsList.map((col) => (
                <button
                  key={col}
                  onClick={() => setSelectedCollection(col)}
                  className={`w-full text-left py-1 px-2 rounded truncate transition-colors ${
                    selectedCollection === col
                      ? "bg-brand-charcoal text-white font-medium"
                      : "text-brand-charcoal/80 hover:bg-brand-sand"
                  }`}
                >
                  {col === "all" ? "All Collections" : col}
                </button>
              ))}
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="pt-2 border-t border-brand-border">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-brand-charcoal font-medium">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded text-brand-charcoal focus:ring-brand-rose"
              />
              <span>In-Stock Pieces Only</span>
            </label>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                gridCols === 4 ? "xl:grid-cols-3" : "xl:grid-cols-3"
              } gap-6`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-white rounded border border-brand-border p-8">
              <div className="w-16 h-16 rounded-full bg-brand-sand flex items-center justify-center mx-auto mb-4 text-brand-rose">
                <Sparkles className="w-8 h-8 opacity-40" />
              </div>
              <h3 className="font-serif text-xl font-medium text-brand-charcoal mb-2">
                No designs match your criteria
              </h3>
              <p className="text-xs text-brand-muted max-w-sm mx-auto mb-6">
                Try widening your price range, clearing selected size filters, or viewing all couture categories.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-2.5 bg-brand-charcoal text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-brand-brown transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-brand-ivory shadow-drawer flex flex-col p-6 z-50 overflow-y-auto animate-slideLeft">
            <div className="flex items-center justify-between pb-4 border-b border-brand-border">
              <span className="font-serif text-lg font-medium text-brand-charcoal">
                Refine Collections
              </span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-brand-muted hover:text-brand-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 py-4 space-y-6">
              {/* Categories */}
              <div>
                <p className="text-xs uppercase font-bold tracking-wider text-brand-charcoal mb-2">
                  Category
                </p>
                <div className="space-y-1 text-xs">
                  {categoryList.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`w-full text-left py-1.5 px-2 rounded ${
                        selectedCategory === cat.value
                          ? "bg-brand-charcoal text-white font-medium"
                          : "text-brand-charcoal/80"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <p className="text-xs uppercase font-bold tracking-wider text-brand-charcoal mb-2">
                  Sizes
                </p>
                <div className="grid grid-cols-3 gap-1.5">
                  {allSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`py-1 text-xs rounded border text-center ${
                        selectedSizes.includes(size)
                          ? "bg-brand-charcoal text-white font-bold"
                          : "bg-white text-brand-charcoal border-brand-border"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <p className="text-xs uppercase font-bold tracking-wider text-brand-charcoal mb-2">
                  Max Price: {formatPKR(priceRange[1])}
                </p>
                <input
                  type="range"
                  min="4000"
                  max="35000"
                  step="500"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full accent-brand-rose"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-brand-border flex gap-2">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-2.5 border border-brand-charcoal text-brand-charcoal text-xs uppercase font-semibold rounded"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 bg-brand-charcoal text-white text-xs uppercase font-semibold rounded"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-xs">Loading collections...</div>}>
      <ShopContent />
    </Suspense>
  );
}
