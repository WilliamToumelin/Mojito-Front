/* eslint-disable no-console */
import React, { useEffect, useMemo, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Home from '../Home/Home';
import CocktailByCat from '../CocktailByCat/CocktailByCat';

import './App.scss';
import CocktailById from '../CocktailById/CocktailById';

type Category = {
  id: number;
  slug: string;
  name: string;
};

type Cocktails = {
  id: number;
  slug: string;
  categoryId: number;
  content: string;
  title: string;
};

export default function App() {
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const [cocktailList, setCocktailList] = useState<Cocktails[]>([]);
  const { pathname: url } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [url]);

  useEffect(() => {
    fetch('https://oblog-react.vercel.app/api/categories')
      .then((response) => response.json())
      .then((data: Category[]) => {
        setCategoriesData(data);
        console.log(data);
      })
      .catch((err) => console.error(err));

    fetch('https://oblog-react.vercel.app/api/posts')
      .then((response) => response.json())
      .then((data: Cocktails[]) => {
        setCocktailList(data);
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const CategoriesDataMemo = useMemo(() => categoriesData, [categoriesData]);
  const CocktailListMemo = useMemo(() => cocktailList, [cocktailList]);

  return (
    <div className="app">
      <Header categoriesData={CategoriesDataMemo} />
      <Routes>
        <Route path="/" element={<Home cocktailList={CocktailListMemo} />} />
        <Route
          path="/:categoryName?"
          element={
            <CocktailByCat
              categoriesData={CategoriesDataMemo}
              cocktailList={CocktailListMemo}
            />
          }
        />
        <Route
          path="/cocktail/:slug"
          element={<CocktailById cocktailList={CocktailListMemo} />}
        />
      </Routes>
    </div>
  );
}
