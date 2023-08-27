/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsTrophy } from 'react-icons/bs';
import { CgInfinity } from 'react-icons/cg';
import { Cocktails } from '../../types/types';
import CocktailItem from '../../components/CocktailItem/CocktailItem';
import SideBar from '../../components/SideBar/SideBar';

interface HomeProps {
  categoryId: number | null;
  selectedCocktail: number | null;
  setSelectedCocktail: (id: number | null) => void;
}

const filterCocktailsByCategoryId = (
  cocktails: Cocktails[],
  categoryId: number | null
) => {
  return cocktails.filter((cocktail) =>
    cocktail.categories.some((category) => category.id === categoryId)
  );
};

const Home: React.FC<HomeProps> = ({
  categoryId,
  selectedCocktail,
  setSelectedCocktail,
}) => {
  const [cocktailList, setCocktailList] = useState<Cocktails[]>([]);
  const [displayMode, setDisplayMode] = useState(true);
  const [animate, setAnimate] = useState(true);

  console.log(categoryId);
  console.log(selectedCocktail);

  useEffect(() => {
    fetch('http://localhost:5174/api/cocktails')
      .then((response) => response.json())
      .then((data: Cocktails[]) => {
        setCocktailList(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const cocktailListMemo = useMemo(() => cocktailList, [cocktailList]);
  console.log(cocktailListMemo);

  useEffect(() => {
    setAnimate(false);
  }, []);

  const handleToggle = () => {
    setDisplayMode((prevToggle) => !prevToggle);
  };

  const handleSelectCocktail = (cocktailId: number) => {
    setSelectedCocktail(cocktailId);
  };

  const cocktailsData = useMemo(() => {
    return cocktailListMemo.slice().sort((a, b) => b.rating - a.rating);
  }, [cocktailListMemo]);

  const cocktailTop5 = cocktailsData.slice(0, 5);

  const filteredCocktails = filterCocktailsByCategoryId(
    cocktailListMemo,
    categoryId
  );

  return (
    <div className="relative bg-black flex justify-center items-center flex-1 h-[75vh]">
      <div
        className={` ${
          !categoryId ? 'relative' : ''
        } w-4/5 lg:w-3/5 h-4/5 max-h-4/5 flex flex-col overflow-y-auto shadow-purple-700 shadow-2xl rounded-2xl bg-black`}
      >
        {/* Haut du composant avec le bouton dependant de SI PAS DE CATEGORYID avec top 5 ou liste complète */}
        {!categoryId ? (
          <>
            <div className="text-center pb-12">
              <h1 className="text-amber-700 text-2xl pt-5">
                {displayMode
                  ? 'Les 5 cinq cocktails les mieux notés'
                  : 'Tous nos cocktails'}
              </h1>
            </div>
            <div className="flex justify-center mb-10 absolute top-10 right-10">
              <button
                className="text-amber-800 text-5xl animate-bounce"
                type="button"
                onClick={handleToggle}
              >
                {displayMode ? <CgInfinity /> : <BsTrophy />}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Haut du composant avec le bouton du top 5 etc .. qui disparait SI CATEGORYID  */}
            <SideBar filteredCocktails={filteredCocktails} />
            <div className="text-center pb-12">
              <h1 className="text-amber-700 text-2xl pt-5">
                Catégorie : {categoryId}
              </h1>
            </div>
          </>
        )}

        <div className="text-white flex px-12 pt-9">
          <ul className="w-full">
            {/* Liste de cocktail filré avec categoryId sinon avec la coniditon " : " alors on utlise le DisplayMode avec le Top5 et ListeComplète pour filtrer les cocktails */}
            {categoryId
              ? filteredCocktails.map((cocktail, index) => (
                  <Link
                    key={index}
                    to={`/cocktail/${cocktail.slug}`}
                    onClick={() => handleSelectCocktail(cocktail.id)}
                  >
                    <CocktailItem
                      key={index}
                      cocktail={cocktail}
                      animate={animate}
                      modulo={index % 2 !== 0}
                    />
                  </Link>
                ))
              : displayMode
              ? cocktailTop5.map((cocktail, index) => (
                  <Link
                    key={index}
                    to={`/cocktail/${cocktail.slug}`}
                    onClick={() => handleSelectCocktail(cocktail.id)}
                  >
                    <CocktailItem
                      key={index}
                      cocktail={cocktail}
                      animate={animate}
                      modulo={index % 2 !== 0}
                    />
                  </Link>
                ))
              : cocktailListMemo.map((cocktail, index) => (
                  <Link
                    key={index}
                    to={`/cocktail/${cocktail.slug}`}
                    onClick={() => handleSelectCocktail(cocktail.id)}
                  >
                    <CocktailItem
                      key={index}
                      cocktail={cocktail}
                      animate={animate}
                      modulo={index % 2 !== 0}
                    />
                  </Link>
                ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
