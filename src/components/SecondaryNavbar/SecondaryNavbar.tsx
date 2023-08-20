/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import anime from 'animejs/lib/anime';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

type Cocktails = {
  id: number;
  slug: string;
  content: string;
  categoryId: number;
};

type Props = {
  filteredCocktails: Cocktails[];
};

const SecondaryNavbar: React.FC<Props> = ({ filteredCocktails }) => {
  const [categoryId, setCategoryId] = useState(1);

  const animeCocktail = () => {
    const random = () => {
      return anime.random(0, 0);
    };

    anime({
      targets: '.menu-button div',
      translateX: () => random(),
      scale: [0, 1],
      delay: anime.stagger(200),
    });
  };

  useEffect(() => {
    animeCocktail();
  }, [categoryId]);

  const handleCocktailClick = (clickedCategoryId: number) => {
    setCategoryId(clickedCategoryId);
  };

  return (
    <div className="absolute top-20 left-0 bg-grey lg:block w-56">
      {filteredCocktails.map((cocktail: Cocktails) => (
        <NavLink
          to={`/cocktail/${cocktail.slug}`}
          className="menu-button"
          key={cocktail.id}
        >
          <div
            className="menu-button pb-1 w-24 h-10 flex justify-center items-center bg-gradient-to-r from-purple-700 via-pink-500 to-orange-500 border-white transition-transform duration-400 ease-out hover:scale-125"
            onClick={() => handleCocktailClick(cocktail.categoryId)}
          >
            <span className="text-white font-bold text-base">
              {cocktail.categoryId}
            </span>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default SecondaryNavbar;
