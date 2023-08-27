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
    className="menu-link flex justify-center items-center w-28 h-12 rounded-full text-white font-bold text-base hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-400 hover:to-orange-400 bg-gradient-to-r from-purple-700 via-pink-600 to-orange-400"
  >
    {name}
  </button>
);

export default GradientButtonOval;
