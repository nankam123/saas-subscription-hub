/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Scan everything in src for Tailwind classes
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8", // example custom color
        secondary: "#9333EA",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
}
