/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#08111F",
        mist: "#EEF4FF",
        brand: {
          50: "#EFF8FF",
          100: "#D9EEFF",
          200: "#B6DDFF",
          300: "#84C4FF",
          400: "#489FFF",
          500: "#1877F2",
          600: "#0F5FD2",
          700: "#114BA7",
          800: "#153F88",
          900: "#18356F"
        },
        accent: {
          100: "#FFF5CC",
          300: "#FFD76A",
          500: "#FFB703"
        }
      },
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"]
      },
      boxShadow: {
        panel: "0 24px 80px rgba(8, 17, 31, 0.12)",
        soft: "0 14px 40px rgba(24, 119, 242, 0.12)"
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(rgba(24,119,242,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(24,119,242,0.06) 1px, transparent 1px)"
      }
    },
  },
  plugins: [],
};
