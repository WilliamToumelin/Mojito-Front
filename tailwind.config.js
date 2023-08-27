/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/App/App.tsx",
    "./src/pages/Home/Home.tsx",
    "./src/pages/Cocktail/Cocktail.tsx",
    "./src/pages/Cocktail/Rating.tsx",
    "./src/pages/AboutUs/AboutUs.tsx",
    "./src/pages/LegalMentions/LegalMentions.tsx",
    "./src/pages/CocktailSubmit/CocktailSubmit.tsx",
    "./src/pages/CocktailSubmit/ItemAdd.tsx",
    "./src/pages/CocktailSubmit/ItemRemove.tsx",
    "./src/pages/Register/Register.tsx",
    "./src/pages/Reviews/Reviews.tsx",

    "./src/components/Error/Page404.tsx",
    "./src/components/Header/Header.tsx",
    "./src/components/Footer/Footer.tsx",
    "./src/components/SideBar/SideBar.tsx",
    "./src/components/CocktailItem/CocktailItem.tsx",
    "./src/components/Modals/ConnectModal.tsx",
    "./src/components/Modals/CommentModal.tsx",
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