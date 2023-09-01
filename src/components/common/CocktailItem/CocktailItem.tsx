/* eslint-disable no-nested-ternary */
import React from 'react';
import { FaCocktail } from 'react-icons/fa';
import { Cocktails } from '../../../types/types';
import './CocktailItem.scss';
import Hr from '../Hr/Hr';
import RandomIcons from './RandomIcons';

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
        className={`lg:h-[20em] flex  items-center ${
          modulo ? 'flex-row-reverse text-right' : ''
        } ${
          animate
            ? modulo
              ? 'opacity-0 -translate-x-28'
              : 'opacity-0 translate-x-28'
            : ''
        } transition-all ease-in duration-1200`}
      >
        <div className="w-28 h-28 md:w-52 md:h-52 lg:w-64 lg:h-64 rounded-full overflow-hidden border-light-brown border-4 md:border-8">
          <div className="relative w-full h-full">
            <img
              src={cocktail.picture}
              alt="cocktail"
              className="absolute w-full h-full object-cover transform-center"
            />
          </div>
        </div>
        <div className="w-2/3">
          <div className="px-1 lg:px-10 w-full">
            <h1
              className={` md:py-2  md:p-4 leading-7 text-dark-brown text-2xl xl:text-4xl lg:text-3xl ${
                animate ? 'opacity-0 -translate-y-12' : ''
              } transition-all ease-in duration-1200`}
            >
              {cocktail.name}
            </h1>
            <div
              className={`text-light-brown text-base md:text-xl md:px-4 flex ${
                modulo ? 'justify-end' : ''
              } ${
                animate
                  ? modulo
                    ? 'opacity-0 -translate-x-12'
                    : 'opacity-0 translate-x-12'
                  : ''
              } transition-all ease-in duration-1200`}
            >
              <div className="flex w-full justify-between items-center">
                {modulo ? (
                  <>
                    <span className="relative">
                      <RandomIcons />{' '}
                    </span>
                    <span>Difficulté : {cocktail.difficulty}/5 </span>
                  </>
                ) : (
                  <>
                    <span>Difficulté : {cocktail.difficulty}/5 </span>
                    <span className="relative">
                      <RandomIcons />{' '}
                    </span>
                  </>
                )}
              </div>
            </div>
            <p
              className={`text-light-brown text-base md:text-xl md:p-4 flex ${
                modulo ? 'justify-end' : ''
              } ${
                animate ? 'opacity-0 translate-y-12' : ''
              } transition-all ease-in duration-1200`}
            >
              Note : {cocktail.rating}
              <span className=" text-dark-brown mr-1 pl-1">
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
