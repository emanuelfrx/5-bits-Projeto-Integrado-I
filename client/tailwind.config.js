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
        'lime_green': { DEFAULT: '#54c73a', 100: '#10280b', 200: '#215016', 300: '#317722', 400: '#429f2d', 500: '#54c73a', 600: '#75d260', 700: '#97dd88', 800: '#bae9af', 900: '#dcf4d7' }, 
        'pigment_green': { DEFAULT: '#3da32b', 100: '#0c2009', 200: '#184011', 300: '#24611a', 400: '#308122', 500: '#3da32b', 600: '#53cc3e', 700: '#7ed86e', 800: '#a9e59e', 900: '#d4f2cf' }, 
        'office_green': { DEFAULT: '#317e26', 100: '#0a1908', 200: '#13320f', 300: '#1d4b17', 400: '#26651e', 500: '#317e26', 600: '#44b335', 700: '#6ccf5f', 800: '#9ddf94', 900: '#ceefca' }, 
        'hunter_green': { DEFAULT: '#296323', 100: '#081407', 200: '#10270e', 300: '#193b15', 400: '#214e1c', 500: '#296323', 600: '#409a36', 700: '#62c457', 800: '#97d88f', 900: '#cbebc7' }, 
        'cal_poly_green': { DEFAULT: '#255321', 100: '#081107', 200: '#0f220d', 300: '#173214', 400: '#1e431b', 500: '#255321', 600: '#3f8c38', 700: '#5fbc57', 800: '#94d28f', 900: '#cae9c7' }, 
        'dark_green': { DEFAULT: '#102e0e', 100: '#030903', 200: '#071306', 300: '#0a1c09', 400: '#0d250c', 500: '#102e0e', 600: '#297323', 700: '#41b839', 800: '#7cd576', 900: '#beeaba' }
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

