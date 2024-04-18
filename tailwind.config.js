/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './images/**/*.svg',
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
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
        border: "#1e293b",
        input: "#1e293b",
        ring: "#cbd5e1",
        background: "#020817",
        foreground: "#f8fafc",
        primary: {
          DEFAULT: "#f8fafc",
          foreground: "	#0f172a",
        },
        secondary: {
          DEFAULT: "#1e293b",
          foreground: "#f8fafc",
        },
        destructive: {
          DEFAULT: "#7f1d1d",
          foreground: "#f8fafc",
        },
        muted: {
          DEFAULT: "#1e293b",
          foreground: "	#94a3b8",
        },
        accent: {
          DEFAULT: "#1e293b",
          foreground: "#f8fafc",
        },
        popover: {
          DEFAULT: "#020817",
          foreground: "#f8fafc",
        },
        card: {
          DEFAULT: "#020817",
          foreground: "#f8fafc",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        'geist': 'geist-font'
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}