import React from 'react';
import { useParams } from 'react-router-dom';
import Page404 from '../Error/Page404';

import '../../styles/index.scss';

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

const CocktailById: React.FC<Props> = ({ cocktailList }) => {
  const { slug } = useParams<{ slug: string }>();

  const cocktailItem = cocktailList.find((cocktail) => cocktail.slug === slug);

  if (!cocktailItem) {
    return <Page404 />;
  }

  return (
    <div className="bg-black flex justify-center items-center flex-1">
      <div className="w-3/5 h-4/5 flex flex-col overflow-y-auto shadow-amber-700 shadow-2xl rounded-2xl bg-black">
        <div className="text-center pb-12">
          <article className="main-cocktail-single-article">
            <h1 className="text-amber-700 text-2xl">{cocktailItem.title}</h1>
            <div className="main-cocktail-single-article-content">
              {cocktailItem.content}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default CocktailById;
