module.exports = {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  purge: {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    options: {
      safelist: [/^bg/, /^text/, /^fill/, /^stroke/, /^text-/]
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
    screens: {
      'xs': '410px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    },
    colors: {
      'dark': '#1E1E24',
      'dark-comp': '#363640',
      'light-yellow': '#ece4ce',
      'light': '#FBFAF5',
      'light-comp': '#d9d8d2',
      'dark-text': '#FBFAF5',
      'light-text': '#000000',
      'green': '#b0e8c3',
      'inbetween-green': '#74B88B',
      'darker-green': '#528262',
      'turquoise': '#33B3A6',
      'darker-turquoise': '#1E6B63',
      'blue': '#84CAE7',
      'danger': '#e03d3d',
      'lava-1': '#ff250044',
      'lava-2': '#ff250066',
      'lava-3': '#ff250088',
      'lava-4': '#ff2500ff',
      'water-1': '#8ed1fd',
      'water-2': '#5682BA',
      'water-3': '#344982',
      'water-4': '#1D2352',
      'black': '#000000',
      'transparent': '#00000000',
      'tan': '#D2B48C',
      'gray': '#808080',
    }
  },
  plugins: [],
}
