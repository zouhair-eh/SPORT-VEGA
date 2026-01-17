/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#5b8cff',
          600: '#3b6dff'
        }
      }
    },
  },
  plugins: [],
};
