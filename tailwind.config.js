/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#6EE7B7',  // Light green
          DEFAULT: '#10B981', // Green
          dark: '#047857',   // Dark green
        },
      },
    },
  },
  plugins: [],
}

