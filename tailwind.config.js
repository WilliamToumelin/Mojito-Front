/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/App.tsx",

    "./src/Pages/Cocktail/Cocktail.tsx",
    "./src/Pages/Cocktail/Rating.tsx",
    "./src/Pages/Home/Home.tsx",
    "./src/Pages/AboutUs/AboutUs.tsx",
    "./src/Pages/LegalMentions/LegalMentions.tsx",
    "./src/Pages/CocktailSubmit/CocktailSubmit.tsx",
    "./src/Pages/CocktailSubmit/ItemAdd.tsx",
    "./src/Pages/CocktailSubmit/ItemRemove.tsx",

    "./src/components/Error/Page404.tsx",
    "./src/components/Header/Header.tsx",
    "./src/components/Footer/Footer.tsx",
    "./src/components/SideBar/SideBar.tsx",
    "./src/components/common/ItemCocktail/ItemCocktail.tsx",
    "./src/components/CocktailByCat/CocktailByCat.tsx",
    "./src/components/Modals/ConnectModal.tsx",
    "./src/components/Modals/CommentModal.tsx",
    "./src/components/Register/Register.tsx",
    "./src/components/Reviews/Reviews.tsx",

  ],
  plugins: [],
  theme: {
    extend: {
      transitionDuration: {
        '500': '1.5s',
        '1100': '1100ms',
        '1200': '1200ms',
        '1300': '1300ms',
        '1400': '1400ms',
        '1500': '1500ms',
      }
    }
  }
}