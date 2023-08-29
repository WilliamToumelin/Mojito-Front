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
    className="menu-link w-52 h-8 flex justify-center items-center rounded-r-lg bg-gradient-to-r from-[#132226] via-[#525B56] to-[#A4978E] hover:bg-gradient-to-r hover:from-[#1e353b] hover:via-[rgb(106, 116, 110);] hover:to-[#b3a8a0] border-white transition-transform duration-400 ease-out hover:scale-125"
  >
    {name}
  </button>
);

export default GradientButtonOval;
