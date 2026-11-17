import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          ivory: "#FAF8F4",
          beige: "#EDE5DA",
          charcoal: "#252321",
          rose: "#C69B98",
          brown: "#55443B",
          sand: "#F4EFEA",
          gold: "#C5A880",
          goldDark: "#9E7D47",
          border: "#E8E2D8",
          muted: "#766E65",
          accent: "#B85D43",
          emerald: "#2D5A43",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Cormorant Garamond", "Cinzel", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(37, 35, 33, 0.04)",
        card: "0 4px 20px rgba(37, 35, 33, 0.06)",
        dropdown: "0 10px 30px rgba(37, 35, 33, 0.12)",
        drawer: "-4px 0 24px rgba(37, 35, 33, 0.15)",
        modal: "0 20px 40px rgba(37, 35, 33, 0.2)",
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
        slideUp: "slideUp 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(16px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
