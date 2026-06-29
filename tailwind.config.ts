import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px"
      }
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#F4C400",
          foreground: "#000000"
        },
        secondary: {
          DEFAULT: "#000000",
          foreground: "#FFFFFF"
        },
        accent: {
          DEFAULT: "#F3F4F6",
          foreground: "#111827"
        },
        muted: {
          DEFAULT: "#F9FAFB",
          foreground: "#6B7280"
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#111827"
        }
      },
      borderRadius: {
        lg: "1rem",
        md: "0.75rem",
        sm: "0.5rem"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        float: "float 4s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
