/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2E7D32',    // Green for olives
        secondary: '#FFA000',   // Amber/Gold
        dark: '#1B5E20',
        light: '#F1F8E9'
      },
      fontFamily: {
        'arabic': ['Cairo', 'sans-serif'],
        'english': ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}
