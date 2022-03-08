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
    },
    colors: {
      'dark-mode-dark-background': '#231F20',
      'dark-mode-lighter-dark-background': '#363133',
      'main-text-color': '#FFFFFA',
      'green-accent-color': '#2A7221',
      'purple-accent-color': '#998FC7',
      'blue-accent-color': '#788AA3'
    }
  },
  plugins: [],
}
