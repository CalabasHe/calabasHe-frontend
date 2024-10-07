/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundClip: {
        text: 'text',
      },
      fontFamily: {
        'poppins': ["Poppins", 'sans-serif']
      },
    },
    variants: {
      backgroundClip: ['responsive', 'hover', 'focus'],
    },
    plugins: [],
  },
  plugins: [],
}