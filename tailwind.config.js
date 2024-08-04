/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      colors: {
        mint: "#D1E8E2",
        "deep-teal": "#19747E",
        "sky-blue": {
          DEFAULT: "#A9D6E5",
          100: "#F0F8FB",
          200: "#D4EAF3",
          300: "#A9D6E5", // original sky-blue
          400: "#7EC2D7",
          500: "#53AECA",
          600: "#3497B7",
          700: "#287690",
          800: "#1C5569",
          900: "#103341",
        },
        "light-gray": "#E2E2E2",
        "dark-text": "#020808",
        "off-white": "#F8F8F8",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        roboto: ["Roboto", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
