import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import Page404 from '../../components/Error/Page404';
import CommentModal from '../../components/Modals/CommentModal';
import { Cocktails } from '../../types/types';
import CocktailItem from '../../components/common/CocktailItem/CocktailItem';

interface Props {
  selectedCocktail: number | null;
}

function formatDate(data: any) {
  const date = new Date(data);
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  return date.toLocaleDateString('fr-FR', options);
}

const Reviews: React.FC<Props> = ({ selectedCocktail }) => {
  const [cocktailList, setCocktailList] = useState<Cocktails[]>([]);

  useEffect(() => {
    // fetch(`http://localhost:5174/api/cocktails/${cocktailId}`)
    fetch('http://localhost:5174/api/cocktails')
      .then((response) => response.json())
      .then((data: Cocktails[]) => {
        setCocktailList(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const cocktailListMemo = useMemo(() => cocktailList, [cocktailList]);
  console.log(cocktailListMemo);

  const cocktailItem = cocktailListMemo.find(
    (cocktail) => cocktail.id === selectedCocktail
  );

  if (!cocktailItem) {
    // TEMPORAIRE !!!!!! a rajouter un loader , parce pour l'instant il n'y a que une fenetre noir si pas de cocktail chargé encore ...
    return (
      <div className="bg-black flex justify-center items-center flex-1 h-[75vh]">
        <div className="w-4/5 lg:w-3/5 h-4/5 flex rounded-2xl shadow-purple-700 shadow-2xl bg-black" />
      </div>
    );
  }

  return (
    <div className="bg-black flex justify-center items-center flex-1 h-[75vh] text-white">
      <div className="relative w-4/5 lg:w-3/5 h-4/5 max-h-4/5 flex flex-col over shadow-purple-700 shadow-2xl rounded-2xl bg-black">
        <div className="w-4/5 p-3 flex flex-col items-center">
          <h1 className="text-white text-xl pt-5 text-center w-3/5">
            Commentaires a propos de
          </h1>
          <p className="text-amber-700 text-3xl font-semibold">
            {cocktailItem.slug}
          </p>
          <CommentModal />
        </div>
        <div className="w-full h-full overflow-y-auto border-t-2 p-6 pt-0 flex flex-col items-center">
          {cocktailItem.comments.map((comment) => (
            <article
              key={comment.id}
              className="w-[80%] mx-auto mt-14 p-4 rounded-lg flex items-center "
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
                  <p className="text-2xl italic font-medium text-gray-900 dark:text-white">
                    {comment.content}
                  </p>
                </blockquote>
                <figcaption className=" mt-6 space-x-3">
                  <div
                    className="divide-x-2 divide-gray-500 dark:divide-gray-700
                    "
                  >
                    <cite className="pr-3 font-medium text-gray-900 dark:text-white">
                      {comment.user.pseudonym}
                    </cite>
                    <cite className="pl-3 text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(comment.posted_at)}
                    </cite>
                  </div>
                </figcaption>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;