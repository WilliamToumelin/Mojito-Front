/* eslint-disable react/require-default-props */
import React from 'react';

interface RoundedButtonProps {
  name: string | boolean;
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
    width: `${width}rem`,
    height: `${height}rem`,
  };
  return (
    <button
      type="button"
      onClick={onClick}
      style={buttonStyle}
      className={`menu-link flex justify-center items-center hover:bg-light-brown rounded-full z-50
      text-base text-dark-brown hover:text-light-gray bg-light-gray border-light-brown border-2`}
    >
      {name}
    </button>
  );
};

export default RoundedButton;
