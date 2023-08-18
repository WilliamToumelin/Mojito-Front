/* eslint-disable no-nested-ternary */
// CocktailByCat.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { BiSolidStar } from 'react-icons/bi';
import SecondaryNavbar from '../SecondaryNavbar/SecondaryNavbar';
import Page404 from '../Error/Page404';
import image from '../../images/image.jpeg';

type Category = {
  id: number;
  slug: string;
  name: string;
};

type Cocktails = {
  categoryId: number;
  id: number;
  slug: string;
  content: string;
  title: string;
};

type Props = {
  categoriesData: Category[];
  cocktailList: Cocktails[];
};

const CocktailByCat: React.FC<Props> = ({ categoriesData, cocktailList }) => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [animate, setAnimate] = useState(true);
  const url = useLocation();

  const categoryId = categoriesData.find(
    (category) => category.slug === categoryName
  )?.id;

  const filteredCocktails = cocktailList.filter(
    (cocktail) => cocktail.categoryId === categoryId
  );

  useEffect(() => {
    setAnimate(false);
  }, [url]);

  if (!categoryId) {
    return <Page404 />;
  }

  return (
    <div className="relative bg-black flex justify-center items-center flex-1 h-[75vh]">
      <SecondaryNavbar filteredCocktails={filteredCocktails} />
      <div className="relative w-4/5 lg:w-3/5 h-4/5 max-h-4/5 flex flex-col overflow-y-auto shadow-amber-700 shadow-2xl rounded-2xl bg-black">
        <div className="text-center pb-12">
          <h1 className="text-amber-700 text-2xl pt-5">{categoryName}</h1>
        </div>
        <div className="text-white p-12">
          {filteredCocktails.map((cocktailItemData: Cocktails, key) => (
            <Link key={key} to={`/cocktail/${cocktailItemData.slug}`}>
              <article
                className={`mb-12 flex items-center ${
                  key % 2 === 0 ? '' : 'flex-row-reverse'
                } ${
                  key % 2 === 0
                    ? animate
                      ? 'opacity-0 translate-x-28'
                      : ''
                    : animate
                    ? 'opacity-0 -translate-x-28'
                    : ''
                } transition-all ease-in duration-1200`}
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
                    {cocktailItemData.slug}
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
        </div>
      </div>
    </div>
  );
};

export default CocktailByCat;
