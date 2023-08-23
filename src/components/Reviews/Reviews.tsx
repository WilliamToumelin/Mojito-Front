import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router';
import Page404 from '../Error/Page404';

type Cocktails = {
  categoryId: number;
  id: number;
  slug: string;
  content: string;
  title: string;
};

type Props = {
  cocktailList: Cocktails[];
};

const Reviews: React.FC<Props> = ({ cocktailList }) => {
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
      <div className="relative w-4/5 lg:w-3/5 h-4/5 max-h-4/5 flex flex-col overflow-y-auto over shadow-purple-700 shadow-2xl rounded-2xl bg-black">
        <h1 className="text-amber-700 text-2xl pt-5 text-center">
          Commentaires sur {cocktailItem.slug}
        </h1>
        <div className="absolute top-5 right-5 ">
          <button
            type="button"
            className="block text-white bg-gradient-to-r from-purple-700 via-pink-500 to-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleToggleModal}
          >
            Laisser un commentaire
          </button>
        </div>
        {displayModal && (
          <div
            className="absolute top-5 right-0 w-2/3 mr-8"
            id="authentication-modal"
            tabIndex={-1}
            aria-hidden="true"
          >
            <div className="relative w-full max-h-full">
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
        <article className="p-3 border rounded-lg w-[55%] mt-5 flex flex-col items-center">
          <p className="text-xl font-semibold p-5">
            Moi je suis sur je suis sur je vais pas y arriver ouin ouin,Moi je
            suis sur je suis sur je vais pas y arriver ouin ouin,Moi je suis sur
            je suis sur je vais pas y arriver ouin ouin.
          </p>
          <p className=" font-semibold p-5 italic">
            Christophe Totof
            <span className="text-sm font-base text-gray-500">
              le 12/06/2023
            </span>
          </p>
        </article>
        <article className="p-3 border rounded-lg w-[55%] my-5 flex flex-col items-center">
          <p className="text-xl font-semibold p-5">
            J&apos;aime me beurer la biscotte en regardant votre site
          </p>
          <p className=" font-semibold p-5 italic">
            Erwin Zebezu
            <span className="text-sm font-base text-gray-500"> 13/06/2023</span>
          </p>
        </article>
      </div>
    </div>
  );
};

export default Reviews;
