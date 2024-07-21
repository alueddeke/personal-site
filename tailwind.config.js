/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mint: "#D1E8E2",
        "deep-teal": "#19747E",
        "sky-blue": "#A9D6E5",
        "light-gray": "#E2E2E2",
        "dark-text": "#020808",
        "off-white": "#F8F8F8",
      },
    },
  },
  plugins: [],
};
