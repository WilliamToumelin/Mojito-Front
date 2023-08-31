/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthProvider';
import SquaredButton from '../common/buttons/SquaredButton';

import './Modal.scss';

interface Props {
  displayModal: boolean;
  handleToggleModal: () => void;
}

const CommentModal: React.FC<Props> = ({ displayModal, handleToggleModal }) => {
  const { isLoggedIn } = useAuth();
  const { register, handleSubmit, reset } = useForm<{
    name: string;
    review: string;
  }>();

  const onSubmit = async (data: { name: string; review: string }) => {
    console.log(data);
    try {
      const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      };
      const response = await fetch('API', request);
      if (response.ok) {
        console.log('Commentaire soumis avec succès');
        reset();
      } else {
        console.error('Erreur lors de la soumission du commentaire');
      }
    } catch (error) {
      console.error('Erreur inattendue', error);
    }
  };

  return (
    <div className="absolute top-20 right-5 w-1/5 h-full">
      {displayModal && isLoggedIn && (
        <div
          className="absolute w-[30vw] right-0 mr-8 open-modal"
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="relative w-full max-h-full border-top-white m-8">
            <div className="relative bg-[#525B56] rounded-lg">
              <button
                type="button"
                className="close-modal absolute top-3 right-2.5 text-[#132226] rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                data-modal-hide="authentication-modal"
                onClick={handleToggleModal}
              >
                <svg
                  className="w-3 h-3 text-[#132226]"
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
                <h3 className="mb-4 text-xl font-medium text-gray-900">
                  Votre commentaire
                </h3>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                  <div className="modal-input-group mb-5">
                    <input
                      type="text"
                      id="name"
                      className="modal-input-group__input text-[#132226]"
                      {...register('name')}
                    />
                    <label htmlFor="name" className="modal-input-group__label">
                      Votre nom
                    </label>
                  </div>
                  <div className="modal-input-group mb-5">
                    <textarea
                      id="review"
                      className="modal-input-group__input w-full h-[10vh] text-[#132226]"
                      {...register('review')}
                    />
                    <label
                      htmlFor="review"
                      className="modal-input-group__label text-[#a4978e]"
                    >
                      Votre commentaire
                    </label>
                  </div>
                  <SquaredButton
                    name="Envoyer"
                    type="submit"
                    height={40}
                    width={120}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentModal;
