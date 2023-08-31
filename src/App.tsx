import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
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

const App = () => {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [selectedCocktail, setSelectedCocktail] = useState<number | null>(null);

  return (
    <div className="app flex flex-col text-sm h-[100vh]">
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
        <Route
          path="/cocktail/:slug/commentaires"
          element={<Reviews selectedCocktail={selectedCocktail} />}
        />
        <Route path="/proposition-cocktail" element={<CocktailSubmit />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mentions-legales" element={<LegalMentions />} />
        <Route path="/a-propos-de-nous" element={<AboutUs />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
