/* eslint-disable no-nested-ternary */
import React from 'react';
import { FaCocktail } from 'react-icons/fa';
import { Cocktails } from '../../../types/types';
import './CocktailItem.scss';
import Hr from '../Hr/Hr';

type CocktailItemProps = {
  cocktail: Cocktails;
  animate: boolean;
  modulo: boolean;
  isLastItem: boolean;
};

const CocktailItem: React.FC<CocktailItemProps> = ({
  cocktail,
  animate,
  modulo,
  isLastItem,
}) => {
  return (
    <>
      <article
        className={`h-[20em] flex items-center ${
          modulo ? 'flex-row-reverse' : ''
        } ${
          animate
            ? modulo
              ? 'opacity-0 -translate-x-28'
              : 'opacity-0 translate-x-28'
            : ''
        } transition-all ease-in duration-1200`}
      >
        <div className="w-64 h-64 rounded-full overflow-hidden border-[#A4978E] border-8">
          <div className="relative w-full h-full">
            <img
              src={cocktail.picture}
              alt="cocktail"
              className="absolute w-full h-full object-cover transform-center"
            />
          </div>
        </div>
        <div className="pl-10 pr-10 ">
          <h1
            className={`ml-3 py-2 pr-4 pl-1 leading-7 text-[#BE9063] hover:text-white text-4xl${
              animate ? 'opacity-0 -translate-y-12' : ''
            } transition-all ease-in duration-1200`}
          >
            {cocktail.name}
          </h1>
          <p
            className={`text-[#A4978E] text-xl p-4 flex ${
              modulo ? 'justify-end' : ''
            } ${
              animate
                ? modulo
                  ? 'opacity-0 -translate-x-12'
                  : 'opacity-0 translate-x-12'
                : ''
            } transition-all ease-in duration-1200`}
          >
            Difficulté : {cocktail.difficulty}/5
          </p>
          <p
            className={`text-[#A4978E] text-xl p-4 flex ${
              modulo ? 'justify-end' : ''
            } ${
              animate ? 'opacity-0 translate-y-12' : ''
            } transition-all ease-in duration-1200`}
          >
            Note : {cocktail.rating}
            <span className=" text-[#BE9063] mr-1 pl-1">
              <FaCocktail />
            </span>
          </p>
        </div>
      </article>
      {!isLastItem && <Hr />}
    </>
  );
};

export default CocktailItem;
