/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sport: {
          950: '#020617', // Deep slate
          900: '#0f172a',
          800: '#1e293b',
          accent: '#5b8cff', // Electric Blue
          neon: '#ccff00',   // Neon Yellow/Green
          fire: '#ff3b3b',   // Sport Red
        }
      },
      fontFamily: {
        sport: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'sans-serif'], // For bold headlines
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          'from': { boxShadow: '0 0 10px rgba(91, 140, 255, 0.2)' },
          'to': { boxShadow: '0 0 25px rgba(91, 140, 255, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
