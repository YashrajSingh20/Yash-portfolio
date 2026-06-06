/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFD700', // Vibrant Yellow Background
        surface: '#FFFFFF', // White cards
        primary: '#FFD700', // Yellow
        secondary: '#000000', // Black
        tertiary: '#FFFFFF', // White
        accent1: '#FF6B6B', // Red/Pink
        accent2: '#4D96FF', // Blue
        border: '#000000',
        text: {
          main: '#000000',
          muted: '#222222'
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Archivo Black', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      boxShadow: {
        'brutal': '8px 8px 0px 0px rgba(0,0,0,1)',
        'brutal-lg': '16px 16px 0px 0px rgba(0,0,0,1)',
        'brutal-hover': '2px 2px 0px 0px rgba(0,0,0,1)',
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-fast': 'marquee 8s linear infinite',
        'spin-slow': 'spin 6s linear infinite',
        'wiggle': 'wiggle 0.5s ease-in-out infinite',
        'bounce-slight': 'bounce-slight 1.5s infinite',
        'pulse-fast': 'pulse-fast 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-5deg) scale(1)' },
          '50%': { transform: 'rotate(5deg) scale(1.1)' },
        },
        'bounce-slight': {
          '0%, 100%': { transform: 'translateY(-10%)' },
          '50%': { transform: 'translateY(0)' },
        },
        'pulse-fast': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        }
      }
    },
  },
  plugins: [],
}
