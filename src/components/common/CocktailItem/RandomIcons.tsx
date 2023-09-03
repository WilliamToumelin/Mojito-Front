import {
  GiIceCube,
  GiMeltingIceCube,
  GiIceCubes,
  GiDrinkMe,
} from 'react-icons/gi';
import { FaLemon, FaWineGlass, FaCocktail } from 'react-icons/fa';
import { ImGlass } from 'react-icons/im';
import { PiBeerBottleFill, PiBeerSteinFill } from 'react-icons/pi';

const icons = [
  <GiIceCube key="1" />,
  <GiMeltingIceCube key="2" />,
  <GiIceCubes key="3" />,
  <GiDrinkMe key="4" />,
  <FaLemon key="5" />,
  <FaWineGlass key="6" />,
  <ImGlass key="7" />,
  <FaCocktail key="8" />,
  <PiBeerBottleFill key="9" />,
  <PiBeerSteinFill key="10" />,
];

const RandomIcons = () => {
  const randomIndex = Math.floor(Math.random() * icons.length);
  const newRandomIcon = icons[randomIndex];

  return (
    <div className="z-10 text-dark-brown text-4xl md:text-8xl opacity-50 animate-wiggle">
      {newRandomIcon}
    </div>
  );
};

export default RandomIcons;
