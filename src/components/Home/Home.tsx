/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useMemo } from 'react';
import { BsTrophy } from 'react-icons/bs';
import { CgInfinity } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import Article from '../Article/Article';
import { Cocktails } from '../../types/types';

type Props = {
  cocktailList: Cocktails[];
};

const Home: React.FC<Props> = ({ cocktailList }) => {
  const [displayMode, setDisplayMode] = useState(true);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    setAnimate(false);
  }, []);

  const handleToggle = () => {
    setDisplayMode((prevToggle) => !prevToggle);
  };

  const cocktailTop5 = useMemo(() => {
    return cocktailList.filter((cocktail5) => cocktail5.rating > 3.8);
  }, [cocktailList]);

  console.log(cocktailTop5);
  console.log(cocktailList);

  return (
    <div className="bg-black flex justify-center items-center flex-1 h-[75vh]">
      <div className="relative w-4/5 lg:w-3/5 h-4/5 max-h-4/5 flex flex-col overflow-y-auto shadow-purple-700 shadow-2xl rounded-2xl bg-black">
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
        <div className="text-white flex px-12 pt-9">
          <ul className="w-full">
            {displayMode
              ? cocktailTop5.map((cocktail, index) => (
                  <Link key={index} to={`/cocktail/${cocktail.slug}`}>
                    <Article
                      key={index}
                      cocktail={cocktail}
                      animate={animate}
                      modulo={index % 2 !== 0}
                    />
                  </Link>
                ))
              : cocktailList.map((cocktail, index) => (
                  <Link key={index} to={`/cocktail/${cocktail.slug}`}>
                    <Article
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
