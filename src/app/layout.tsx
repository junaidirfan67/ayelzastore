import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import { StoreShell } from "@/components/layout/StoreShell";

export const metadata: Metadata = {
  title: "Aleyza Store | Luxury Pakistani Women's Fashion & Prêt Couture",
  description:
    "Discover handcrafted raw silk kalidars, festive velvet edits, luxury lawn, tailored co-ord sets, and bespoke accessories. Express delivery across Pakistan with Cash on Delivery.",
  keywords: [
    "Pakistani fashion",
    "Eastern wear",
    "Raw silk kalidar",
    "Velvet kurta",
    "Co-ord sets",
    "Pakistani dresses",
    "Lahore couture",
    "Aleyza Store",
    "Pakistani lawn",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="theme-color" content="#FAF8F4" />
      </head>
      <body>
        <StoreProvider>
          <StoreShell>{children}</StoreShell>
        </StoreProvider>
      </body>
    </html>
  );
}
