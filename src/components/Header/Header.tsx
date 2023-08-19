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

  const category = () => {
    const random = () => {
      return anime.random(0, 80);
    };

    anime({
      targets: '.menu-link div',
      translateY: () => random(),
      scale: [0, 1],
      delay: anime.stagger(200),
    });
  };

  useEffect(() => {
    category();
  }, [categoryId]);

  const handleCategoryClick = (clickedCategoryId: number) => {
    setCategoryId(clickedCategoryId);
  };

  return (
    <header className="menu">
      {/* <div>CategoryId: {categoryId}</div> */}
      <nav className="menu-nav">
        <NavLink to="/">Home</NavLink>
        {categoriesData.map((categoryItem: Category) => (
          <NavLink
            key={categoryItem.id}
            className={
              categoryId === categoryItem.id
                ? 'menu-link menu-link--selected'
                : 'menu-link menu-link'
            }
            to={`/${categoryItem.slug}`}
          >
            <div onClick={() => handleCategoryClick(categoryItem.id)}>
              {categoryItem.name}
            </div>
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
