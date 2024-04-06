/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['inter', 'sans-serif'],
        sono: ['sono', 'sans-serif'],
      },
      colors: {
        'primary-orange': '#E67E22',
        'secondary-orange': '#FDF2E9',
      },
    },
  },
  plugins: [],
};
