/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';
import { Category } from '../../types/types';
import ConnectModal from '../Modals/ConnectModal';
import Hr from '../common/Hr/Hr';

interface HamburgerMenuProps {
  categoryId: number | null;
  setCategoryId: (id: number | null) => void;
  setCategoryName: (name: string | null) => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  categoryId,
  setCategoryId,
  setCategoryName,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const { isLoggedIn } = useAuth();

  const handleCategoryClick = (clickedCategoryId: number) => {
    setCategoryId(clickedCategoryId);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false); // Ferme le menu lorsque vous sélectionnez une catégorie
  };

  const handleCategoryNameClick = (clickedCategoryName: string) => {
    setCategoryName(clickedCategoryName);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    fetch('http://localhost:5174/api/categories')
      .then((response) => response.json())
      .then((data: Category[]) => {
        setCategoriesData(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const categoriesDataMemo = useMemo(() => categoriesData, [categoriesData]);

  return (
    <div className="xl:hidden w-1/4 h-full flex justify-center items-center">
      <button
        type="button"
        onClick={toggleMenu} // Appel de la fonction pour basculer l'état du menu
        className="inline-flex items-center justify-center p-2 w-fit h-fit text-lg text-dark-brown rounded-lg hover:bg-light-brown "
        aria-controls="navbar-hamburger"
        aria-expanded={isMenuOpen} // Mettre à jour l'attribut aria-expanded
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-12 h-12 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
      <div
        className={`w-[80%] z-50 absolute right-0 top-24 rounded
         ${isMenuOpen ? '' : 'hidden'}`}
        id="navbar-hamburger"
      >
        <ul className="w-3/4 flex flex-col font-medium mt-6 text-3xl rounded-lg bg-light-gray text-center">
          <li>
            <NavLink
              to="/"
              className="block py-2 text-white rounded"
              onClick={() => {
                handleCloseMenu();
              }}
            >
              Home
            </NavLink>
          </li>
          <hr className="border-2 border-white" />
          <li className="flex justify-center mb-2">
            <NavLink
              to="/proposition-cocktail"
              className={`block py-2 text-white rounded ${
                !isLoggedIn ? 'hidden' : ''
              }`}
              onClick={() => {
                handleCloseMenu();
              }}
            >
              Propose ton cocktail!
            </NavLink>
          </li>
          {categoriesDataMemo.slice(0, 6).map((categoryItem: Category) => (
            <li key={categoryItem.id}>
              <NavLink
                key={categoryItem.id}
                to="/"
                className="block py-2 text-white rounded"
                onClick={() => {
                  handleCategoryClick(categoryItem.id);
                  handleCategoryNameClick(categoryItem.name);
                  handleCloseMenu();
                }}
              >
                {categoryItem.name}
              </NavLink>
            </li>
          ))}

          <li className="flex justify-center mb-2 text-xl text-light-gray">
            <ConnectModal />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HamburgerMenu;
