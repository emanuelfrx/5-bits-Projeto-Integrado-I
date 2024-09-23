/** @type {import('tailwindcss').Config} */

import plugin from "tailwindcss/plugin";
import forms from '@tailwindcss/forms';
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "/index.html",
    flowbite.content()
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: 'Moderustic, sans'
      },
      colors:{
        'primary': { DEFAULT: '#84CC16', 100: '#ECFCCB', 200: '#D9F99D', 300: '#CDF583', 400: '#A3E635', 500: '#84CC16', 600: '#65A30D', 700: '#4D7C0F', 800: '#3F6212', 900: '#365314' }, 
        'secondary': { DEFAULT: '#0284c7', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa', 500: '#1d4ed8', 600: '#0284c7', 700: '#1e40af', 800: '#1e40af', 900: '#1e3a8a' },
        'leticia': { DEFAULT: '#791053', 100: '#EBACD2', 200: '#E99ACB', 300: '#EA7FC2', 400: '#E95CB5', 500: '#DD3AA1', 600: '#B5217F', 700: '#791053', 800: '#44082F', 900: '#230318' } 
        },
      backgroundImage: {
        'homebg': "url('/src/assets/classuniversity.png')"
      }
    },
  },
  plugins: [
    flowbite.plugin(),
    forms,
    // add custom variant for expanding sidebar
    plugin(({ addVariant, e }) => {
      addVariant('sidebar-expanded', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => `.sidebar-expanded .${e(`sidebar-expanded${separator}${className}`)}`);
      });
    }),
  ],
}

