/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCocktail, FaCommentDots, FaGlassMartiniAlt } from 'react-icons/fa';
import { GiIceCube } from 'react-icons/gi';
import { IoIosCog } from 'react-icons/io';
import { BsClockFill } from 'react-icons/bs';
import { ImDiamonds } from 'react-icons/im';
import Rating from './Rating';
import { Cocktails } from '../../types/types';
import { useAuth } from '../../contexts/AuthProvider';
import Hr from '../../components/common/Hr/Hr';
import SquaredButton from '../../components/common/buttons/SquaredButton';

const Cocktail: React.FC = () => {
  const [cocktailDetails, setCocktailDetails] = useState<Cocktails | null>(
    null
  );

  const selectedCocktailId = Number(localStorage.getItem('selectedCocktail'));

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    fetch(`${apiHostName}/api/cocktails/${selectedCocktailId}`)
      .then((response) => response.json())
      .then((data) => {
        setCocktailDetails(data);
      })
      .catch((err) => console.error(err));
  }, [selectedCocktailId]);

  if (!cocktailDetails) {
    // TEMPORAIRE !!!!!! a rajouter un loader , parce pour l'instant il n'y a que une fenetre noir si pas de cocktail chargé encore ...
    return (
      <div className="relative bg-light-brown flex justify-center items-center flex-1 h-[75vh]">
        <div className="w-full h-[95%] sm:w-5/6 xl:w-4/6 sm:h-4/5 flex overflow-y-auto shadow-light-gray shadow-xl rounded-2xl bg-dark-gray" />
      </div>
    );
  }

  return (
    <div className="relative bg-light-brown flex justify-center items-center flex-1 h-[75vh]">
      <div
        style={{
          boxShadow: '#132226 0px 1px 22px',
        }}
        className="w-full h-[95%] sm:w-5/6 xl:w-4/6 sm:h-4/5 flex overflow-y-auto shadow-light-gray shadow-xl rounded-2xl bg-dark-gray"
      >
        {cocktailDetails ? (
          <div className="sm:flex-1 flex flex-col sm:flex-row text-dark-brown animate-fade-in-down">
            <div className="sm:w-2/5 w-full">
              <div className="h-full">
                <img
                  src={cocktailDetails.picture}
                  alt="cocktail"
                  className="h-full w-full object-cover object-center rounded-l-2xl"
                />
              </div>
            </div>
            <div className="sm:w-3/5 w-full flex-1 sm:overflow-y-auto p-12  space-y-7">
              <h2 className=" text-5xl font-semibold text-center">
                {cocktailDetails.name}
              </h2>
              <div className="flex justify-between">
                <div className="flex align-center items-center text-2xl">
                  <div>
                    <div className="flex">
                      <div className="mr-1">
                        <FaCocktail className="text-3xl md:text-4xl" />
                      </div>
                      <p className="ml-2 text-lg md:text-2xl mr-1 text-light-brown">
                        {cocktailDetails.rating} / 5
                      </p>
                    </div>

                    <div className="flex flex-nowrap pt-4">
                      <Link
                        to={`/cocktail/${cocktailDetails.slug}/commentaires`}
                      >
                        <div className="text-lg text-light-brown hover:text-dark-brown flex items-center md:text-2xl">
                          <FaCommentDots className="text-dark-brown mr-3 text-3xl md:text-4xl" />
                          {cocktailDetails.comments.length} avis
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="p-2 text-2xl flex items-center">
                  <BsClockFill className="ml-2 text-3xl md:text-4xl" />
                  <div className="pl-3 text-light-brown text-lg md:text-2xl">
                    {cocktailDetails.preparation_time}{' '}
                    {cocktailDetails.preparation_time < 2
                      ? 'minute'
                      : 'minutes'}
                  </div>
                </div>
              </div>
              <Hr />
              <div>
                <h3 className="text-3xl pb-3 ">Ingredients</h3>
                <ul className="text-xl space-y-1 ">
                  {cocktailDetails.cocktailUses.map((use, index) => (
                    <li
                      key={index}
                      className="flex items-center text-light-brown"
                    >
                      <ImDiamonds className="rotate-90 text-dark-brown pr-2" />{' '}
                      {use.ingredient.name} {use.quantity} {use.unit.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap justify-between items-center">
                <div className=" text-2xl flex items-center p-2">
                  <FaGlassMartiniAlt className="text-3xl md:text-4xl" />
                  <div className="pl-3 text-light-brown">
                    {cocktailDetails.glass.name}
                  </div>
                </div>
                <div className=" text-2xl flex items-center p-2">
                  <GiIceCube className="text-3xl md:text-4xl" />
                  <div className="pl-3 text-light-brown">
                    {cocktailDetails.ice.name}
                  </div>
                </div>
                <div className=" text-2xl flex items-center p-2">
                  <IoIosCog className="text-3xl md:text-4xl" />
                  <div className="pl-3 text-light-brown">
                    {cocktailDetails.technical.name}
                  </div>
                </div>
              </div>
              <Hr />
              <div className="text-base">
                <h3 className="text-3xl pb-3">Etapes :</h3>
                <ul className="text-xl space-y-1">
                  {cocktailDetails.steps.map((step, index) => (
                    <li
                      key={index}
                      className="flex items-center text-light-brown"
                    >
                      - {step.content}
                      <br />
                    </li>
                  ))}
                </ul>
              </div>
              <Hr />
              <h3 className="text-3xl">Description du cocktail :</h3>
              <p className="text-xl space-y-1 text-light-brown">
                {cocktailDetails.description}
              </p>
              <Hr />
              {cocktailDetails.trick ? (
                <>
                  <h3 className="text-3xl ">Nos astuces :</h3>
                  <p className="text-xl text-light-brown space-y-1">
                    {cocktailDetails.trick}
                  </p>
                </>
              ) : (
                ''
              )}

              <div className="text-base items-center">
                <p className="pb-6 text-center">Donnez votre avis !</p>
                <div className="text-base flex items-center flex-col lg:flex-row gap-8 justify-center">
                  {!isLoggedIn ? '' : <Rating />}

                  <Link
                    to={`/cocktail/${cocktailDetails.slug}/commentaires`}
                    className="menu-link flex justify-center items-center "
                  >
                    <SquaredButton
                      name="voir les commentaires"
                      height={3}
                      width={12}
                      type="button"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full lg:w-3/5 lg:h-4/5 flex shadow-light-gray shadow-xl rounded-2xl bg-dark-gray" />
        )}
      </div>
    </div>
  );
};

export default Cocktail;
