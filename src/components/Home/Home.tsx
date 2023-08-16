import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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

const Home: React.FC<Props> = ({ cocktailList }) => {
  const cocktailTop5 = cocktailList.filter(
    (cocktail5) => cocktail5.categoryId <= 2
  );
  const [displayMode, setDisplayMode] = useState(true);
  const handleToggle = () => {
    setDisplayMode((prevToggle) => !prevToggle);
  };
  return (
    <div className="main">
      <div className="secondary-navbar--home" />
      <div className="main-container">
        <h1 className="main-title">
          {displayMode
            ? 'Les 5 cinq cocktail les mieux notés'
            : 'Tout nos cocktails'}
        </h1>
        <div className="main-cocktail-list">
          <button type="button" onClick={handleToggle}>
            {displayMode ? 'All' : 'Top 5'}
          </button>
          <ul>
            {displayMode
              ? cocktailTop5.map((cocktail, key) => (
                  <Link key={key} to={`/cocktail/${cocktail.slug}`}>
                    <article className="main-cocktail-list-article">
                      <h3 className="main-cocktail-list-article-title">
                        {cocktail.slug}
                      </h3>
                    </article>
                  </Link>
                ))
              : cocktailList.map((cocktail, key) => (
                  <Link key={key} to={`/cocktail/${cocktail.slug}`}>
                    <article className="main-cocktail-list-article">
                      <h3 className="main-cocktail-list-article-title">
                        {cocktail.slug}
                      </h3>
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
