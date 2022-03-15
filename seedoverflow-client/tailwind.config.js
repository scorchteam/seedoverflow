module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  purge: {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    options: {
      safelist: [/^bg-/, /^text-/]
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
      'dark-background': '#231F20',
      'dark-lighter-background': '#363133',
      'light-background': '#ffffff',
      'light-darker-background': '#eeeeee',
      'dark-text-color': '#FFFFFA',
      'light-text-color': '#000000',
      'green-accent-color': '#2A7221',
      'purple-accent-color': '#998FC7',
      'blue-accent-color': '#788AA3'
    }
  },
  plugins: [],
}
