/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'sans-serif'] },
      colors: {
        black: '#0A0A0A',
        offwhite: '#F5F5F5',
        border: '#E5E5E5',
        muted: '#8A8A8A',
        dark: { card: '#1A1A1A', border: '#2A2A2A' },
      },
    },
  },
  plugins: [],
}
