/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['inter', 'sans-serif'],
        sono: ['sono', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
