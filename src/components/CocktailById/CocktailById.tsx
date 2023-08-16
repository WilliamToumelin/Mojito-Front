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
    <div className="main">
      <div className="main-container">
        <div className="main-cocktail-list">
          <article className="main-cocktail-single-article">
            <h1 className="main-cocktail-single-article-tile">
              {cocktailItem.title}
            </h1>
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
