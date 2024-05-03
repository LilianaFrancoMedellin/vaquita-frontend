/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Fredoka", "sans-serif"],
      },
      colors: {
        "vaki-green": "#66B04C",
        "vaki-red": "#FF2530",
        "vaki-black": "#3A3A3A",
        "vaki-primary": "#36190D",
        "vaki-secondary": "#FFA72F",
      },
    },
  },
  plugins: [],
};
