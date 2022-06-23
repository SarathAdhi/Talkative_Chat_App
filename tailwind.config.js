module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{html,js}",
    "./components/**/*.{html,js}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "loading-gif": "url('/loading2.gif')",
      },
    },
  },
  plugins: [],
};
