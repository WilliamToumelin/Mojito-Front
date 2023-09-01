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
    width: `${width}px`,
    height: `${height}px`,
  };
  return (
    <button
      type="button"
      onClick={onClick}
      style={buttonStyle}
      className={`menu-link flex justify-center items-center hover:bg-[#A4978E] rounded-full z-50
      text-base text-[#BE9063] hover:text-[#525B56] bg-[#525B56] border-[#A4978E] border-2`}
    >
      {name}
    </button>
  );
};

export default RoundedButton;
