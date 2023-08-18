import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsTrophy } from 'react-icons/bs';
import { CgInfinity } from 'react-icons/cg';
import { BiSolidStar } from 'react-icons/bi';
import image from '../../images/image.jpeg';

type Cocktails = {
  categoryId: number;
  id: number;
  slug: string;
  content: string;
  title: string;
};

type Props = {
  cocktailList: Cocktails[];
};

const Home: React.FC<Props> = ({ cocktailList }) => {
  const cocktailTop5 = cocktailList.filter(
    (cocktail5) => cocktail5.categoryId <= 2
  );
  const [displayMode, setDisplayMode] = useState(true);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    setAnimate(false);
  }, []);

  const handleToggle = () => {
    setDisplayMode((prevToggle) => !prevToggle);
  };

  return (
    <div className="bg-black flex justify-center items-center flex-1 h-[85vh]">
      <div className="relative w-4/5 lg:w-3/5 h-4/5 max-h-4/5 flex flex-col overflow-y-auto shadow-amber-700 shadow-2xl rounded-2xl bg-black">
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
        <div className="text-white flex p-12">
          <ul className="w-full">
            {displayMode
              ? cocktailTop5.map((cocktail, key) => (
                  <Link key={key} to={`/cocktail/${cocktail.slug}`}>
                    <article
                      className={`mb-12 flex items-center ${
                        key % 2 === 0 ? '' : 'flex-row-reverse'
                      } ${
                        animate ? 'opacity-0 translate-x-10' : ''
                      } transition-all duration-1000 ease-in-out`}
                    >
                      <div className="w-52 h-52 rounded-full overflow-hidden shadow-amber-700 shadow-sm animate-opacity">
                        <div className="relative w-full h-full shadow-amber-700 shadow-2xl">
                          <img
                            src={image}
                            alt="cocktail"
                            className="absolute w-full h-full object-cover transform-center"
                          />
                        </div>
                      </div>
                      <div className="pl-10 pr-10 ">
                        <h3 className="ml-3 py-2 pr-4 pl-1 leading-7 text-xl animate-opacity">
                          {cocktail.slug}
                        </h3>
                        <p
                          className={`text-white p-4 flex animate-opacity} ${
                            key % 2 === 0 ? '' : 'justify-end'
                          }`}
                        >
                          Note : &nbsp;
                          <BiSolidStar />
                          <BiSolidStar />
                          <BiSolidStar />
                          <BiSolidStar />
                        </p>
                        <p
                          className={`text-white p-4 flex animate-opacity  ${
                            key % 2 === 0 ? '' : 'justify-end'
                          }`}
                        >
                          Difficulté : Facile
                        </p>
                      </div>
                    </article>
                  </Link>
                ))
              : cocktailList.map((cocktail, key) => (
                  <Link key={key} to={`/cocktail/${cocktail.slug}`}>
                    <article
                      className={`mb-12 flex items-center ${
                        key % 2 === 0 ? '' : 'flex-row-reverse'
                      }`}
                    >
                      <div className="w-52 h-52 rounded-full overflow-hidden shadow-amber-700 shadow-sm">
                        <div className="relative w-full h-full shadow-amber-700 shadow-2xl">
                          <img
                            src={image}
                            alt="cocktail"
                            className="absolute w-full h-full object-cover transform-center"
                          />
                        </div>
                      </div>
                      <div className="pl-10 pr-10 ">
                        <h3 className="ml-3 py-2 pr-4 pl-1 leading-7 text-xl ">
                          {cocktail.slug}
                        </h3>
                        <p
                          className={`text-white p-4 flex  ${
                            key % 2 === 0 ? '' : 'justify-end'
                          }`}
                        >
                          Difficulté : Facile
                        </p>
                        <p
                          className={`text-white p-4 flex  ${
                            key % 2 === 0 ? '' : 'justify-end'
                          }`}
                        >
                          Note : &nbsp;
                          <BiSolidStar />
                          <BiSolidStar />
                          <BiSolidStar />
                          <BiSolidStar />
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
