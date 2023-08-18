import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import SecondaryNavbar from '../SecondaryNavbar/SecondaryNavbar';
import Page404 from '../Error/Page404';
import Article from '../Article/Article';

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

export default CocktailByCat;
