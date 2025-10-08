/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFCD58",
        secondary: "#0C0C0C",
        light: {
          light: "#FFFFFF",
          dark: "#EEEEEE"
        },
        dark: {
          light: "#000000",
          dark: "#555555"
        }
      },
      fontFamily: {
        title: ['Montserrat', 'sans-serif'],
        subtitle: ['Poppins', 'sans-serif'],
        text: ['Lato', 'sans-serif']
      }
    },
    screens: {
      'xs': '420px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
}