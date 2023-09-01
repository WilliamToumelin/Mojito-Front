import React, { useState, useEffect } from 'react';
import {
  GiIceCube,
  GiMeltingIceCube,
  GiIceCubes,
  GiDrinkMe,
} from 'react-icons/gi';
import { FaLemon } from 'react-icons/fa';
import { ImGlass } from 'react-icons/im';

const icons = [
  GiIceCube,
  GiMeltingIceCube,
  GiIceCubes,
  GiDrinkMe,
  FaLemon,
  ImGlass,
];

function RandomIcon() {
  const [randomIcon, setRandomIcon] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * icons.length);
    setRandomIcon(icons[randomIndex]);
  }, []);

  return (
    <div>
      <h2>Icone aléatoire :</h2>
      {randomIcon && React.createElement(randomIcon)}
    </div>
  );
}

export default RandomIcon;
