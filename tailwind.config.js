const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        black: '#1F1F1F',
        gray: '#9F9AA9',
        light: '#F8F8FC',
        white: '#FFFFFF',
      },
    },
  },
  plugins: [],
};
