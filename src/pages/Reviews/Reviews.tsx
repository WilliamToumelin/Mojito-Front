/* eslint-disable no-console */
import React, { useCallback, useEffect, useState } from 'react';
import CommentModal from '../../components/Modals/CommentModal';
import { Cocktails } from '../../types/types';
import { useAuth } from '../../contexts/AuthProvider';
import SquaredButton from '../../components/common/buttons/SquaredButton';
import Cookies from 'js-cookie';

function formatDate(data: string) {
  const date = new Date(data);
  const formattedDate = `${date.getDate()} ${date.toLocaleDateString('fr-FR', {
    month: 'long',
    year: 'numeric',
  })}`;
  return formattedDate;
}

const Reviews: React.FC = () => {
  const [cocktailData, setCocktailData] = useState<Cocktails | null>(null);
  const [displayModal, setDisplayModal] = useState(false);
  const selectedCocktailId = Number(localStorage.getItem('selectedCocktail'));
  const authToken = Cookies.get('authToken');
  const { isLoggedIn, login, logout } = useAuth();

  useEffect(() => {
    if (authToken) {
      // Si le jeton JWT est présent dans les cookies, l'utilisateur est connecté
      login(); // Utilisez la fonction de connexion fournie par useAuth
    } else {
      // Sinon, l'utilisateur n'est pas connecté
      logout(); // Utilisez la fonction de déconnexion fournie par useAuth
    }
  }, [authToken, login, logout]);

  useEffect(() => {
    fetch(
      `http://williammbakop-server.eddi.cloud/api/cocktails/${selectedCocktailId}/comments`
    )
      .then((response) => response.json())
      .then((data: Cocktails) => {
        setCocktailData(data);
      })
      .catch((err) => console.error(err));
  }, [selectedCocktailId]);

  const handleToggleModal = useCallback((): void => {
    setDisplayModal((prevstate) => !prevstate);
  }, []);

  if (!cocktailData) {
    // TEMPORAIRE !!!!!! a rajouter un loader , parce pour l'instant il n'y a que une fenetre noir si pas de cocktail chargé encore ...
    return (
      <div className="bg-light-brown flex justify-center items-center flex-1 h-[75vh]">
        <div
          style={{
            boxShadow: '#132226 0px 1px 22px',
          }}
          className="relative  w-4/5 xl:w-4/6 h-4/5 flex flex-col overflow-y-auto shadow-light-gray shadow-xl rounded-2xl pb-3 bg-dark-gray"
        />
      </div>
    );
  }

  return (
    <div className="bg-light-brown flex justify-center items-center flex-1 h-[75vh]">
      {cocktailData.comments.length > 0 && (
        <div
          style={{
            boxShadow: '#132226 0px 1px 22px',
          }}
          className="relative  w-4/5 xl:w-4/6 h-4/5 flex flex-col overflow-y-auto shadow-light-gray shadow-xl rounded-2xl pb-3 bg-dark-gray"
        >
          <div className="relative w-full p-3 mdflex flex-col flex-start animate-fade-in-down">
            <div className="w-full flex flex-wrap justify-around items-center">
              <h1 className="text-dark-brown text-xl md:text-3xl">
                {cocktailData.name}
              </h1>
              <div className={`${!isLoggedIn ? 'hidden' : ''}`}>
                <div className="">
                  <SquaredButton
                    name="Commente ! :)"
                    onClick={handleToggleModal}
                    height={3}
                    width={7}
                    type="button"
                  />
                </div>
                <CommentModal
                  displayModal={displayModal}
                  handleToggleModal={handleToggleModal}
                />
              </div>
            </div>
          </div>
          <div className="border-2 border-light-brown animate-fade-in-down" />
          <div className="w-full h-full overflow-y-auto p-6 pt-0 flex flex-col items-center animate-fade-in-down">
            {cocktailData.comments.map((data) => (
              <article
                key={data.id}
                className="w-[80%] sm:mx-auto mt-4 md:mt-14 sm:p-4 rounded-lg flex items-center justify-center text-center"
              >
                <div className="text-center">
                  <svg
                    className="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 14"
                  >
                    <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                  </svg>
                  <blockquote>
                    <p className="text-lg md:text-2xl italic font-medium text-light-brown">
                      {data.content}
                    </p>
                  </blockquote>
                  <div className=" mt-6 space-x-3">
                    <div
                      className="divide-x-2 divide-gray-500 dark:divide-gray-700
                    "
                    >
                      <span className="pr-3 font-medium text-dark-brown">
                        {data.user.pseudonym}
                      </span>
                      <span className="pl-3 text-sm text-dark-brown">
                        {formatDate(data.posted_at)}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
