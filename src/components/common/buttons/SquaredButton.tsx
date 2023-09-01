/* eslint-disable react/require-default-props */
import React from 'react';

interface SquaredButtonProps {
  name: string;
  type: 'button' | 'submit';
  onClick?: () => void;
  height: number;
  width: number;
  fontColor?: string;
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
  fontColor,
  fontColorHover,
  bgColor,
  bgColorHover,
}) => {
  const buttonStyle = {
    width: `${width}rem`,
    height: `${height}rem`,
  };
  return (
    <button
      type={type === 'button' ? 'button' : 'submit'}
      onClick={onClick}
      style={buttonStyle}
      className={`
        menu-link flex justify-center items-center border border-light-brown
        font-medium rounded-lg text-base text-center ${height} ${width} 
        ${fontColor || 'text-dark-gray'}
        ${fontColorHover || 'hover:text-dark-gray'}
        ${bgColor || 'bg-dark-brown'}
        ${bgColorHover || 'hover:bg-light-brown'}
        
      `}
    >
      {name}
    </button>
  );
};

export default SquaredButton;
