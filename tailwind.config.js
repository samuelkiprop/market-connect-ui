/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        mint: "#16C39E",
        skobeloff: "#0E7976",
        turquoise: "#06D4C6",
        black: "#000000",
        "blue-munsell": "#1A8A9E",
      }
    },
  },
  plugins: [],
};
