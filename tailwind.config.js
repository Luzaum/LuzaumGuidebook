/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  content: [
    './index.html',
    './App.tsx',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './modules/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        gold: {
          DEFAULT: "#F5C542",
          dark: "#E6B800",
          light: "#FFCC33",
        },
        neutral: {
          deep: "#0E0E0E",
          dark: "#1C1C1C",
          offwhite: "#F5F5F5",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        surface: {
          DEFAULT: "hsl(var(--surface))",
          2: "hsl(var(--surface-2))",
        },
        // VetEletrolitico Colors
        "vet-primary": "#ec7f13",
        "vet-primary-hover": "#d66e0a",
        "vet-bg-light": "#f8f7f6",
        "vet-bg-dark": "#221910",
        "vet-surface-dark": "#332619",
        "vet-surface-darker": "#1a120b",
        "vet-surface-hover": "#483623",
        "vet-text-main": "#FFFFFF",
        "vet-text-secondary": "#c9ad92",
        "vet-border-brown": "#4e3d2a",
        "vet-input-bg": "#332619",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "float": {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow": {
          "0%,100%": { opacity: 0.8 },
          "50%": { opacity: 1 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "float": "float 5s ease-in-out infinite",
        "glow": "glow 3s ease-in-out infinite",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Sora", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
