/* eslint-disable react/require-default-props */
import React from 'react';

interface RoundedButtonProps {
  name: string;
  onClick?: () => void;
  height: number;
  width: number;
}

const RoundedButton: React.FC<RoundedButtonProps> = ({
  name,
  onClick = () => {},
  height,
  width,
}) => {
  const buttonStyle = {
    width: `${width}px`,
    height: `${height}px`,
  };
  return (
    <button
      type="button"
      onClick={onClick}
      style={buttonStyle}
      className={`menu-link flex justify-center items-center rounded-r-lg bg-gradient-to-r from-[#132226] via-[#525B56] to-[#A4978E] hover:bg-gradient-to-r hover:from-[#1e353b] hover:via-[rgb(106, 116, 110);] hover:to-[#b3a8a0] border-white transition-transform duration-400 ease-out hover:scale-125 text-[#BE9063] font-bold text-base w-${width} h-${height}`}
    >
      {name}
    </button>
  );
};

export default RoundedButton;
