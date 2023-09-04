/* eslint-disable no-nested-ternary */
import React from 'react';
import { FaCocktail } from 'react-icons/fa';
import { Cocktails } from '../../../types/types';
import './CocktailItem.scss';
import Hr from '../Hr/Hr';
import RandomIcons from './RandomIcons';

type CocktailItemProps = {
  cocktail: Cocktails;
  modulo: boolean;
  isLastItem: boolean;
};

const CocktailItem: React.FC<CocktailItemProps> = ({
  cocktail,
  modulo,
  isLastItem,
}) => {
  return (
    <>
      <article
        className={`lg:h-[20em] flex items-center animate-fade-in-down ${
          modulo ? 'flex-row-reverse text-right' : ''
        }`}
      >
        <div className="w-28 h-28 md:w-52 md:h-52 lg:w-64 lg:h-64 rounded-full overflow-hidden border-light-brown border-4 md:border-8 animate-fade-in-down">
          <div className="relative w-full h-full">
            <img
              src={cocktail.picture}
              alt="cocktail"
              className="absolute w-full h-full object-cover transform-center transition duration-500 ease-in-out hover:scale-110"
            />
          </div>
        </div>
        <div className="px-4 md:px-0 w-2/3">
          <div className="px-1 lg:px-10 w-full sm:hover:scale-105 duration-500">
            <h1 className="md:py-2 md:p-4 leading-7 text-dark-brown text-2xl xl:text-4xl lg:text-3xl">
              {cocktail.name}
            </h1>
            <div
              className={` text-light-brown text-base md:text-xl md:px-4 ${
                modulo ? 'justify-end' : ''
              }`}
            >
              <div className="flex w-full justify-between items-center">
                {modulo ? (
                  <>
                    <span className="relative opacity-0 md:opacity-100">
                      <RandomIcons />{' '}
                    </span>
                    <span>Difficulté : {cocktail.difficulty}/5 </span>
                  </>
                ) : (
                  <>
                    <span>Difficulté : {cocktail.difficulty}/5 </span>
                    <span className="relative opacity-0 md:opacity-100">
                      <RandomIcons />{' '}
                    </span>
                  </>
                )}
              </div>
            </div>
            <p
              className={`text-light-brown text-base md:text-xl md:p-4 flex ${
                modulo ? 'justify-end' : ''
              }`}
            >
              Note : {cocktail.rating}
              <span className="text-dark-brown mr-1 pl-1">
                <FaCocktail />
              </span>
            </p>
          </div>
        </div>
      </article>
      {!isLastItem && <Hr />}
    </>
  );
};

export default CocktailItem;
