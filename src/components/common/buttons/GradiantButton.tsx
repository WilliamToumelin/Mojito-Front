/* eslint-disable react/require-default-props */
import React from 'react';

interface GradiantButtonProps {
  name: string;
  onClick?: () => void;
  height: number;
  width: number;
}

const GradiantButton: React.FC<GradiantButtonProps> = ({
  name,
  onClick = () => {},
  height,
  width,
}) => {
  const buttonStyle = {
    width: `${width}rem`,
    height: `${height}rem`,
  };
  return (
    <button
      type="button"
      onClick={onClick}
      style={buttonStyle}
      className="menu-link flex justify-center items-center rounded-r-lg bg-gradient-to-r from-dark-gray via-light-gray 
      to-light-brown hover:bg-gradient-to-r hover:from-[#1e353b] hover:via-[rgb(106, 116, 110);] hover:to-[#b3a8a0] 
      border-white text-dark-brown font-bold text-base"
    >
      {name}
    </button>
  );
};

export default GradiantButton;
