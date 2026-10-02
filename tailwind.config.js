import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
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
        surface: {
          DEFAULT: '#0d1326',
          raised: '#131a32',
          border: '#232b47',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(90,148,255,0.15), 0 8px 24px -8px rgba(52,109,255,0.35)',
      },
    },
  },
  plugins: [typography],
}
