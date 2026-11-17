"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CartDrawer } from "../cart/CartDrawer";
import { WishlistDrawer } from "../wishlist/WishlistDrawer";
import { SearchModal } from "../search/SearchModal";
import { QuickViewModal } from "../product/QuickViewModal";
import { ToastContainer } from "../ui/ToastContainer";

export const StoreShell: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return (
      <>
        {children}
        <ToastContainer />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-ivory text-brand-charcoal selection:bg-brand-rose selection:text-white">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <QuickViewModal />
      <ToastContainer />
    </div>
  );
};
