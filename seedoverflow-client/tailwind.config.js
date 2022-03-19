module.exports = {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  purge: {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    options: {
      safelist: [/^bg/, /^text/, /^fill/]
    }
  },
  darkMode: 'class',
  mode: 'jit',
  theme: { /** TODO: Add color palette */
    extend: {
      transitionProperty: {
        'width': 'width'
      }
    },
    colors: {
      'dark': '#1E1E24',
      'dark-comp': '#363640',
      'light': '#FBFAF5',
      'light-comp': '#d9d8d2',
      'dark-text': '#FBFAF5',
      'light-text': '#000000',
      'green': '#b0e8c3',
      'darker-green': '#528262',
      'purple': '#8367C7',
      'blue': '#84CAE7'
    }
  },
  plugins: [],
}
