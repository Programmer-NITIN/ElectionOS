import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#131316",
        "on-background": "#e4e1e6",
        surface: "#131316",
        "surface-dim": "#131316",
        "surface-bright": "#39393c",
        "surface-container-lowest": "#0e0e11",
        "surface-container-low": "#1b1b1e",
        "surface-container": "#1f1f22",
        "surface-container-high": "#2a2a2d",
        "surface-container-highest": "#353438",
        "surface-variant": "#353438",
        "surface-tint": "#00dce5",
        "on-surface": "#e4e1e6",
        "on-surface-variant": "#b9caca",
        "inverse-surface": "#e4e1e6",
        "inverse-on-surface": "#303033",
        primary: "#e9feff",
        "on-primary": "#003739",
        "primary-container": "#00f5ff",
        "on-primary-container": "#006c71",
        "primary-fixed": "#63f7ff",
        "primary-fixed-dim": "#00dce5",
        "inverse-primary": "#00696e",
        secondary: "#bbc3ff",
        "on-secondary": "#001d93",
        "secondary-container": "#0231de",
        "on-secondary-container": "#b1bbff",
        "secondary-fixed": "#dee0ff",
        "secondary-fixed-dim": "#bbc3ff",
        tertiary: "#fef8ff",
        "on-tertiary": "#370096",
        "tertiary-container": "#e3d8ff",
        "on-tertiary-container": "#6b37ed",
        "tertiary-fixed": "#e8deff",
        "tertiary-fixed-dim": "#cdbdff",
        error: "#ffb4ab",
        "on-error": "#690005",
        "error-container": "#93000a",
        "on-error-container": "#ffdad6",
        outline: "#849495",
        "outline-variant": "#3a494a",
        // Custom accent colors
        "neon-cyan": "#00F5FF",
        "electric-blue": "#3D5AFE",
        "ai-purple": "#7C4DFF",
        "deep-purple": "#6B37ED",
      },
      fontFamily: {
        geist: ["Geist", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "display-lg": [
          "48px",
          {
            lineHeight: "1.1",
            letterSpacing: "-0.02em",
            fontWeight: "800",
          },
        ],
        "headline-md": [
          "32px",
          {
            lineHeight: "1.2",
            letterSpacing: "-0.01em",
            fontWeight: "700",
          },
        ],
        "headline-sm": [
          "24px",
          {
            lineHeight: "1.3",
            fontWeight: "600",
          },
        ],
        "body-lg": [
          "18px",
          {
            lineHeight: "1.6",
            fontWeight: "400",
          },
        ],
        "body-md": [
          "16px",
          {
            lineHeight: "1.5",
            fontWeight: "400",
          },
        ],
        "data-mono": [
          "14px",
          {
            lineHeight: "1.4",
            letterSpacing: "0.05em",
            fontWeight: "500",
          },
        ],
        "label-caps": [
          "12px",
          {
            lineHeight: "1.2",
            fontWeight: "700",
          },
        ],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
      },
      spacing: {
        unit: "4px",
        gutter: "24px",
        margin: "40px",
        "container-max": "1440px",
      },
      boxShadow: {
        "neon-cyan": "0 0 15px rgba(0, 245, 255, 0.3)",
        "neon-cyan-lg": "0 0 30px rgba(0, 245, 255, 0.4)",
        "ai-purple": "0 0 15px rgba(124, 77, 255, 0.3)",
        "ai-purple-lg": "0 0 40px rgba(107, 55, 237, 0.15)",
        "inner-cyan": "inset 0 0 10px rgba(0, 220, 229, 0.2)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-pulse":
          "glowPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        glowPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
