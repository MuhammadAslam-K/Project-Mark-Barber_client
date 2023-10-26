/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  options: {
    whitelist: ['scrollbar-hide'],
  },
  theme: {
    extend: {
    },
    text: {
      'blue': '#091F5B',
    }
  },
}

