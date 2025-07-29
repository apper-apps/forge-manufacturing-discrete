/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#b3c5d8',
          300: '#8da8c4',
          400: '#668bb0',
          500: '#4a6fa5',
          600: '#3d5a8a',
          700: '#31456f',
          800: '#243054',
          900: '#1e3a5f',
        },
        accent: {
          50: '#fff4f0',
          100: '#ffe4d6',
          200: '#ffc4a3',
          300: '#ffa470',
          400: '#ff843d',
          500: '#ff6b35',
          600: '#e55a2b',
          700: '#cc4921',
          800: '#b23817',
          900: '#99270d',
        },
        surface: '#f5f7fa',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}