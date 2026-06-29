import type { Config } from "tailwindcss";

// Switch Books — "Navy & Gold" palette.
// Deep navy surfaces + warm gold accent + soft warm-white backgrounds.
// Token names are preserved from the base theme so existing component class
// usage stays stable; only the hex values change. Read the names by ROLE,
// not by literal colour:
//   cream  = light warm-white backgrounds
//   sand   = neutral borders / dividers
//   champagne = PRIMARY ACCENT (gold) — eyebrows, bullets, hovers, buttons
//   cocoa  = text + dark surfaces (now navy)
//   ink    = deepest navy
//   blush  = soft gold tints (pills, badges, gentle washes)
//   gold   = explicit gold detailing

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Background warmth — soft, warm off-whites.
        cream: {
          50: "#FAF8F3",
          100: "#F3EFE6",
          200: "#E9E3D5",
        },
        // Soft borders / dividers, neutral warm-grey.
        sand: {
          100: "#E6DECF",
          200: "#CFC3A8",
          300: "#A89A78",
        },
        // Primary accent — gold (was rose/champagne).
        // Used for eyebrow text, decorative bullets, hover + button states.
        champagne: {
          DEFAULT: "#C9A24B",
          light: "#DCBD73",
          dark: "#A07C2E",
        },
        // Text + dark surfaces. cocoa-300 is the deep navy used for the
        // footer, dark sections and the logo ink tone.
        cocoa: {
          50: "#5A6478",
          100: "#2C3A5C",
          200: "#1B2A4A",
          300: "#14213D",
        },
        ink: "#14213D",
        // Gold tints — for soft pills, badges and gentle background washes.
        blush: {
          50: "#FBF6E9",
          100: "#F4E9CC",
          200: "#E9D6A3",
          300: "#DCC07A",
        },
        // Explicit gold tone for "gold detailing" treatments.
        gold: {
          DEFAULT: "#C9A24B",
          light: "#DCBD73",
        },
      },
      fontFamily: {
        serif: ["var(--font-display)", "Lora", "Georgia", "serif"],
        sans: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
        wordmark: ["var(--font-wordmark)", "Cormorant Garamond", "Georgia", "serif"],
      },
      letterSpacing: {
        wider: "0.08em",
        widest: "0.2em",
      },
      maxWidth: {
        "8xl": "88rem",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.8s ease-out forwards",
        fadeIn: "fadeIn 1s ease-out forwards",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
