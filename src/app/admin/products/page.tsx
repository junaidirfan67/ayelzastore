"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Copy,
  ExternalLink,
  Sparkles,
  Check,
  X,
  Package,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useStore } from "@/context/StoreContext";
import { Product, ProductCategory, ProductSize } from "@/types";
import { formatPKR } from "@/lib/utils";

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form state for creating / editing
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ProductCategory>("eastern-wear");
  const [collection, setCollection] = useState("Festive Silk & Organza '26");
  const [price, setPrice] = useState(18500);
  const [compareAtPrice, setCompareAtPrice] = useState(21000);
  const [costPrice, setCostPrice] = useState(9000);
  const [sku, setSku] = useState("ALZ-NEW-01");
  const [description, setDescription] = useState("");
  const [fabric, setFabric] = useState("Pure Raw Silk");
  const [careInstructions, setCareInstructions] = useState("Dry clean only");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80");
  const [isFeatured, setIsFeatured] = useState(true);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(true);

  const openCreateModal = () => {
    setEditingProduct(null);
    setTitle("");
    setCategory("eastern-wear");
    setCollection("Festive Silk & Organza '26");
    setPrice(18500);
    setCompareAtPrice(21000);
    setCostPrice(9000);
    setSku(`ALZ-${Math.floor(100 + Math.random() * 900)}`);
    setDescription("Exquisite artisanal creation crafted with hand embroidery.");
    setFabric("Pure Raw Silk");
    setCareInstructions("Dry clean only.");
    setImageUrl("https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80");
    setIsFeatured(true);
    setIsBestSeller(false);
    setIsNewArrival(true);
    setModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setTitle(product.title);
    setCategory(product.category);
    setCollection(product.collection);
    setPrice(product.price);
    setCompareAtPrice(product.compareAtPrice || 0);
    setCostPrice(product.costPrice || Math.round(product.price * 0.5));
    setSku(product.sku);
    setDescription(product.description);
    setFabric(product.fabric);
    setCareInstructions(product.careInstructions);
    setImageUrl(product.images[0] || "");
    setIsFeatured(product.isFeatured);
    setIsBestSeller(product.isBestSeller);
    setIsNewArrival(product.isNewArrival);
    setModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const categoryLabels: Record<ProductCategory, string> = {
      "eastern-wear": "Eastern Wear",
      "formal-wear": "Formal Wear",
      "casual-wear": "Casual Wear",
      "dresses": "Dresses",
      "co-ord-sets": "Co-Ord Sets",
      "kurtis": "Kurtis",
      "western-wear": "Western Wear",
      "handbags": "Handbags",
      "jewelry": "Jewelry",
      "scarves": "Scarves",
    };

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const availableSizes: ProductSize[] = ["XS", "S", "M", "L", "XL"];
    const variants = availableSizes.map((s, idx) => ({
      id: `v-${Date.now()}-${idx}`,
      size: s,
      colorName: "Original",
      colorHex: "#FAF8F4",
      stock: 12,
      sku: `${sku}-${s}`,
    }));

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        title,
        category,
        categoryLabel: categoryLabels[category] || "Eastern Wear",
        collection,
        price,
        compareAtPrice: compareAtPrice > price ? compareAtPrice : undefined,
        costPrice,
        sku,
        description,
        fabric,
        careInstructions,
        images: [imageUrl, ...(editingProduct.images.slice(1) || [])],
        isFeatured,
        isBestSeller,
        isNewArrival,
      });
    } else {
      const newProd: Product = {
        id: `prod-${Date.now()}`,
        title,
        slug,
        category,
        categoryLabel: categoryLabels[category] || "Eastern Wear",
        collection,
        price,
        compareAtPrice: compareAtPrice > price ? compareAtPrice : undefined,
        costPrice,
        sku,
        description,
        fabric,
        careInstructions,
        images: [imageUrl],
        variants,
        availableSizes,
        availableColors: [{ name: "Original", hex: "#FAF8F4" }],
        isFeatured,
        isBestSeller,
        isNewArrival,
        rating: 5.0,
        reviewCount: 1,
        createdAt: new Date().toISOString().split("T")[0],
      };
      addProduct(newProd);
    }

    setModalOpen(false);
  };

  const handleDuplicate = (product: Product) => {
    const dup: Product = {
      ...product,
      id: `prod-dup-${Date.now()}`,
      title: `${product.title} (Copy)`,
      slug: `${product.slug}-copy-${Date.now()}`,
      sku: `${product.sku}-CP`,
      createdAt: new Date().toISOString().split("T")[0],
    };
    addProduct(dup);
  };

  // Filter products
  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== "all" && p.category !== selectedCategory) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-rose block mb-1">
              Catalog Management
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal">
              Products &amp; Master Inventory
            </h1>
            <p className="text-xs text-brand-muted mt-1">
              Create, edit, price, and manage couture stock across all luxury categories.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 bg-brand-charcoal text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-brand-brown transition-colors flex items-center justify-center gap-2 shadow-sm self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 text-brand-rose" />
            <span>Create New Product</span>
          </button>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded border border-brand-border p-4 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-brand-muted absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by product name, SKU, or fabric..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-brand-border rounded focus:outline-none focus:border-brand-rose bg-brand-ivory text-brand-charcoal"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs px-3 py-2 border border-brand-border rounded bg-white text-brand-charcoal focus:outline-none focus:border-brand-rose"
            >
              <option value="all">All Categories ({products.length})</option>
              <option value="eastern-wear">Eastern Wear</option>
              <option value="formal-wear">Formal Wear</option>
              <option value="co-ord-sets">Co-Ord Sets</option>
              <option value="kurtis">Kurtis &amp; Tunics</option>
              <option value="western-wear">Western Wear</option>
              <option value="dresses">Dresses</option>
              <option value="handbags">Handbags</option>
              <option value="jewelry">Jewelry</option>
              <option value="scarves">Scarves</option>
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded border border-brand-border shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-sand/70 text-brand-charcoal uppercase font-bold tracking-wider border-b border-brand-border">
                <tr>
                  <th className="py-3.5 px-4">Product Piece</th>
                  <th className="py-3.5 px-4">SKU</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Price (PKR)</th>
                  <th className="py-3.5 px-4 text-center">Available Stock</th>
                  <th className="py-3.5 px-4 text-center">Badges</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {filteredProducts.map((p) => {
                  const totalStock = p.variants.reduce((a, b) => a + b.stock, 0);
                  return (
                    <tr key={p.id} className="hover:bg-brand-sand/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-14 rounded overflow-hidden bg-brand-sand shrink-0 border border-brand-border/80">
                            <Image
                              src={p.images[0]}
                              alt={p.title}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <div>
                            <span className="font-serif font-semibold text-brand-charcoal text-sm block line-clamp-1">
                              {p.title}
                            </span>
                            <span className="text-[10px] text-brand-muted">
                              {p.collection}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-mono font-medium text-brand-charcoal">
                        {p.sku}
                      </td>

                      <td className="py-3 px-4 text-brand-muted">
                        {p.categoryLabel}
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-bold text-brand-charcoal block">
                          {formatPKR(p.price)}
                        </span>
                        {p.compareAtPrice && (
                          <span className="text-[10px] text-brand-muted line-through">
                            {formatPKR(p.compareAtPrice)}
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                            totalStock > 10
                              ? "bg-emerald-50 text-emerald-800"
                              : totalStock > 0
                              ? "bg-amber-50 text-amber-800"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {totalStock > 0 ? `${totalStock} in stock` : "Sold Out"}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {p.isFeatured && (
                            <span className="px-1.5 py-0.5 bg-brand-rose/20 text-brand-brown text-[9px] uppercase font-bold rounded">
                              Featured
                            </span>
                          )}
                          {p.isBestSeller && (
                            <span className="px-1.5 py-0.5 bg-brand-charcoal text-white text-[9px] uppercase font-bold rounded">
                              Best
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/product/${p.slug}`}
                            target="_blank"
                            className="p-1.5 text-brand-muted hover:text-brand-charcoal rounded hover:bg-brand-sand"
                            title="Preview on storefront"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => handleDuplicate(p)}
                            className="p-1.5 text-brand-muted hover:text-brand-charcoal rounded hover:bg-brand-sand"
                            title="Duplicate product"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => openEditModal(p)}
                            className="p-1.5 text-brand-muted hover:text-blue-600 rounded hover:bg-brand-sand"
                            title="Edit product"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-1.5 text-brand-muted hover:text-red-600 rounded hover:bg-brand-sand"
                            title="Delete product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />

          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="relative w-full max-w-2xl bg-white rounded shadow-modal border border-brand-border p-6 z-50 animate-slideUp">
              <div className="flex items-center justify-between pb-4 border-b border-brand-border mb-4">
                <h2 className="font-serif text-lg font-bold text-brand-charcoal">
                  {editingProduct ? "Edit Product" : "Create New Couture Piece"}
                </h2>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1 text-brand-muted hover:text-brand-charcoal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className="block text-brand-charcoal font-medium mb-1">
                      Product Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Meherbaan Embroidered Raw Silk Kalidar"
                      className="w-full px-3 py-2 border border-brand-border rounded focus:outline-none focus:border-brand-rose"
                    />
                  </div>

                  <div>
                    <label className="block text-brand-charcoal font-medium mb-1">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as ProductCategory)}
                      className="w-full px-3 py-2 border border-brand-border rounded focus:outline-none focus:border-brand-rose bg-white"
                    >
                      <option value="eastern-wear">Eastern Wear</option>
                      <option value="formal-wear">Formal Wear</option>
                      <option value="co-ord-sets">Co-Ord Sets</option>
                      <option value="kurtis">Kurtis</option>
                      <option value="western-wear">Western Wear</option>
                      <option value="dresses">Dresses</option>
                      <option value="handbags">Handbags</option>
                      <option value="jewelry">Jewelry</option>
                      <option value="scarves">Scarves</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-brand-charcoal font-medium mb-1">
                      SKU
                    </label>
                    <input
                      type="text"
                      required
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      className="w-full px-3 py-2 border border-brand-border rounded font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-brand-charcoal font-medium mb-1">
                      Retail Price (PKR) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-brand-border rounded font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-brand-charcoal font-medium mb-1">
                      Compare at Price (PKR)
                    </label>
                    <input
                      type="number"
                      value={compareAtPrice}
                      onChange={(e) => setCompareAtPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-brand-border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-brand-charcoal font-medium mb-1">
                      Cost Price (COGS in PKR)
                    </label>
                    <input
                      type="number"
                      value={costPrice}
                      onChange={(e) => setCostPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-brand-border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-brand-charcoal font-medium mb-1">
                      Curated Collection
                    </label>
                    <input
                      type="text"
                      value={collection}
                      onChange={(e) => setCollection(e.target.value)}
                      className="w-full px-3 py-2 border border-brand-border rounded"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-brand-charcoal font-medium mb-1">
                      Primary High-Res Image URL
                    </label>
                    <input
                      type="url"
                      required
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full px-3 py-2 border border-brand-border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-brand-charcoal font-medium mb-1">
                      Fabric Composition
                    </label>
                    <input
                      type="text"
                      value={fabric}
                      onChange={(e) => setFabric(e.target.value)}
                      className="w-full px-3 py-2 border border-brand-border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-brand-charcoal font-medium mb-1">
                      Care Instructions
                    </label>
                    <input
                      type="text"
                      value={careInstructions}
                      onChange={(e) => setCareInstructions(e.target.value)}
                      className="w-full px-3 py-2 border border-brand-border rounded"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-brand-charcoal font-medium mb-1">
                      Product Description
                    </label>
                    <textarea
                      rows={2}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-3 py-2 border border-brand-border rounded"
                    />
                  </div>
                </div>

                {/* Toggles */}
                <div className="flex items-center gap-6 pt-2 border-t border-brand-border">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="rounded text-brand-charcoal"
                    />
                    <span>Featured Piece</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isBestSeller}
                      onChange={(e) => setIsBestSeller(e.target.checked)}
                      className="rounded text-brand-charcoal"
                    />
                    <span>Mark Best Seller</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isNewArrival}
                      onChange={(e) => setIsNewArrival(e.target.checked)}
                      className="rounded text-brand-charcoal"
                    />
                    <span>New Arrival</span>
                  </label>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-brand-border">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 border border-brand-border rounded text-brand-muted hover:text-brand-charcoal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-brand-charcoal text-white font-semibold rounded hover:bg-brand-brown"
                  >
                    {editingProduct ? "Save Changes" : "Publish to Store"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
