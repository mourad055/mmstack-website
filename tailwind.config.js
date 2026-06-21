/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { sans: ['"Bricolage Grotesque"', 'Georgia', 'sans-serif'] },
      colors: {
        black: '#0A0A0A',
        offwhite: '#F5F5F5',
        border: '#E5E5E5',
        muted: '#6B6B6B',
        clay: '#B6543A',
        'clay-deep': '#8F3D28',
        dark: { card: '#1A1A1A', border: '#2A2A2A', muted: '#A0A0A0' },
      },
      keyframes: {
        'hero-rise': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'hero-reveal': {
          '0%': { opacity: '0', clipPath: 'inset(0 0 100% 0)' },
          '100%': { opacity: '1', clipPath: 'inset(0 0 0 0)' },
        },
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        '@media (prefers-reduced-motion: reduce)': {
          '*, *::before, *::after': {
            'animation-duration': '0.01ms !important',
            'animation-iteration-count': '1 !important',
            'transition-duration': '0.01ms !important',
          },
        },
      })
    },
  ],
}
