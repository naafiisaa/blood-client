/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
 theme: {
    extend: {
      keyframes: {
        'pulse-red': {
          '0%': { backgroundColor: 'rgba(127, 29, 29, 0.7)' }, // dark red
          '50%': { backgroundColor: 'rgba(220, 38, 38, 0.3)' }, // lighter red
          '100%': { backgroundColor: 'rgba(127, 29, 29, 0.7)' }, // back to dark red
        },
      },
      animation: {
        'red-pulse': 'pulse-red 4s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}




