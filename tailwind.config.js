/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    'bg-blue-400',
    'bg-red-400',
    'bg-green-400',
  ],
  theme: {
    extend: {
    },
  },
  plugins: [],
}
