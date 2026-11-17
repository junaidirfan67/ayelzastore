"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ShieldCheck,
  ChevronDown,
  Phone,
  Sparkles,
  Compass,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { AnnouncementBar } from "./AnnouncementBar";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const {
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    currentCustomer,
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on page navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setAccountDropdownOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const navLinks = [
    { name: "New Arrivals", href: "/shop?sort=newest", highlight: true },
    {
      name: "Eastern Wear",
      href: "/shop?category=eastern-wear",
      subItems: [
        { title: "All Eastern Wear", href: "/shop?category=eastern-wear" },
        { title: "Raw Silk Kalidars", href: "/shop?category=eastern-wear" },
        { title: "Gold Jacquard Peshwas", href: "/shop?category=eastern-wear" },
        { title: "Embroidered Angrakhas", href: "/shop?category=eastern-wear" },
      ],
    },
    {
      name: "Formal & Festive",
      href: "/shop?category=formal-wear",
      subItems: [
        { title: "All Formal Wear", href: "/shop?category=formal-wear" },
        { title: "Velvet Soirée Edition", href: "/shop?category=formal-wear" },
        { title: "Chiffon Sarees", href: "/shop?category=formal-wear" },
        { title: "Heirloom Ensembles", href: "/shop?category=formal-wear" },
      ],
    },
    { name: "Co-Ord Sets", href: "/shop?category=co-ord-sets" },
    { name: "Kurtis", href: "/shop?category=kurtis" },
    { name: "Western Wear", href: "/shop?category=western-wear" },
    { name: "Dresses", href: "/shop?category=dresses" },
    {
      name: "Accessories",
      href: "/shop?category=handbags",
      subItems: [
        { title: "Leather Handbags", href: "/shop?category=handbags" },
        { title: "Heritage Jewelry", href: "/shop?category=jewelry" },
        { title: "Mulberry Silk & Pashmina", href: "/shop?category=scarves" },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Top Utility Bar */}
      <div className="bg-brand-sand/70 border-b border-brand-border/60 text-[11px] text-brand-muted py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-brand-rose" />
              Concierge: +92 42 3578 9901 (10 AM – 8 PM PKT)
            </span>
            <Link
              href="/track"
              className="hover:text-brand-charcoal transition-colors flex items-center gap-1"
            >
              <Compass className="w-3 h-3 text-brand-rose" />
              Track Your Order
            </Link>
          </div>

          <div className="flex items-center gap-5">
            <span className="text-brand-charcoal/80 font-medium">
              Flagship Ateliers: Gulberg III, Lahore • Clifton, Karachi
            </span>
            <span className="text-brand-border">|</span>
            <span className="font-semibold text-brand-charcoal">
              PKR (Rs.)
            </span>
            <span className="text-brand-border">|</span>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded bg-brand-charcoal text-white hover:bg-brand-brown transition-colors"
            >
              <ShieldCheck className="w-3 h-3 text-brand-rose" />
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-brand-ivory/95 backdrop-blur-md shadow-sm py-3"
            : "bg-brand-ivory py-4"
        } border-b border-brand-border/80`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 text-brand-charcoal hover:text-brand-rose transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 ml-1 text-brand-charcoal hover:text-brand-rose transition-colors"
                aria-label="Search catalog"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Brand Logo / Wordmark */}
            <div className="flex-1 lg:flex-none text-center lg:text-left">
              <Link href="/" className="inline-block group">
                <span className="font-serif text-2xl sm:text-3xl font-medium tracking-[0.2em] text-brand-charcoal uppercase block leading-none transition-transform group-hover:scale-[1.01]">
                  Aleyza
                </span>
                <span className="text-[9px] uppercase tracking-[0.35em] text-brand-muted block mt-1 font-light">
                  Haute Prêt • Lahore
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-7">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative group py-2"
                  onMouseEnter={() =>
                    link.subItems ? setActiveDropdown(link.name) : null
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`text-xs uppercase tracking-[0.16em] font-medium transition-colors pb-1 flex items-center gap-1 ${
                      pathname === link.href
                        ? "text-brand-rose border-b-2 border-brand-rose font-semibold"
                        : "text-brand-charcoal/80 hover:text-brand-charcoal"
                    } ${
                      link.highlight
                        ? "text-brand-rose hover:text-brand-charcoal"
                        : ""
                    }`}
                  >
                    {link.name}
                    {link.subItems && (
                      <ChevronDown className="w-3 h-3 text-brand-muted transition-transform group-hover:rotate-180" />
                    )}
                  </Link>

                  {/* Flyout Dropdown */}
                  {link.subItems && activeDropdown === link.name && (
                    <div className="absolute top-full left-0 w-56 bg-brand-ivory border border-brand-border shadow-dropdown py-3 px-2 rounded-sm animate-fadeIn z-50">
                      <div className="flex flex-col space-y-1">
                        {link.subItems.map((sub) => (
                          <Link
                            key={sub.title}
                            href={sub.href}
                            className="px-3 py-2 text-xs text-brand-charcoal/80 hover:text-brand-charcoal hover:bg-brand-sand rounded transition-colors"
                          >
                            {sub.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Desktop Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden lg:flex items-center gap-2 text-xs uppercase tracking-wider text-brand-charcoal/70 hover:text-brand-charcoal py-1.5 px-3 rounded-full bg-brand-sand/60 hover:bg-brand-sand border border-brand-border/60 transition-all"
                aria-label="Search"
              >
                <Search className="w-3.5 h-3.5 text-brand-muted" />
                <span>Search catalog...</span>
              </button>

              {/* Customer Account Button */}
              <div className="relative">
                <button
                  onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                  className="p-2 text-brand-charcoal hover:text-brand-rose transition-colors relative"
                  aria-label="Customer Account"
                >
                  <User className="w-5 h-5" />
                  {currentCustomer && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500" />
                  )}
                </button>

                {/* Account dropdown */}
                {accountDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-64 bg-brand-ivory border border-brand-border shadow-dropdown p-4 rounded-sm animate-fadeIn z-50"
                    onMouseLeave={() => setAccountDropdownOpen(false)}
                  >
                    {currentCustomer ? (
                      <div>
                        <div className="border-b border-brand-border pb-3 mb-3">
                          <p className="text-[11px] text-brand-muted uppercase tracking-wider">
                            Welcome back
                          </p>
                          <p className="text-sm font-semibold text-brand-charcoal truncate">
                            {currentCustomer.name}
                          </p>
                          <span className="inline-block text-[10px] uppercase font-semibold px-2 py-0.5 mt-1 bg-brand-rose/20 text-brand-brown rounded">
                            {currentCustomer.segment} Patron
                          </span>
                        </div>
                        <div className="flex flex-col space-y-2 text-xs">
                          <Link
                            href="/account"
                            className="text-brand-charcoal/80 hover:text-brand-rose transition-colors py-1"
                          >
                            My Dashboard & Orders
                          </Link>
                          <Link
                            href="/track"
                            className="text-brand-charcoal/80 hover:text-brand-rose transition-colors py-1"
                          >
                            Track Live Consignment
                          </Link>
                          <Link
                            href="/admin"
                            className="text-brand-rose font-medium hover:underline pt-2 border-t border-brand-border flex items-center justify-between"
                          >
                            <span>Open Admin Suite</span>
                            <ShieldCheck className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-2">
                        <p className="text-xs text-brand-muted mb-3">
                          Sign in to access your orders, saved addresses, and VIP perks.
                        </p>
                        <Link
                          href="/account"
                          className="block w-full py-2 bg-brand-charcoal text-white text-xs uppercase tracking-widest font-medium hover:bg-brand-brown transition-colors rounded-sm mb-2"
                        >
                          Sign In / Register
                        </Link>
                        <Link
                          href="/track"
                          className="text-xs text-brand-rose hover:underline"
                        >
                          Track Order as Guest
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Wishlist Icon */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="p-2 text-brand-charcoal hover:text-brand-rose transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-brand-rose text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Bag Icon */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-brand-charcoal hover:text-brand-rose transition-colors relative"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-brand-charcoal text-brand-ivory text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-brand-ivory shadow-drawer flex flex-col p-6 z-50 overflow-y-auto animate-slideRight">
            <div className="flex items-center justify-between pb-4 border-b border-brand-border">
              <span className="font-serif text-xl tracking-[0.2em] font-medium text-brand-charcoal">
                ALEYZA
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-brand-charcoal hover:text-brand-rose transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="py-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded bg-brand-sand border border-brand-border text-xs text-brand-muted"
              >
                <Search className="w-4 h-4" />
                <span>Search lawn, silks, kurtis...</span>
              </button>
            </div>

            <div className="flex-1 space-y-4 py-2">
              <p className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">
                Collections
              </p>
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-medium tracking-wide text-brand-charcoal hover:text-brand-rose transition-colors py-1 flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    {link.highlight && (
                      <span className="text-[9px] uppercase px-1.5 py-0.5 bg-brand-rose/20 text-brand-rose font-bold rounded">
                        New
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              <div className="pt-6 border-t border-brand-border space-y-3">
                <p className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">
                  Client Services
                </p>
                <div className="flex flex-col space-y-2 text-xs text-brand-charcoal/80">
                  <Link
                    href="/track"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1 hover:text-brand-rose"
                  >
                    Track Your Consignment
                  </Link>
                  <Link
                    href="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1 hover:text-brand-rose"
                  >
                    Customer Account
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1 hover:text-brand-rose"
                  >
                    Customer Care & Ateliers
                  </Link>
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 text-brand-rose font-semibold flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Switch to Admin Dashboard
                  </Link>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-brand-border text-[11px] text-brand-muted text-center">
              Aleyza Store • Delivered across Pakistan
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
