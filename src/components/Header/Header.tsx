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

    anime({
      targets: [
        '.svg-attributes-demo polygon',
        'feTurbulence',
        'feDisplacementMap',
      ],
      points: '64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96',
      baseFrequency: 0,
      scale: 1,
      loop: false,
      direction: 'alternate',
      easing: 'easeInOutExpo',
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
      <nav className="flex justify-around no-underline text-white delay-30">
        <NavLink to="/" onClick={handleResetCategoryId}>
          <div className="text-white">Home</div>
        </NavLink>
        {categoriesData.map((categoryItem: Category) => (
          <NavLink
            key={categoryItem.id}
            className={
              categoryId === categoryItem.id
                ? 'menu-link menu-link--selected text-black delay-75'
                : 'menu-link menu-link delay-75 hover:text-amber-500'
            }
            to={`/${categoryItem.slug}`}
          >
            <div
              className="w-16 h-16 bg-amber-700 flex items-center justify-center"
              onClick={() => handleCategoryClick(categoryItem.id)}
            >
              {categoryItem.name}
            </div>
          </NavLink>
        ))}
      </nav>
      <div className="text-white">CategoryId: {categoryId}</div>
    </header>
  );
};

export default Header;
