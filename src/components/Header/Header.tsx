/* eslint-disable no-console */
import React from 'react';
import { NavLink } from 'react-router-dom';

import '../../styles/index.scss';

type Category = {
  id: number;
  slug: string;
  name: string;
};

type Props = {
  categoriesData: Category[];
};

const Header: React.FC<Props> = ({ categoriesData }) => {
  return (
    <header className="menu">
      <nav className="menu-nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'menu-link menu-link--selected' : 'menu-link menu-link'
          }
        >
          Home
        </NavLink>
        {categoriesData.map((categoryItem: Category, key) => (
          <NavLink
            key={key}
            className={({ isActive }) =>
              isActive ? 'menu-link menu-link--selected' : 'menu-link menu-link'
            }
            to={`/${categoryItem.slug}`}
          >
            {categoryItem.name}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
