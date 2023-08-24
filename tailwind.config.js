/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/components/AboutUs/AboutUs.tsx",
    "./src/components/App/App.tsx",
    "./src/components/Article/Article.tsx",
    "./src/components/CocktailByCat/CocktailByCat.tsx",
    "./src/components/CocktailById/CocktailById.tsx",
    "./src/components/CocktailById/Rating.tsx",
    "./src/components/CocktailSubmit/CocktailSubmit.tsx",
    "./src/components/CocktailSubmit/ItemAdd.tsx",
    "./src/components/CocktailSubmit/ItemRemove.tsx",
    "./src/components/Error/Page404.tsx",
    "./src/components/Error/Page403.tsx",
    "./src/components/Footer/Footer.tsx",
    "./src/components/Header/Header.tsx",
    "./src/components/Home/Home.tsx",
    "./src/components/LegalMentions/LegalMentions.tsx",
    "./src/components/Modals/ConnectModal.tsx",
    "./src/components/Modals/CommentModal.tsx",
    "./src/components/Register/Register.tsx",
    "./src/components/Reviews/Reviews.tsx",
    "./src/components/SideBar/SideBar.tsx",
    "./src/components/Spinner/Spinner.tsx",
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