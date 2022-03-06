module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { /** TODO: Add color palette */
    extend: {
      transitionProperty: {
        'width': 'width'
      }
    }
  },
  plugins: [],
}
