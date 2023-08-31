/* eslint-disable react/button-has-type */
/* eslint-disable react/require-default-props */
import React from 'react';

interface SquaredButtonProps {
  name: string;
  type: 'button' | 'submit';
  onClick?: () => void;
  height: number;
  width: number;
  fontcolor?: string;
  fontColorHover?: string;
  bgColorHover?: string;
}

const SquaredButton: React.FC<SquaredButtonProps> = ({
  name,
  type = 'button',
  onClick = () => {},
  height,
  width,
  fontcolor = '[#BE9063]',
  fontColorHover = '[#BE9063]',
  bgColorHover = '[#525B56]',
}) => {
  const buttonStyle = {
    width: `${width}px`,
    height: `${height}px`,
    fontcolor,
    fontColorHover,
    bgColorHover,
  };
  return (
    <button
      type={type}
      onClick={onClick}
      style={buttonStyle}
      className={`menu-link flex justify-center items-center w-${width} h-${height} bg-[#132226] text-${fontcolor} border border-[#A4978E] 
      hover:bg-${bgColorHover} hover:text-${fontColorHover} font-medium rounded-lg text-base text-center`}
    >
      {name}
    </button>
  );
};

export default SquaredButton;
