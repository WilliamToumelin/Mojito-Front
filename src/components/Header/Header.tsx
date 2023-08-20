/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import anime from 'animejs/lib/anime';
// import ConnectModal from '../ConnectModal/ConnectModal';

type Category = {
  id: number;
  slug: string;
  name: string;
};

type Props = {
  categoriesData: Category[];
};

const Header: React.FC<Props> = ({ categoriesData }) => {
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const animeCategory = () => {
    const random = () => {
      return anime.random(0, 100);
    };

    anime({
      targets: '.menu-link div',
      translateY: () => random(),
      scale: [0, 1],
      delay: anime.stagger(200),
    });
  };

  useEffect(() => {
    animeCategory();
  }, [categoryId]);

  const handleCategoryClick = (clickedCategoryId: number) => {
    setCategoryId(clickedCategoryId);
  };

  const handleResetCategoryId = () => {
    setCategoryId(null);
  };

  return (
    <header className="bg-black px-3 pt-2 pb-24">
      <NavLink to="/" onClick={handleResetCategoryId}>
        <div className="text-white">Home</div>
      </NavLink>
      <nav className="flex justify-center gap-40 no-underline text-white delay-30">
        {categoriesData.map((categoryItem: Category) => (
          <NavLink
            key={categoryItem.id}
            className={
              categoryId === categoryItem.id
                ? 'menu-link menu-link--selected animate-bounce'
                : 'menu-link menu-link'
            }
            to={`/${categoryItem.slug}`}
          >
            <div
              className="flex justify-center items-center w-28 h-12 rounded-full bg-gradient-to-r from-purple-700 via-pink-500 to-orange-500 border-white transition duration-100 ease-in-out"
              onClick={() => handleCategoryClick(categoryItem.id)}
            >
              <span className="text-white font-bold text-base">
                {categoryItem.name}
              </span>
            </div>
          </NavLink>
        ))}
      </nav>
      <div className="text-white">CategoryId: {categoryId}</div>
    </header>
  );
};

export default Header;
