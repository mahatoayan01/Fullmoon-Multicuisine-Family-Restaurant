/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B', // Moonlit Gold
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
          950: '#451A03',
        },
        night: {
          950: '#070A12', // Deepest Obsidian
          900: '#0B0F19', // Dark Night canvas
          850: '#111827', // Card surface
          800: '#182234', // Elevated card
          700: '#222F46', // Border / subtle highlight
          600: '#334155',
        },
        warm: {
          50: '#FAF8F5',
          100: '#F5F0EA',
          200: '#EAE1D5',
          300: '#D6C5B0',
          800: '#3E342B',
          900: '#261F1A',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(245, 158, 11, 0.3)',
        'glow-lg': '0 0 45px -5px rgba(245, 158, 11, 0.4)',
      }
    },
  },
  plugins: [],
};
