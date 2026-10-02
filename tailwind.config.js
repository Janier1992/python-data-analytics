import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef5ff',
          100: '#d9e8ff',
          200: '#b9d6ff',
          300: '#8cbaff',
          400: '#5a94ff',
          500: '#346dff',
          600: '#1d4ced',
          700: '#173bc2',
          800: '#17339a',
          900: '#182f79',
        },
      },
    },
  },
  plugins: [typography],
}
