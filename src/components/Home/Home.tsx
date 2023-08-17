// Home.tsx
import React, { useState } from 'react';
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
    <div className="bg-black flex justify-center items-center flex-1">
      <div className="w-3/5 h-4/5 flex flex-col overflow-y-auto shadow-amber-700 shadow-2xl rounded-2xl bg-black">
        <div className="text-center pb-12">
          <h1 className="text-amber-700 text-2xl">
            {displayMode
              ? 'Les 5 cinq cocktails les mieux notés'
              : 'Tous nos cocktails'}
          </h1>
        </div>
        <div className="flex justify-center mb-10">
          <button
            className="text-amber-700 text-xl"
            type="button"
            onClick={handleToggle}
          >
            {displayMode ? 'Tous' : 'Top 5'}
          </button>
        </div>
        <div className="text-white p-4 flex">
          <ul>
            {displayMode
              ? cocktailTop5.map((cocktail, key) => (
                  <Link key={key} to={`/cocktail/${cocktail.slug}`}>
                    <article className="main-cocktail-list-article">
                      <h3 className="space-y-2 py-2 text-base leading-7">
                        {cocktail.slug}
                      </h3>
                    </article>
                  </Link>
                ))
              : cocktailList.map((cocktail, key) => (
                  <Link key={key} to={`/cocktail/${cocktail.slug}`}>
                    <article className="main-cocktail-list-article">
                      <h3 className="space-y-2 py-2 text-base leading-10">
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
