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
        toyota: {
          red: "#EB0A1E",
          "red-dark": "#C00817",
          "red-light": "#FF1F30",
        },
        platinum: "#E8E8EE",
        gold: "#C9A84C",
        "gold-light": "#E8C870",
        surface: {
          DEFAULT: "#0D0D12",
          elevated: "#141420",
          glass: "rgba(255,255,255,0.04)",
        },
        ink: {
          primary: "#FFFFFF",
          secondary: "#A0A0B4",
          muted: "#5A5A72",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient":
          "linear-gradient(135deg, #050507 0%, #0A0A14 50%, #0D0816 100%)",
        "red-glow":
          "radial-gradient(ellipse at center, rgba(235,10,30,0.15) 0%, transparent 70%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        shimmer: "shimmer 2s linear infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "slide-in-right": "slideInRight 0.5s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(235,10,30,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(235,10,30,0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glass: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
        "glass-lg":
          "0 8px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)",
        "red-glow": "0 0 30px rgba(235,10,30,0.4)",
        "red-glow-lg": "0 0 60px rgba(235,10,30,0.3)",
        premium:
          "0 20px 80px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
