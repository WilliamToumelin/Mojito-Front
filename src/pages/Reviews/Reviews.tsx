/* eslint-disable no-console */
import React, { useCallback, useEffect, useState } from 'react';
import CommentModal from '../../components/Modals/CommentModal';
import { Cocktails } from '../../types/types';
import SquaredButton from '../../components/common/buttons/SquaredButton';

interface Props {
  selectedCocktail: number | null;
}

function formatDate(data: string) {
  const date = new Date(data);
  const formattedDate = `${date.getDate()} ${date.toLocaleDateString('fr-FR', {
    month: 'long',
    year: 'numeric',
  })}`;
  return formattedDate;
}

const Reviews: React.FC<Props> = ({ selectedCocktail }) => {
  const [cocktailData, setCocktailData] = useState<Cocktails | null>(null);
  const [displayModal, setDisplayModal] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5174/api/cocktails/${selectedCocktail}/comments`)
      .then((response) => response.json())
      .then((data: Cocktails) => {
        setCocktailData(data);
      })
      .catch((err) => console.error(err));
  }, [selectedCocktail]);

  console.log(selectedCocktail);
  console.log(cocktailData);

  const handleToggleModal = useCallback((): void => {
    setDisplayModal((prevstate) => !prevstate);
  }, []);

  if (!cocktailData) {
    // TEMPORAIRE !!!!!! a rajouter un loader , parce pour l'instant il n'y a que une fenetre noir si pas de cocktail chargé encore ...
    return (
      <div className="bg-[#a4978e] flex justify-center items-center flex-1 h-[75vh]">
        <div className="relative  w-4/5 lg:w-3/5 h-4/5 max-h-4/5 flex flex-col over shadow-[#525B56] shadow-xl rounded-2xl bg-[#132226]" />
      </div>
    );
  }

  return (
    <div className="bg-[#a4978e] flex justify-center items-center flex-1 h-[75vh]">
      {cocktailData.comments.length > 0 && (
        <div className="relative  w-4/5 lg:w-3/5 h-4/5 max-h-4/5 flex flex-col over shadow-[#525B56] shadow-xl rounded-2xl bg-[#132226]">
          <div className="relative w-full p-3 flex flex-col items-center pb-7">
            <h1 className="text-[#a4978e] text-xl pt-5 text-center w-full">
              Commentaires a propos de{' '}
              <span className="text-[#BE9063] text-3xl font-semibold">
                {cocktailData.name}
              </span>
            </h1>
            <div className="absolute top-5 right-5">
              <SquaredButton
                name="laisse un commentaire"
                onClick={handleToggleModal}
                height={48}
                width={200}
                type="button"
              />
            </div>
            <CommentModal
              displayModal={displayModal}
              handleToggleModal={handleToggleModal}
            />
          </div>
          <div className="border-2 border-[#a4978e]" />
          <div className="w-full h-full overflow-y-auto p-6 pt-0 flex flex-col items-center">
            {cocktailData.comments.map((data) => (
              <article
                key={data.id}
                className="w-[80%] mx-auto mt-14 p-4 rounded-lg flex items-center text-center"
              >
                <div>
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
                    <p className="text-2xl italic font-medium text-[#a4978e]">
                      {data.content}
                    </p>
                  </blockquote>
                  <div className=" mt-6 space-x-3">
                    <div
                      className="divide-x-2 divide-gray-500 dark:divide-gray-700
                    "
                    >
                      <span className="pr-3 font-medium text-[#BE9063]">
                        {data.user.pseudonym}
                      </span>
                      <span className="pl-3 text-sm text-[#BE9063]">
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
