/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, 
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],  
  theme: {
    extend: {},
    container: {
      center: true,
    },
    screens: {
      'xs': '375px',   // Extra small devices (phones)
      'sm': '640px',   // Small devices (tablets)
      'md': '768px',   // Medium devices (laptops)
      'lg': '1024px',  // Large devices (desktops)
      'xl': '1280px',  // Extra large devices
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}