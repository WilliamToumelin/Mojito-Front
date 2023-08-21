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
  currentCategory?: string | undefined;
};

const SideBar: React.FC<Props> = ({ filteredCocktails, currentCategory }) => {
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
  }, [categoryId, currentCategory]);

  const handleCocktailClick = (clickedCategoryId: number) => {
    setCategoryId(clickedCategoryId);
  };

  return (
    <div className="absolute top-20 lg:block w-56 z-10 left-0">
      <div className="flex flex-col gap-1">
        {filteredCocktails.map((cocktail: Cocktails) => (
          <NavLink
            to={`/cocktail/${cocktail.slug}`}
            className="menu-button"
            key={cocktail.id}
          >
            <div
              className="menu-button w-32 h-8 flex justify-center items-center rounded-r-lg bg-gradient-to-r from-purple-700 via-pink-500 to-orange-500 border-white transition-transform duration-400 ease-out hover:scale-125"
              onClick={() => handleCocktailClick(cocktail.categoryId)}
            >
              <span className="text-white font-bold text-base">
                {cocktail.categoryId}
              </span>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

SideBar.defaultProps = {
  currentCategory: undefined,
};

export default SideBar;
