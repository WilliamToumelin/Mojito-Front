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
  fontcolor = '#BE9063',
  bgColor = '#525B56',
  fontColorHover = '#132226',
  bgColorHover = '#BE9063',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        color: fontcolor,
        backgroundColor: bgColor,
      }
    :hover {
      
    }}
      className="menu-link flex justify-center items-center border border-[#A4978E] font-medium rounded-lg text-base text-center button" // Appliquez la classe ici
    >
      {name}
    </button>
  );
};