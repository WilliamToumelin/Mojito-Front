/* eslint-disable no-nested-ternary */
import React from 'react';
import { BiSolidStar } from 'react-icons/bi';
import image from '../../images/image.jpeg';

type Cocktails = {
  categoryId: number;
  id: number;
  slug: string;
  content: string;
  title: string;
};

type ArticleProps = {
  cocktail: Cocktails;
  animate: boolean;
  modulo: boolean;
};

const Article: React.FC<ArticleProps> = ({ cocktail, animate, modulo }) => {
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
            src={image}
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
          {cocktail.slug}
        </h3>
        <p
          className={`text-white p-4 flex ${modulo ? 'justify-end' : ''} ${
            animate
              ? modulo
                ? 'opacity-0 translate-y-12'
                : 'opacity-0 translate-x-12'
              : ''
          } transition-all ease-in duration-1200`}
        >
          Difficulté : Facile
        </p>
        <p
          className={`text-white p-4 flex ${modulo ? 'justify-end' : ''} ${
            animate
              ? modulo
                ? 'opacity-0 -translate-x-12'
                : 'opacity-0 translate-y-12'
              : ''
          } transition-all ease-in duration-1200`}
        >
          Note : &nbsp;
          <BiSolidStar />
          <BiSolidStar />
          <BiSolidStar />
          <BiSolidStar />
        </p>
      </div>
    </article>
  );
};

export default Article;
