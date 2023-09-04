/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsTrophy } from 'react-icons/bs';
import { CgInfinity } from 'react-icons/cg';
import { Cocktails } from '../../types/types';
import CocktailItem from '../../components/common/CocktailItem/CocktailItem';
import SideBar from '../../components/SideBar/SideBar';

interface HomeProps {
  categoryName: string | null;
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
  categoryName,
}) => {
  const [cocktailList, setCocktailList] = useState<Cocktails[]>([]);
  const [displayMode, setDisplayMode] = useState(true);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5174/api/cocktails')
      .then((response) => response.json())
      .then((data: Cocktails[]) => {
        setCocktailList(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const cocktailListMemo = useMemo(() => cocktailList, [cocktailList]);

  useEffect(() => {
    setAnimate(false);
  }, []);

  const handleToggle = () => {
    setDisplayMode((prevToggle) => !prevToggle);
  };

  const handleSelectCocktail = (cocktailId: number) => {
    setSelectedCocktail(cocktailId);
    localStorage.setItem('selectedCocktail', cocktailId.toString());
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
    <div className="relative bg-light-brown flex justify-center items-center flex-1 h-[75vh]">
      <div
        style={{
          boxShadow: '#132226 0px 1px 22px',
        }}
        className={` ${
          !categoryId ? 'relative' : ''
        } w-4/5 xl:w-4/6 h-4/5 flex flex-col overflow-y-auto shadow-light-gray shadow-xl rounded-2xl pb-3 bg-dark-gray`}
      >
        {/* Haut du composant avec le bouton dependant de SI PAS DE CATEGORYID avec top 5 ou liste complète */}
        {!categoryId ? (
          <>
            <div className="text-center pb-6">
              <h1 className="text-dark-brown text-5xl pt-6">
                {displayMode ? 'Le top 5' : 'Tous nos cocktails'}
              </h1>
            </div>
            <div className="block m-auto mb-5">
              <button
                className="text-dark-brown text-6xl animate-bounce"
                type="button"
                onClick={handleToggle}
              >
                {displayMode ? <CgInfinity /> : <BsTrophy />}
              </button>
              <p className="text-dark-brown text-center">click me</p>
            </div>
          </>
        ) : (
          <>
            {/* Haut du composant avec le bouton du top 5 etc .. qui disparait SI CATEGORYID  */}
            <SideBar
              filteredCocktails={filteredCocktails}
              setSelectedCocktail={setSelectedCocktail}
              selectedCocktail={selectedCocktail}
            />
            <div className="text-center pb-12">
              <h1 className="text-dark-brown text-5xl pt-8">{categoryName}</h1>
            </div>
          </>
        )}

        <div className="flex px-2 md:px-12 pt-9">
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
                      modulo={index % 2 !== 0}
                      isLastItem={index === filteredCocktails.length - 1}
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
                      modulo={index % 2 !== 0}
                      isLastItem={index === cocktailTop5.length - 1}
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
                      modulo={index % 2 !== 0}
                      isLastItem={index === cocktailListMemo.length - 1}
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
