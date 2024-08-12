/** @type {import('tailwindcss').Config} */

import plugin from "tailwindcss/plugin";
import forms from '@tailwindcss/forms';

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "/index.html"
    ],
    darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: 'Jost, sans'
      }
    },
  },
  plugins: [
    forms,
    // add custom variant for expanding sidebar
    plugin(({ addVariant, e }) => {
      addVariant('sidebar-expanded', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => `.sidebar-expanded .${e(`sidebar-expanded${separator}${className}`)}`);
      });
    }),
  ],
}

