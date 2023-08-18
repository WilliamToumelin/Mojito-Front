// CocktailByCat.tsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
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
  const categoryId = categoriesData.find(
    (category) => category.slug === categoryName
  )?.id;

  const filteredCocktails = cocktailList.filter(
    (cocktail) => cocktail.categoryId === categoryId
  );

  if (!categoryId) {
    return <Page404 />;
  }

  return (
    <div className="relative bg-black flex justify-center items-center flex-1 h-[85vh]">
      <SecondaryNavbar filteredCocktails={filteredCocktails} />
      <div className="w-4/5 lg:w-3/5 max-h-4/5 h-4/5 flex flex-col overflow-y-auto shadow-amber-700 shadow-2xl rounded-2xl bg-black">
        <div className="text-center pb-12">
          <h1 className="text-amber-700 text-2xl">{categoryName}</h1>
        </div>
        <div className="">
          {filteredCocktails.map((cocktailItemData: Cocktails, key) => (
            <Link key={key} to={`/cocktail/${cocktailItemData.slug}`}>
              <article className="border border-gray flex h-72 items-center">
                <div className="w-52 h-52 rounded-full overflow-hidden shadow-amber-700 shadow-2xl m-5">
                  <div className="relative w-full h-full ">
                    <img
                      src={image}
                      alt="cocktail"
                      className="absolute w-full h-full object-cover transform-center "
                    />
                  </div>
                </div>
                <div className="m-3">
                  <h3 className="text-white p-4 flex">
                    {cocktailItemData.slug}
                  </h3>
                  <p className="text-white p-4 flex">Difficulté: Facile</p>
                  <p className="text-white p-4 flex">Note : 8/10</p>
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
