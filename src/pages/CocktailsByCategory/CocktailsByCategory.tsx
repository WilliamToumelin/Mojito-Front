import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar';
import Page404 from '../../components/Error/Page404';
import Article from '../../components/CocktailItem/CocktailItem';
import { Category, Cocktails } from '../../types/types';

type Props = {
  categoriesData: Category[];
  cocktailList: Cocktails[];
};

const CocktailsByCategory: React.FC<Props> = ({
  categoriesData,
  cocktailList,
}) => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [animate, setAnimate] = useState(true);
  const url = useLocation();

  const categoryId = categoriesData.find(
    (category) => category.slug === categoryName
  )?.id;

  const filteredCocktails = cocktailList.filter((cocktail) => {
    // vérifie si au moins une catégorie d'un cocktail a un id correspondant à categoryId
    return cocktail.categories.some((category) => category.id === categoryId);
  });

  useEffect(() => {
    setAnimate(false);
  }, [url]);

  if (!categoryId) {
    return <Page404 />;
  }

  return (
    <div className="relative bg-black flex justify-center items-center flex-1 h-[75vh]">
      <SideBar
        filteredCocktails={filteredCocktails}
        currentCategory={categoryName}
      />
      <div className="relative w-4/5 lg:w-3/5 h-4/5 max-h-4/5 flex flex-col overflow-y-auto shadow-purple-700 shadow-2xl rounded-2xl bg-black">
        <div className="text-center pb-12">
          <h1 className="text-amber-700 text-2xl pt-5">{categoryName}</h1>
        </div>
        <div className="text-white p-12">
          {filteredCocktails.map((cocktailItemData: Cocktails, index) => (
            <Link key={index} to={`/cocktail/${cocktailItemData.slug}`}>
              <Article
                key={index}
                cocktail={cocktailItemData}
                animate={animate}
                modulo={index % 2 !== 0}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CocktailsByCategory;
