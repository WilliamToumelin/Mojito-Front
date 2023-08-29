/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCocktail, FaGlassMartiniAlt } from 'react-icons/fa';
import { GiIceCube } from 'react-icons/gi';
import { FiChevronRight } from 'react-icons/fi';
import { BsClockFill } from 'react-icons/bs';
import Rating from './Rating';
import { Cocktails } from '../../types/types';
import { useAuth } from '../../contexts/AuthProvider';

interface CocktailProps {
  selectedCocktail: number | null;
}

const Cocktail: React.FC<CocktailProps> = ({ selectedCocktail }) => {
  const [cocktailDetails, setCocktailDetails] = useState<Cocktails | null>(
    null
  );
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    fetch(`http://localhost:5174/api/cocktails/${selectedCocktail}`)
      // fetch('http://localhost:5174/api/cocktails')
      .then((response) => response.json())
      .then((data) => {
        setCocktailDetails(data);
      })
      .catch((err) => console.error(err));
  }, [selectedCocktail]);

  if (!cocktailDetails) {
    // TEMPORAIRE !!!!!! a rajouter un loader , parce pour l'instant il n'y a que une fenetre noir si pas de cocktail chargé encore ...
    return (
      <div className="relative bg-[#a4978e] flex justify-center items-center flex-1 h-[75vh]">
        <div className="w-full h-full lg:w-3/5 lg:h-4/5 flex shadow-[#525B56] shadow-xl rounded-2xl bg-[#132226]" />
      </div>
    );
  }

  return (
    <div className="relative bg-[#a4978e] flex justify-center items-center flex-1 h-[75vh]">
      <div
        style={{
          boxShadow: '#132226 0px 1px 22px',
        }}
        className="w-full h-full lg:w-3/5 lg:h-4/5 flex shadow-[#525B56] shadow-xl rounded-2xl bg-[#132226]"
      >
        {cocktailDetails ? (
          <div className="flex-1 flex text-[#BE9063]">
            <div className="w-2/5">
              <div className="h-full">
                <img
                  src={cocktailDetails.picture}
                  alt="cocktail"
                  className="h-full w-full object-cover object-center rounded-l-2xl"
                />
              </div>
            </div>
            <div className="w-3/5 flex-1 overflow-y-auto p-12  space-y-7">
              <h2 className=" text-3xl font-semibold">
                {cocktailDetails.name}
              </h2>
              <div className="flex items-center text-2xl">
                <div className="mr-1">
                  <FaCocktail />
                </div>
                <p className="ml-2 text-lg mr-1 font-bold text-[#A4978E]">
                  {cocktailDetails.rating}
                </p>
                <span className="w-2 h-2 mx-1.5 bg-white rounded-full" />
                <Link to={`/cocktail/${cocktailDetails.slug}/commentaires`}>
                  <div className="ml-1 text-lg text-[#A4978E]">
                    {cocktailDetails.comments.length}{' '}
                    {cocktailDetails.comments.length < 2
                      ? 'commentaire'
                      : 'commentaires'}
                  </div>
                </Link>
              </div>
              <div className=" text-3xl flex items-center">
                <BsClockFill className="" />
                <div className="pl-3 text-[#A4978E]">
                  {cocktailDetails.preparation_time}{' '}
                  {cocktailDetails.preparation_time < 2 ? 'minute' : 'minutes'}
                </div>
              </div>
              <div className=" text-3xl flex items-center">
                <FaGlassMartiniAlt className="" />
                <div className="pl-3 text-[#A4978E]">
                  {cocktailDetails.glass.name}
                </div>
              </div>
              <div className=" text-3xl flex items-center">
                <GiIceCube className="" />
                <div className="pl-3 text-[#A4978E]">
                  {cocktailDetails.ice.name}
                </div>
              </div>
              <div className=" text-3xl flex items-center">
                <p>Technique: </p>
                <div className="pl-3 text-[#A4978E]">
                  {cocktailDetails.technical.name}
                </div>
              </div>
              <div>
                <h3 className="text-3xl pb-3 ">Ingredients</h3>
                <ul className="text-xl space-y-1">
                  {cocktailDetails.cocktailUses.map((use, index) => (
                    <li
                      key={index}
                      className="flex items-center text-[#A4978E]"
                    >
                      <FiChevronRight /> {use.ingredient.name} {use.quantity}{' '}
                      {use.unit.name}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-base">
                <h3 className="text-3xl pb-3">Etapes :</h3>
                <ul className="text-xl space-y-1">
                  {cocktailDetails.steps.map((step, index) => (
                    <li
                      key={index}
                      className="flex items-center text-[#A4978E]"
                    >
                      - {step.content}
                    </li>
                  ))}
                </ul>
              </div>
              <h3 className="text-3xl">Description du cocktail :</h3>
              <p className="text-xl space-y-1 text-[#A4978E]">
                {cocktailDetails.description}
              </p>
              {cocktailDetails.trick ? (
                <>
                  <h3 className="text-3xl">Nos astuces :</h3>
                  <p className="text-xl space-y-1">{cocktailDetails.trick}</p>
                </>
              ) : (
                ''
              )}
              <div className="text-base items-center">
                <p className="pb-6 text-center">Donnez votre avis !</p>
                <div className="text-base flex items-center gap-8 justify-center">
                  {!isLoggedIn ? '' : <Rating />}
                  <Link
                    to={`/cocktail/${cocktailDetails.slug}/commentaires`}
                    className="menu-link flex justify-center items-center w-44 h-14 text-center rounded-full text-white font-bold text-base bg-gradient-to-r from-[#132226] via-[#525B56] to-[#A4978E] hover:bg-gradient-to-r hover:from-[#1e353b] hover:via-[rgb(106, 116, 110);] hover:to-[#b3a8a0]"
                  >
                    Voir les commentaires
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full lg:w-3/5 lg:h-4/5 flex shadow-[#525B56] shadow-xl rounded-2xl bg-[#132226]" />
        )}
      </div>
    </div>
  );
};

export default Cocktail;
