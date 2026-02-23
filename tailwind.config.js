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
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Hoặc dùng Helvetica/Arial
      }
    },
  },
  plugins: [],
}