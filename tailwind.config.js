/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'roomie-bg': '#E8E8E8',
        'roomie-dark': '#2A2A2A',
        'boonie-bg': '#FFFBE6',
        'boonie-pink': '#FF6B98',
        'boonie-text': '#4C3C34',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        fredoka: ['Fredoka', 'sans-serif'],
      }
    },
  },
  plugins: [],
}