import React from 'react';
import { useNavigate } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import ConnectModal from '../Modals/ConnectModal';
import CategorySelectBar from '../CategorySelectBar/CategorySelectBar';
import { useAuth } from '../../contexts/AuthProvider';

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
    <header className="bg-[#132226] px-3 pt-2 pb-12 w-full flex h-[20vh]">
      <div className="w-2/12 flex pl-1 pt-1">
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
      <div className="w-8/12 block">
        <div className="text-8xl p-3 text-[#BE9063] text-center font-gluten font-extralight">
          <h1>Mojit&apos;o</h1>
        </div>
        <div className="hidden lg:flex items-center justify-center">
          <CategorySelectBar
            categoryId={categoryId}
            setCategoryId={setCategoryId}
            setCategoryName={setCategoryName}
          />
        </div>
      </div>
      <div className="w-2/12 hidden lg:flex justify-end items-center">
        {!isLoggedIn ? (
          ''
        ) : (
          <Link to="/proposition-cocktail">
            <button
              type="button"
              className="text-[#BE9063] border border-[#A4978E] hover:bg-[#525B56] font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Propose ton cocktail !
            </button>
          </Link>
        )}
        <ConnectModal />
      </div>
    </header>
  );
};

export default Header;
