/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A0E27',
          light: '#141A3D',
          dark: '#050714',
        },
        electric: {
          DEFAULT: '#3D5AFE',
          hover: '#2943D6',
        },
        shield: {
          white: '#F8F9FC',
          gray: '#E2E8F0',
          dark: '#1E293B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 40px -10px rgba(0, 0, 0, 0.05)',
        'premium-dark': '0 20px 50px -12px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
