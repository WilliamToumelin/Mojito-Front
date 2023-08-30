import React from 'react';

interface MenuButtonProps {
  name: string;
  onClick: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ name, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="menu-link flex justify-center items-center w-28 h-12 hover:bg-[#A4978E] rounded-full text-[#BE9063] hover:text-[#525B56] text-base bg-[#525B56] border-[#A4978E] border-2"
  >
    {name}
  </button>
);

export default MenuButton;
