/* eslint-disable no-nested-ternary */
import React from 'react';
import { FaCocktail } from 'react-icons/fa';
import { Cocktails } from '../../../types/types';

type ItemCocktailProps = {
  cocktail: Cocktails;
  animate: boolean;
  modulo: boolean;
};

const ItemCocktail: React.FC<ItemCocktailProps> = ({
  cocktail,
  animate,
  modulo,
}) => {
  // const difficultyBar = (difficulty: number) => {
  //   if (difficulty <= 1) {
  //     return 'w-1/5 bg-green-600';
  //   }
  //   if (difficulty >= 2 && difficulty < 3) {
  //     return 'w-2/5 bg-yellow-300';
  //   }
  //   if (difficulty >= 3 && difficulty <= 4) {
  //     return 'w-3/5 bg-orange-500';
  //   }
  //   return 'w-full bg-red-700';
  // };

  return (
    <article
      className={`mb-12 flex items-center ${modulo ? 'flex-row-reverse' : ''} ${
        animate
          ? modulo
            ? 'opacity-0 -translate-x-28'
            : 'opacity-0 translate-x-28'
          : ''
      } transition-all ease-in duration-1200`}
    >
      <div className="w-52 h-52 rounded-full overflow-hidden shadow-amber-700 shadow-sm">
        <div className="relative w-full h-full shadow-amber-700 shadow-2xl">
          <img
            src={cocktail.picture}
            alt="cocktail"
            className="absolute w-full h-full object-cover transform-center"
          />
        </div>
      </div>
      <div className="pl-10 pr-10 ">
        <h3
          className={`ml-3 py-2 pr-4 pl-1 leading-7 text-xl${
            animate ? 'opacity-0 -translate-y-12' : ''
          } transition-all ease-in duration-1200`}
        >
          {cocktail.name}
        </h3>
        <p
          className={`text-white p-4 flex ${modulo ? 'justify-end' : ''} ${
            animate
              ? modulo
                ? 'opacity-0 -translate-x-12'
                : 'opacity-0 translate-x-12'
              : ''
          } transition-all ease-in duration-1200`}
        >
          Difficulté : {cocktail.difficulty}/5
        </p>
        {/*          -----    SKILBAR A GARDER OU NON  ---------*/}
        {/* <div className="SkillBar flex">
          <div className={`Skill-fill ${difficultyBar(cocktail.difficulty)}`} />
        </div> */}
        <p
          className={`text-white p-4 flex ${modulo ? 'justify-end' : ''} ${
            animate ? 'opacity-0 translate-y-12' : ''
          } transition-all ease-in duration-1200`}
        >
          Note : {cocktail.rating}
          <div className=" text-yellow-400 mr-1 pl-1">
            <FaCocktail />
          </div>
        </p>
      </div>
    </article>
  );
};

export default ItemCocktail;
