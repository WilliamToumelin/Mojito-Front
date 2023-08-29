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
    <header className="bg-[#132226] px-3 pt-2 pb-12 w-full flex h-[20vh]">
      <div className="w-[50%] lg:w-[25%] h-full flex align-center">
        <NavLink to="/" onClick={handleResetCategoryId}>
          <img
            className="border-[#A4978E] border-8 rounded-full"
            width="160"
            height="160"
            src="../../../public/logo-cocktail.png"
            alt="Cocktail and link to home"
          />
        </NavLink>
      </div>
      <div className="block">
        <div className="text-8xl text-[#A4978E] text-center font-semibold pb-7">
          <h1>Mojit&apos;o</h1>
        </div>
        <div className="hidden lg:flex justify-start items-center w-[50%]">
          <CategorySelectBar
            categoryId={categoryId}
            setCategoryId={setCategoryId}
          />
        </div>
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
    </header>
  );
};

export default Header;
