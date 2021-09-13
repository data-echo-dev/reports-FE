module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          black: '#000000',
          blue: '#0082b3',
        },
        secondary: {
          100: '#339bc2',
          200: '#66cef5',
          300: '#a3e2f9',
        },
      },
    },
  },
  variants: {
    extend: { cursor: ['hover', 'focus'] },
  },
  plugins: [],
}
