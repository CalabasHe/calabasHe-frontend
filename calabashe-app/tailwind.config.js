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
      colors: {
        'custom-yellow': '#FEE330'
      },
    },
    variants: {
      backgroundClip: ['responsive', 'hover', 'focus'],
    },
    plugins: [],
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-thin': {
          '::-webkit-scrollbar': {
            width: '12px',
          },
          '::-webkit-scrollbar-track': {
            borderRadius: '12px',
            backgroundColor: '#04DA8D',
          },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '12px',
          },
          '::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
          },
          'scrollbar-width': 'thin',
          'scrollbar-color': '#04DA8D transparent',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
}