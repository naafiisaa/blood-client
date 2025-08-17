// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//  theme: {
//     extend: {
//       keyframes: {
//         'pulse-red': {
//           '0%': { backgroundColor: 'rgba(127, 29, 29, 0.7)' }, // dark red
//           '50%': { backgroundColor: 'rgba(220, 38, 38, 0.3)' }, // lighter red
//           '100%': { backgroundColor: 'rgba(127, 29, 29, 0.7)' }, // back to dark red
//         },
//       },
//         colors: {
//         text: "rgb(var(--text) / <alpha-value>)",
//         background: "rgb(var(--background) / <alpha-value>)",
//         primary: "rgb(var(--primary) / <alpha-value>)",
//         secondary: "rgb(var(--secondary) / <alpha-value>)",
//         accent: "rgb(var(--accent) / <alpha-value>)",
//       },
//       animation: {
//         'red-pulse': 'pulse-red 4s ease-in-out infinite',
//       },
//     },
//   },
//   plugins: [
//   require("daisyui"),
//   require("@tailwindcss/typography"),
// ],

// }


/**
 * 
 /** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#ff0000",
          "secondary": "#fc545a",
          "accent": "#f97f5d",
          "neutral": "#331a1a",
          "background": "#faf5f5",
        },
      },
      {
        dark: {
          "primary": "#ff0000",
          "secondary": "#ab0308",
          "accent": "#a22806",
          "neutral": "#331a1a",
          "background": "#0a0505",
        },
      },
    ],
  },
};



