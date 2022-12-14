/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/features/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "editor-back": "#4a5158bf",
      },
      fontFamily: {
        press: ["'Press Start 2P'"],
        courier: ["'Courier Prime'"],
        dot: ["'DotGothic16'"],
      },
    },
  },
  plugins: [],
};
