import React from 'react';
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

  return (
    <header className="bg-[#132226] w-full flex h-[20vh] items-center z-50">
      <div className="w-2/12 xl:w-2/12 flex pl-1 pt-1  ">
        <NavLink to="/" onClick={handleResetCategoryId}>
          <img
            className="min-w-150"
            width="160"
            src="../../../public/logo-cocktail.png"
            alt="Cocktail and link to home"
          />
        </NavLink>
      </div>
      <div className="w-8/12 block ">
        <div className="text-6xl md:text-8xl p-3 text-[#BE9063] text-center font-gluten font-extralight">
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
      <div className="w-2/12 hidden xl:flex flex-wrap justify-around space-y-2">
        {!isLoggedIn ? (
          ''
        ) : (
          <Link to="/proposition-cocktail">
            <SquaredButton
              name="Propose ton cocktail !"
              width={200}
              height={50}
              type="button"
            />
          </Link>
        )}
        <ConnectModal />
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
