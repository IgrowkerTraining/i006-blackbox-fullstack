/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blackbox-green': '#0B1001',
        'blackbox-yellow': '#F2B705',
        'blackbox-white': '#F8F8F8',
        'blackbox-blue': '#4E63A8',
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif']
      }
    },
  },
  plugins: [],
}
