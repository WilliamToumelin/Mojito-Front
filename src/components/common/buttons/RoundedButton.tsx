/* eslint-disable react/require-default-props */
import React from 'react';

interface RoundedButtonProps {
  name: string | boolean;
  onClick?: () => void;
  height: number;
  width: number;
  isActive: boolean;
}

const RoundedButton: React.FC<RoundedButtonProps> = ({
  name,
  onClick = () => {},
  height,
  width,
  isActive,
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
      className={`menu-link flex justify-center items-center rounded-full z-50
      text-base border-dark-gray border-2
      ${
        isActive
          ? 'text-light-gray hover:text-light-gray bg-light-brown hover:bg-light-brown'
          : 'text-dark-brown hover:text-light-gray bg-light-gray hover:bg-light-brown'
      }`}
    >
      {name}
    </button>
  );
};

export default RoundedButton;
