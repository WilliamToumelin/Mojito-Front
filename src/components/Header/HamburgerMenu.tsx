/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAuth } from '../../contexts/AuthProvider';
import { Category } from '../../types/types';
import ConnectModal from '../Modals/ConnectModal';
import { apiHostName } from '../../env-config';

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
  const location = useLocation();

  const userToken = Cookies.get('userToken');
  let userPseudo: string | null = null;

  if (userToken) {
    const userTokenObj = JSON.parse(userToken);
    userPseudo = userTokenObj.pseudonym;
  }

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
    // Ferme le menu lorsque l'URL change
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    fetch(`${apiHostName}/api/categories`)
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
        onClick={toggleMenu}
        className="inline-flex items-center justify-center p-2 w-fit h-fit text-lg text-dark-brown rounded-lg hover:bg-light-brown "
        aria-controls="navbar-hamburger"
        aria-expanded={isMenuOpen}
      >
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
        className={`w-[80%] max-w-[80%] z-50 absolute right-0 top-24 rounded 
         ${isMenuOpen ? '' : 'hidden'}`}
        id="navbar-hamburger"
      >
        <ul className="w-3/4 flex flex-col font-medium mt-6 text-2xl rounded-lg bg-light-gray text-center overflow-y-auto max-h-[70vh] relative">
          <button
            type="button"
            className="absolute right-5 top-3 text-3xl p-2 text-dark-gray hover:text-dark-brown z-50"
            onClick={handleCloseMenu}
          >
            X
          </button>
          <li>
            <NavLink
              to="/"
              className="block py-4 text-dark-gray hover:text-dark-brown rounded"
              onClick={() => {
                handleCloseMenu();
              }}
            >
              Home
            </NavLink>
          </li>
          <hr className="border-0.5 w-1/3 m-auto border-light-brown" />
          <li className="flex justify-center">
            <NavLink
              to="/proposition-cocktail"
              className={`block py-5 text-dark-gray hover:text-dark-brown rounded ${
                !isLoggedIn ? 'hidden' : ''
              }`}
              onClick={() => {
                handleCloseMenu();
              }}
            >
              Propose ton cocktail!
            </NavLink>
          </li>
          <hr className="border-0.5 w-1/3 m-auto border-light-brown pb-3" />
          {categoriesDataMemo.slice(0, 6).map((categoryItem: Category) => (
            <li key={categoryItem.id} className="">
              <NavLink
                key={categoryItem.id}
                to="/"
                className="block py-2 text-light-brown hover:text-dark-brown rounded"
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

          <li className="flex justify-center text-xl text-light-gray py-3">
            <ConnectModal />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HamburgerMenu;
