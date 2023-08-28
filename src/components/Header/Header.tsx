import React from 'react';
import { useNavigate } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import ConnectModal from '../Modals/ConnectModal';
import CategorySelectBar from '../CategorySelectBar/CategorySelectBar';
import { useAuth } from '../../contexts/AuthProvider';

interface HeaderProps {
  categoryId: number | null;
  setCategoryId: (id: number | null) => void;
}

const Header: React.FC<HeaderProps> = ({ categoryId, setCategoryId }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleResetCategoryId = () => {
    setCategoryId(null);
    navigate('/');
  };

  return (
    <header className=" bg-gray-900 px-3 pt-2 pb-12 w-full flex h-[20vh]">
      <div className="w-[50%] lg:w-[25%] flex items-center">
        <h1 className="text-white">Mojit&apos;o</h1>
        <NavLink to="/" onClick={handleResetCategoryId}>
          <img
            className=""
            width="90"
            height="90"
            src="https://img.icons8.com/external-icongeek26-outline-gradient-icongeek26/64/external-cocktail-party-icongeek26-outline-gradient-icongeek26.png"
            alt="Cocktail and link to home"
          />
        </NavLink>
      </div>
      <div className="hidden lg:block flex justify-start items-center w-[50%]">
        <CategorySelectBar
          categoryId={categoryId}
          setCategoryId={setCategoryId}
        />
      </div>
      <div className="hidden lg:flex justify-end items-center w-[25%]">
        {!isLoggedIn ? (
          ''
        ) : (
          <Link to="/proposition-cocktail">
            <button
              type="button"
              className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
            >
              Propose ton cocktail!
            </button>
          </Link>
        )}
        <ConnectModal />
      </div>
      <div className="lg:hidden flex justify-end items-center w-[50%] mr-6 ">
        <div className="p-4 space-y-2 bg-gray-600 rounded shadow">
          <span className="block w-8 h-0.5 bg-gray-100 animate-pulse" />
          <span className="block w-8 h-0.5 bg-gray-100 animate-pulse" />
          <span className="block w-8 h-0.5 bg-gray-100 animate-pulse" />
        </div>
      </div>
    </header>
  );
};

export default Header;
