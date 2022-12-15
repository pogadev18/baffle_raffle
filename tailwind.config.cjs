/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-yellow': '#FFB800',
        'main-yellow-hover': '#c29d34',
        'subtle-gray': '#7B7B7B',
        'dark-gray': '#3C3C3C',
        'main-blue': '#52ADFF'
      },
    }
  },
  plugins: [],
}