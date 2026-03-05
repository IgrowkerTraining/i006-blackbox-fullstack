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
  'blackbox-success': '#22c55e',
  'blackbox-warning': '#f59e0b',
  'blackbox-error':   '#ef4444',
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif']
      }
    },
    safelist: [
    "text-green-500",
    "text-green-600",
    "text-amber-500",
    "text-amber-600",
  ],
  },
  plugins: [],
}
