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
        primary: {
          50: '#f8d8bd',
          100: '#f5cba7',
          200: '#f3bf91',
          300: '#f0b27a',
          400: '#eea564',
          500: '#eb984e',
          600: '#e98b38',
          700: '#e67e22',
          800: '#cf711f',
          900: '#b8651b',
        },
      },
    },
  },
  plugins: [],
};
