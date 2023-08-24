import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaCocktail } from 'react-icons/fa';
import { FiChevronRight } from 'react-icons/fi';
import { BsClockFill } from 'react-icons/bs';
import Rating from './Rating';
import Page404 from '../Error/Page404';
import { Cocktails } from '../../types/types';

type Props = {
  cocktailList: Cocktails[];
};

const CocktailById: React.FC<Props> = ({ cocktailList }) => {
  const { slug } = useParams<{ slug: string }>();

  const cocktailItem = cocktailList.find((cocktail) => cocktail.slug === slug);

  if (!cocktailItem) {
    return <Page404 />;
  }

  return (
    <div className="bg-black flex justify-center items-center flex-1 h-[75vh]">
      <div className="w-4/5 lg:w-3/5 h-4/5 flex rounded-2xl shadow-purple-700 shadow-2xl bg-black">
        <div className="flex-1 flex">
          <div className="w-2/5">
            <div className="h-full">
              <img
                src={cocktailItem.picture}
                alt="cocktail"
                className="h-full w-full object-cover object-center rounded-2xl"
              />
            </div>
          </div>
          <div className="w-3/5 flex-1 overflow-y-auto p-12 text-white space-y-12">
            <h2 className=" text-3xl font-semibold">{cocktailItem.name}</h2>
            <div className="flex items-center text-2xl">
              <div className=" text-yellow-400 mr-1">
                <FaCocktail />
              </div>
              <p className="ml-2 text-lg mr-1 font-bold">
                {cocktailItem.rating}
              </p>
              <span className="w-2 h-2 mx-1.5 bg-white rounded-full" />
              <Link to={`/cocktail/${cocktailItem.slug}/commentaires`}>
                <div className="ml-1 text-lg">
                  {cocktailItem.comments.content}
                </div>
              </Link>
            </div>
            <div className="pt-6 text-3xl flex items-center">
              <BsClockFill className="" />
              <div className="pl-3">{cocktailItem.preparation_time}</div>
            </div>
            <div>
              <h3 className="text-2xl pb-3">Méthode</h3>
              <ul className="text-xl space-y-1">
                {cocktailItem.cocktailUses.map((use, index) => (
                  <li key={index} className="flex items-center">
                    <FiChevronRight /> {use.ingredient.name} {use.quantity}{' '}
                    {use.unit.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-base">
              <ul className="">
                {cocktailItem.steps.map((step, index) => (
                  <li key={index} className="flex items-center">
                    <FiChevronRight /> {step.content}
                  </li>
                ))}
              </ul>
            </div>
            <h3 className="text-base">Nos astuces :</h3>
            <p>{cocktailItem.description}</p>
            <div className="text-base items-center">
              <p className="pb-6 text-center">Donnez votre avis !</p>
              <div className="text-base flex items-center gap-8 justify-center">
                <Rating />
                <Link
                  to={`/cocktail/${cocktailItem.slug}/commentaires`}
                  className="text-white font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-400 hover:to-orange-400 rounded-lg text-sm p-2"
                >
                  Commenter ce cocktail
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CocktailById;
