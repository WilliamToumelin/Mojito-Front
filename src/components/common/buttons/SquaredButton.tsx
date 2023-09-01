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
  bgColor?: string;
  bgColorHover?: string;
}

const SquaredButton: React.FC<SquaredButtonProps> = ({
  name,
  type = 'button',
  onClick = () => {},
  height,
  width,
  fontcolor = '[#BE9063]',
  fontColorHover = '[#132226]',
  bgColor = '[#525B56]',
  bgColorHover = '[#BE9063]',
}) => {
  const buttonStyle = {
    width: `${width}px`,
    height: `${height}px`,
    fontcolor,
    fontColorHover,
    bgColorHover,
    bgColor,
  };
  return (
    <button
      type={type}
      onClick={onClick}
      style={buttonStyle}
      className={`menu-link flex justify-center items-center w-${width} h-${height} bg-${bgColor} text-${fontcolor} border border-[#A4978E] 
      hover:bg-${bgColorHover} hover:text-${fontColorHover} font-medium rounded-lg text-base text-center`}
    >
      {name}
    </button>
  );
};

export default SquaredButton;
