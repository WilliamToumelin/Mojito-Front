import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SecondaryNavbar from '../SecondaryNavbar/SecondaryNavbar';
import Page404 from '../Error/Page404';

import '../../styles/index.scss';

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
    <div className="main">
      <SecondaryNavbar filteredCocktails={filteredCocktails} />
      <div className="main-container">
        <h1 className="main-title">{categoryName}</h1>
        <div className="main-cocktail-list">
          {filteredCocktails.map((cocktailItemData: Cocktails, key) => (
            <Link key={key} to={`/cocktail/${cocktailItemData.slug}`}>
              <article className="main-cocktail-list-article">
                <h3 className="main-cocktail-list-article-title">
                  {cocktailItemData.slug}
                </h3>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CocktailByCat;
