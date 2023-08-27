import React from 'react';

interface GradientButtonProps {
  name: string;
  onClick: () => void;
}

const GradientButtonOval: React.FC<GradientButtonProps> = ({
  name,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className="menu-link w-52 h-8 flex justify-center items-center rounded-r-lg text-white font-bold text-base bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-400 hover:to-orange-400 border-white transition-transform duration-400 ease-out hover:scale-125"
  >
    {name}
  </button>
);

export default GradientButtonOval;
