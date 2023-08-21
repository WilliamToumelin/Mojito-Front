/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/components/App/App.tsx",
    "./src/components/CocktailByCat/CocktailByCat.tsx",
    "./src/components/CocktailById/CocktailById.tsx",
    "./src/components/Error/Page404.tsx",
    "./src/components/Error/Page403.tsx",
    "./src/components/Header/Header.tsx",
    "./src/components/Footer/Footer.tsx",
    "./src/components/Home/Home.tsx",
    "./src/components/SideBar/SideBar.tsx",
    "./src/components/Article/Article.tsx",
    "./src/components/AboutUs/AboutUs.tsx",
    "./src/components/LegalMentions/LegalMentions.tsx",
    "./src/components/ConnectModal/ConnectModal.tsx",
    "./src/components/CocktailSubmit/CocktailSubmit.tsx",
  ],
  plugins: [],
  theme: {
    extend: {
      transitionDuration: {
        '1100': '1100ms',
        '1200': '1200ms',
        '1300': '1300ms',
        '1400': '1400ms',
        '1500': '1500ms',
      }
    }
  }
}