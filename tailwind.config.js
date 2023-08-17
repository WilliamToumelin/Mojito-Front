/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/components/App/App.tsx",
    "./src/components/CocktailByCat/CocktailByCat.tsx",
    "./src/components/CocktailById/CocktailByCat.tsx",
    "./src/components/Error/Page404.tsx",
    "./src/components/Error/Page403.tsx",
    "./src/components/Header/Header.tsx",
    "./src/components/Home/Home.tsx",
    "./src/components/SecondaryNavbar/SecondaryNavbar.tsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}