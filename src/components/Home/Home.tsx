import React, { useState } from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';

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
    <div className={`home ${displayMode ? 'top5-mode' : 'all-mode'}`}>
      <h1>Home</h1>
      <button type="button" onClick={handleToggle}>
        {displayMode ? 'Tout les cocktails' : 'Le Top 5'}
      </button>
      <ul>
        {displayMode
          ? cocktailTop5.map((cocktail, key) => (
              <Link key={key} to={`/cocktail/${cocktail.slug}`}>
                <li>{cocktail.slug}</li>
              </Link>
            ))
          : cocktailList.map((cocktail, key) => (
              <Link key={key} to={`/cocktail/${cocktail.slug}`}>
                <li>{cocktail.slug}</li>
              </Link>
            ))}
      </ul>
    </div>
  );
};

export default Home;
