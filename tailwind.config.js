/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [],
  theme: {
    extend: {
      fontFamily: {
        'gluten': ['Gluten', 'sans-serif']
      },
      transitionDuration: {
        '500': '500ms',
        '1100': '1100ms',
        '1200': '1200ms',
        '1300': '1300ms',
        '1400': '1400ms',
        '1500': '1500ms',
      },
      colors: {
        'red-cocktail': '#7f1d1d',
        'dark-gray': '#132226',
        'light-gray': '#525B56',
        'dark-brown': '#BE9063',
        'light-brown': '#a4978e',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': {
            transform: 'rotate(-15deg)'
          },
          '50%': {
            transform: 'rotate(15deg)'
          },
        },
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
      },
      animation: {
        wiggle: 'wiggle 2000ms ease-in-out infinite',
        'fade-in-down': 'fade-in-down 2s ease-out',
      }
    }
  }
}