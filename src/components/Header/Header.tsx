/* eslint-disable no-console */
import React, { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import anime from 'animejs/lib/anime';
import ConnectModal from '../Modals/ConnectModal';
import { Category } from '../../types/types';

const Header: React.FC = () => {
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);

  useEffect(() => {
    fetch('http://localhost:5174/api/categories')
      .then((response) => response.json())
      .then((data: Category[]) => {
        setCategoriesData(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const animeCategory = () => {
    const random = () => {
      return anime.random(10, 40);
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

  const categoriesDataMemo = useMemo(() => categoriesData, [categoriesData]);

  return (
    <header className="relative bg-black px-3 pt-2 pb-12">
      <NavLink to="/" onClick={handleResetCategoryId}>
        <img
          className="absolute top-2 left-2 pt-6 pl-6"
          width="90"
          height="90"
          src="https://img.icons8.com/external-icongeek26-outline-gradient-icongeek26/64/external-cocktail-party-icongeek26-outline-gradient-icongeek26.png"
          alt="external-cocktail-party-icongeek26-outline-gradient-icongeek26"
        />
      </NavLink>
      <nav className="flex justify-center gap-20 no-underline text-white delay-30">
        {categoriesDataMemo.slice(0, 6).map((categoryItem: Category) => (
          <NavLink
            key={categoryItem.id}
            to={categoryId ? `/${categoryItem.slug}` : '/'}
          >
            <button
              type="button"
              className={`flex justify-center items-center w-28 h-12 rounded-full ${
                categoryId === categoryItem.id
                  ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500'
                  : 'bg-gradient-to-r from-gray-400 to-gray-500'
              } hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-400 hover:to-orange-400 border-white transition duration-100 ease-in-out`}
              onClick={() => handleCategoryClick(categoryItem.id)}
            >
              <span className="text-white font-bold text-base">
                {categoryItem.name}
              </span>
            </button>
          </NavLink>
        ))}
      </nav>
      <div className="absolute top-2 right-2 pt-6 pl-6">
        <ConnectModal />
      </div>
    </header>
  );
};

export default Header;
