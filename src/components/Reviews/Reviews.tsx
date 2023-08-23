import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router';
import Page404 from '../Error/Page404';

const sampleComments = [
  {
    id: 1,
    text: 'Moi je suis sur je vais pas y arriver ouin ouin',
    author: 'Christophe Totof',
    date: '12/06/2023',
  },
  {
    id: 2,
    text: "J'aime me beurer la biscotte en regardant votre site",
    author: 'Erwin Zebezu',
    date: '13/06/2023',
  },
  {
    id: 3,
    text: "J'aime prendre mon bain en buvant ce cocktail",
    author: 'Celestin Joiris',
    date: '13/06/2023',
  },
  {
    id: 4,
    text: 'Nani ?!?!',
    author: 'Tommy the big D',
    date: '13/06/2023',
  },
  {
    id: 5,
    text: "J'adore ce cocktail qui me rapelle le bon temps a Melun.",
    author: 'Will I Am',
    date: '13/06/2023',
  },
];

type Cocktails = {
  categoryId: number;
  id: number;
  slug: string;
  content: string;
  title: string;
};

type Props = {
  cocktailList: Cocktails[];
  modulo: boolean;
};

const Reviews: React.FC<Props> = ({ cocktailList, modulo }) => {
  const { slug } = useParams<{ slug: string }>();
  const [displayModal, setDisplayModal] = useState(false);

  // --- handleToggleModal sert à toggle le modal
  const handleToggleModal = useCallback((): void => {
    setDisplayModal((prevstate) => !prevstate);
  }, []);

  const cocktailItem = cocktailList.find((cocktail) => cocktail.slug === slug);

  if (!cocktailItem) {
    return <Page404 />;
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
          <div className="absolute top-8 right-5 w-1/5 h-full">
            <button
              type="button"
              className=" block text-white bg-gradient-to-r from-purple-700 via-pink-500 to-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleToggleModal}
            >
              Laisser un commentaire
            </button>
          </div>
        </div>
        {displayModal && (
          <div
            className="absolute top-5 right-0 w-2/3 mr-8"
            id="authentication-modal"
            tabIndex={-1}
            aria-hidden="true"
          >
            <div className="relative w-full max-h-full border-top-white m-8">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  type="button"
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                  onClick={handleToggleModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="px-6 py-6 lg:px-8">
                  <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                    Votre commentaire
                  </h3>
                  <form className="space-y-6" action="#">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Votre nom
                      </label>
                      <input
                        type="name"
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="review"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Votre commentaire
                      </label>
                      <textarea
                        name="review"
                        id="review"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-gradient-to-r from-purple-700 via-pink-500 to-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Valider
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="w-full h-full overflow-y-auto border-t-2 p-6 pt-0 flex flex-col items-center">
          {sampleComments.map((comment, index) => (
            <article
              key={comment.id}
              className={`w-[80%] mx-auto mt-14 p-4 rounded-lg flex items-center ${
                modulo && index % 2 !== 0 ? 'flex-row-reverse' : ''
              }`}
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
                    {comment.text}
                  </p>
                </blockquote>
                <figcaption className=" mt-6 space-x-3">
                  <div
                    className={`divide-x-2 divide-gray-500 dark:divide-gray-700 ${
                      modulo && index % 2 !== 0 ? 'float-right' : ''
                    }`}
                  >
                    <cite className="pr-3 font-medium text-gray-900 dark:text-white">
                      {comment.author}
                    </cite>
                    <cite className="pl-3 text-sm text-gray-500 dark:text-gray-400">
                      {comment.date}
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
