/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { useEffect, useMemo, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Home from '../Home/Home';
import CocktailByCat from '../CocktailByCat/CocktailByCat';
import CocktailById from '../CocktailById/CocktailById';
import Register from '../Register/Register';
import CocktailSubmit from '../CocktailSubmit/CocktailSubmit';
// import Spinner from '../Spinner/Spinner';
import Footer from '../Footer/Footer';
import AboutUs from '../AboutUs/AboutUs';
import Reviews from '../Reviews/Reviews';
import LegalMentions from '../LegalMentions/LegalMentions';
import { Category, Cocktails } from '../../types/types';
import Page404 from '../Error/Page404';

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const [cocktailList, setCocktailList] = useState<Cocktails[]>([]);
  const { pathname: url } = useLocation();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 4000);
  }, [url]);

  useEffect(() => {
    fetch('http://localhost:5174/api/categories')
      .then((response) => response.json())
      .then((data: Category[]) => {
        setCategoriesData(data);
      })
      .catch((err) => console.error(err));

    fetch('http://localhost:5174/api/cocktails')
      .then((response) => response.json())
      .then((data: Cocktails[]) => {
        setCocktailList(data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const categoriesDataMemo = useMemo(() => categoriesData, [categoriesData]);
  const cocktailListMemo = useMemo(() => cocktailList, [cocktailList]);

  console.log(categoriesDataMemo);
  console.log(cocktailListMemo);

  return (
    <div className="app flex flex-col text-sm h-[100vh]">
      <Header categoriesData={categoriesDataMemo} />
      <Routes>
        <Route path="/" element={<Home cocktailList={cocktailListMemo} />} />
        <Route
          path="/:categoryName?"
          element={
            <CocktailByCat
              categoriesData={categoriesDataMemo}
              cocktailList={cocktailListMemo}
            />
          }
        />
        <Route
          path="/cocktail/:slug"
          element={<CocktailById cocktailList={cocktailListMemo} />}
        />
        <Route path="/a-propos-de-nous" element={<AboutUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mentions-legales" element={<LegalMentions />} />
        <Route path="/proposition-cocktail" element={<CocktailSubmit />} />
        <Route
          path="/cocktail/:slug/commentaires"
          element={<Reviews cocktailList={cocktailListMemo} />}
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </div>
  );
}
