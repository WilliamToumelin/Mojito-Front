import React from 'react';
import { NavLink } from 'react-router-dom';
import anime from 'animejs';
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
  const [categoryId, setCategoryId] = React.useState<number | null>(null);

  const z = () => {
    const random = () => {
      return anime.random(100, 150);
    };

    anime({
      targets: '.menu-button div',
      translateY: () => random(),
      scale: [0, 1],
      delay: anime.stagger(100),
    });
  };

  React.useEffect(() => {
    z();
  }, [categoryId]);

  const handleCategoryClick = (clickedCategoryId: number) => {
    setCategoryId(clickedCategoryId);
  };

  return (
    <header className="menu">
      <div>
        <div>CategoryId: {categoryId}</div>
      </div>
      <nav className="menu-nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'menu-link menu-link--selected' : 'menu-link menu-link'
          }
        >
          Home
        </NavLink>
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
            <div
              onClick={() => handleCategoryClick(categoryItem.id)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Space' || e.key === '') {
                  handleCategoryClick(categoryItem.id);
                }
              }}
            >
              {categoryItem.name}
            </div>
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
