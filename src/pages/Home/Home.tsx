/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsTrophy } from 'react-icons/bs';
import { CgInfinity } from 'react-icons/cg';
import { Cocktails } from '../../types/types';
import CocktailItem from '../../components/CocktailItem/CocktailItem';

interface HomeProps {
  categoryId: number | null;
}

const Home: React.FC<HomeProps> = ({ categoryId }) => {
  const [cocktailList, setCocktailList] = useState<Cocktails[]>([]);
  const [displayMode, setDisplayMode] = useState(true);
  const [animate, setAnimate] = useState(true);

  console.log(categoryId);

  useEffect(() => {
    fetch('http://localhost:5174/api/cocktails')
      .then((response) => response.json())
      .then((data: Cocktails[]) => {
        setCocktailList(data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    setAnimate(false);
  }, []);

  const handleToggle = () => {
    setDisplayMode((prevToggle) => !prevToggle);
  };

  const cocktailsData = useMemo(() => {
    return cocktailList.slice().sort((a, b) => b.rating - a.rating);
  }, [cocktailList]);

  const cocktailTop5 = cocktailsData.slice(0, 5);

  return (
    <div className="bg-black flex justify-center items-center flex-1 h-[75vh]">
      <div className="relative w-4/5 lg:w-3/5 h-4/5 max-h-4/5 flex flex-col overflow-y-auto shadow-purple-700 shadow-2xl rounded-2xl bg-black">
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
          <div className="text-center pb-12">
            <h1 className="text-amber-700 text-2xl pt-5">
              Catégorie : {categoryId}
            </h1>
          </div>
        )}

        <div className="text-white flex px-12 pt-9">
          <ul className="w-full">
            {categoryId
              ? cocktailList
                  .filter((cocktail) =>
                    cocktail.categories.some(
                      (category) => category.id === categoryId
                    )
                  )
                  .map((cocktail, index) => (
                    <Link key={index} to={`/cocktail/${cocktail.slug}`}>
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
                  <Link key={index} to={`/cocktail/${cocktail.slug}`}>
                    <CocktailItem
                      key={index}
                      cocktail={cocktail}
                      animate={animate}
                      modulo={index % 2 !== 0}
                    />
                  </Link>
                ))
              : cocktailList.map((cocktail, index) => (
                  <Link key={index} to={`/cocktail/${cocktail.slug}`}>
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
