import { FC } from 'react';

interface GradientButtonProps {
  name: string;
  onClick: () => void;
}

const GradientButton: FC<GradientButtonProps> = ({ name, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-400 hover:to-orange-400 text-white p-2 rounded-lg"
  >
    {name}
  </button>
);
