import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          DEFAULT: "#D4A86A",
          light: "#E8C99A",
          dark: "#B88A4A",
        },
        cream: {
          DEFAULT: "#F5EDD9",
          light: "#FAF7F0",
          dark: "#EDE0C8",
        },
        charcoal: {
          DEFAULT: "#1C1C1C",
          soft: "#2A2A2A",
          muted: "#4A4A4A",
        },
        crimson: {
          DEFAULT: "#C41E3A",
          dark: "#A01830",
          light: "#E03050",
        },
        forest: "#2D5A3D",
        ink: {
          primary: "#1C1C1C",
          secondary: "#4A4A4A",
          muted: "#8A8A8A",
          light: "#C0B8A8",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
      boxShadow: {
        "crimson-glow": "0 0 30px rgba(196,30,58,0.35)",
        "crimson-glow-lg": "0 0 60px rgba(196,30,58,0.25)",
        "sand-glow": "0 0 40px rgba(212,168,106,0.3)",
        warm: "0 4px 24px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)",
        "warm-lg": "0 12px 48px rgba(0,0,0,0.16), 0 4px 12px rgba(0,0,0,0.1)",
      },
      backgroundImage: {
        "cream-texture": "linear-gradient(135deg, #F5EDD9 0%, #EDE0C8 100%)",
        "sand-gradient": "linear-gradient(135deg, #D4A86A 0%, #B88A4A 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
