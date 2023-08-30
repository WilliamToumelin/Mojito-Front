/* eslint-disable react/require-default-props */
import React from 'react';

interface SquaredButtonProps {
  name: string;
  onClick?: () => void;
}

const SquaredButton: React.FC<SquaredButtonProps> = ({
  name,
  onClick = () => {},
}) => (
  <button
    type="button"
    onClick={onClick}
    className="menu-link flex justify-center items-center p-4 hover:bg-[#A4978E] rounded-full text-[#BE9063] hover:text-[#525B56] text-base bg-[#525B56] border-[#A4978E] border-2"
  >
    {name}
  </button>
);

export default SquaredButton;
