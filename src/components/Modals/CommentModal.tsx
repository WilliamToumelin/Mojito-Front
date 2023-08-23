import React from 'react';
import { FC, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';

const CommentModal: FC = () => {
  const [displayModal, setDisplayModal] = useState(false);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const { isLoggedIn, login, logout } = useAuth();

  // --- handleToggleModal sert à toggle le modal
  const handleToggleModal = useCallback((): void => {
    setDisplayModal((prevstate) => !prevstate);
  }, []);

  return (
    <div className="absolute top-8 right-5 w-1/5 h-full">
      <button
        type="button"
        className=" block text-white bg-gradient-to-r from-purple-700 via-pink-500 to-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handleToggleModal}
      >
        Laisser un commentaire
      </button>

      {/* Afficher la modal si l'utilisateur est connecté et displayModal est vrai */}
      {displayModal && isLoggedIn && (
        <div
          className="absolute top-5 w-[30vw] right-0 mr-8"
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

      {/* Afficher un message si l'utilisateur n'est pas connecté */}
      {displayModal && !isLoggedIn && (
        <div
          className="absolute top-5 w-[30vw] right-0 mr-8"
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
              <div className="px-6 py-6 lg:px-8 h-[10vh]">
                <p>
                  Vous devez être membre pour pouvoir commenter nos cocktails...
                </p>
                <p>
                  Pas de panique,{' '}
                  <Link to="/register" className="text-amber-700">
                    c'est par ici pour se connecter
                  </Link>{' '}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentModal;
