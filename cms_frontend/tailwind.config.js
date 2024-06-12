/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'auth-background': "url('/src/assets/auth-backimage.jpg')",
      }
    },
  },
  plugins: [],
}

