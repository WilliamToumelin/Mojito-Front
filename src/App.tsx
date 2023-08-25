import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './Pages/Home/Home';
// import CocktailByCat from './components/CocktailByCat/CocktailByCat';
import Cocktail from './Pages/Cocktail/Cocktail';
import Register from './Pages/Register/Register';
import CocktailSubmit from './Pages/CocktailSubmit/CocktailSubmit';
import Footer from './components/Footer/Footer';
import AboutUs from './Pages/AboutUs/AboutUs';
import Reviews from './Pages/Reviews/Reviews';
import LegalMentions from './Pages/LegalMentions/LegalMentions';
import Page404 from './components/Error/Page404';
// import { useCocktailStore } from './services/stores/cocktailsStore';

export default function App() {
  return (
    <div className="app flex flex-col text-sm h-[100vh]">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/cocktail/:slug" element={<Cocktail />} /> */}
        {/* <Route path="/cocktail/:slug/commentaires" element={<Reviews />} /> */}
        <Route path="/a-propos-de-nous" element={<AboutUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mentions-legales" element={<LegalMentions />} />
        <Route path="/proposition-cocktail" element={<CocktailSubmit />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </div>
  );
}
