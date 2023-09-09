/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import ConnectModal from '../Modals/ConnectModal';
import CategorySelectBar from '../CategorySelectBar/CategorySelectBar';
import { useAuth } from '../../contexts/AuthProvider';
import HamburgerMenu from './HamburgerMenu';
import SquaredButton from '../common/buttons/SquaredButton';

interface HeaderProps {
  categoryId: number | null;
  setCategoryId: (id: number | null) => void;
  setCategoryName: (name: string | null) => void;
}

const Header: React.FC<HeaderProps> = ({
  categoryId,
  setCategoryId,
  setCategoryName,
}) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleResetCategoryId = () => {
    setCategoryId(null);
    navigate('/');
  };

  const userToken = Cookies.get('userToken');
  let userPseudo: string | null = null;

  if (userToken) {
    const userTokenObj = JSON.parse(userToken);
    userPseudo = userTokenObj.pseudonym;
  }

  return (
    <header className="bg-dark-gray w-full flex h-[20vh] items-center z-50">
      <div className="w-2/12 xl:w-2/12 flex pl-5">
        <NavLink to="/" onClick={handleResetCategoryId}>
          <img
            className="min-w-150 rounded-full -rotate-12"
            width="160"
            src="/logo1.png"
            alt="Cocktail and link to home"
          />
        </NavLink>
      </div>
      <div className="w-8/12 block ">
        <div className="text-5xl sm:text-7xl md:text-8xl p-3 text-dark-brown text-center font-gluten font-extralight">
          <h1>Mojit&apos;o</h1>
        </div>
        <div className="hidden xl:flex items-center justify-center">
          <CategorySelectBar
            categoryId={categoryId}
            setCategoryId={setCategoryId}
            setCategoryName={setCategoryName}
          />
        </div>
      </div>
      <div className="w-2/12 hidden xl:flex items-center flex-col space-y-2">
        {!isLoggedIn ? (
          ''
        ) : (
          <Link to="/proposition-cocktail">
            <SquaredButton
              name="Propose ton cocktail !"
              width={12}
              height={2.5}
              type="button"
            />
          </Link>
        )}
        <ConnectModal />
        {isLoggedIn ? (
          <p className="menu-link text-light-brown text-center">
            Bonjour, {userPseudo}!
          </p>
        ) : (
          ''
        )}
      </div>
      <HamburgerMenu
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        setCategoryName={setCategoryName}
      />
    </header>
  );
};

export default Header;
