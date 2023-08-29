/* eslint-disable no-nested-ternary */
import React from 'react';
import { FaCocktail } from 'react-icons/fa';
import { Cocktails } from '../../../types/types';
import './CocktailItem.scss';

type CocktailItemProps = {
  cocktail: Cocktails;
  animate: boolean;
  modulo: boolean;
};

const CocktailItem: React.FC<CocktailItemProps> = ({
  cocktail,
  animate,
  modulo,
}) => {
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
          <span className=" text-yellow-400 mr-1 pl-1">
            <FaCocktail />
          </span>
        </p>
      </div>
    </article>
  );
};

export default CocktailItem;
