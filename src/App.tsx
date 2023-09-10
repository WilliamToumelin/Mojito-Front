import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Cocktail from './pages/Cocktail/Cocktail';
import Register from './pages/Register/Register';
import CocktailSubmit from './pages/CocktailSubmit/CocktailSubmit';
import Footer from './components/Footer/Footer';
import AboutUs from './pages/AboutUs/AboutUs';
import Reviews from './pages/Reviews/Reviews';
import LegalMentions from './pages/LegalMentions/LegalMentions';
import Page404 from './components/Error/Page404';
import { useAuth } from './contexts/AuthProvider';
import Page403 from './components/Error/Page403';

const App = () => {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [selectedCocktail, setSelectedCocktail] = useState<number | null>(null);
  const { login, logout } = useAuth(); // Obtenez l'état d'authentification et les fonctions de connexion/déconnexion depuis le contexte

  useEffect(() => {
    const authToken = Cookies.get('authToken');
    if (authToken) {
      // Si le jeton JWT est présent dans les cookies, l'utilisateur est connecté
      login(); // Utilisez la fonction de connexion fournie par useAuth
    } else {
      // Sinon, l'utilisateur n'est pas connecté
      logout(); // Utilisez la fonction de déconnexion fournie par useAuth
    }
  }, [login, logout]);

  return (
    <div className="z-10 app flex flex-col text-sm h-[100vh]">
      <Header
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        setCategoryName={setCategoryName}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              categoryId={categoryId}
              selectedCocktail={selectedCocktail}
              setSelectedCocktail={setSelectedCocktail}
              categoryName={categoryName}
            />
          }
        />
        <Route path="/cocktail/:slug" element={<Cocktail />} />
        <Route path="/cocktail/:slug/commentaires" element={<Reviews />} />
        <Route path="/proposition-cocktail" element={<CocktailSubmit />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mentions-legales" element={<LegalMentions />} />
        <Route path="/a-propos-de-nous" element={<AboutUs />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/Page403" element={<Page403 />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
