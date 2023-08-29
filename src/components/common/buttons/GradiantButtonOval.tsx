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
    className="menu-link flex justify-center items-center w-28 h-12 rounded-full text-white font-bold text-base bg-gradient-to-r from-[#132226] via-[#525B56] to-[#A4978E] hover:bg-gradient-to-r hover:from-[#1e353b] hover:via-[rgb(106, 116, 110);] hover:to-[#b3a8a0]"
  >
    {name}
  </button>
);

export default GradientButtonOval;
