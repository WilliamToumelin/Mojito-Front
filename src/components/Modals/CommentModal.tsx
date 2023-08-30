import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';

interface Props {
  displayModal: boolean;
  handleToggleModal: () => void;
}

const CommentModal: React.FC<Props> = ({ displayModal, handleToggleModal }) => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="absolute top-20 right-5 w-1/5 h-full">
      {/* si l'utilisateur est connecté et displayModal est vrai */}
      {displayModal && isLoggedIn && (
        <div
          className="absolute w-[30vw] right-0 mr-8 open-modal"
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="relative w-full max-h-full border-top-white m-8">
            <div className="relative bg-[#A4978E] rounded-lg ">
              <button
                type="button"
                className="close-modal absolute top-3 right-2.5 text-[#132226] rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
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
                <span className="sr-only text-[#132226]">Close modal</span>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  Votre commentaire
                </h3>
                <form className="space-y-6" action="#">
                  <div className="modal-input-group mb-5">
                    <input
                      type="name"
                      name="name"
                      id="name"
                      className="modal-input-group__input"
                      required
                    />
                    <label htmlFor="name" className="modal-input-group__label">
                      Votre nom
                    </label>
                  </div>
                  <div className="modal-input-group mb-5">
                    <textarea
                      name="review"
                      id="review"
                      className="modal-input-group__input w-full h-[10vh]"
                      required
                    />
                    <label
                      htmlFor="review"
                      className="modal-input-group__label"
                    >
                      Votre commentaire
                    </label>
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
          className="absolute top-5 w-[30vw] right-0 mr-8 open-modal"
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="relative w-full max-h-full border-top-white m-8">
            <div className="relative bg-[#BE9063] rounded-lg shadow">
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
              <div className="px-6 py-6 lg:px-8 h-[10vh] text-[#132226]">
                <p>
                  Vous devez être membre pour pouvoir commenter nos cocktails...
                </p>
                <p>
                  Pas de panique,{' '}
                  <Link to="/register" className="text-amber-700">
                    c&apos;est par ici pour se connecter
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
