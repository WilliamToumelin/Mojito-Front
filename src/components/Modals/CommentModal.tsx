/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthProvider';
import SquaredButton from '../common/buttons/SquaredButton';

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
    try {
      const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      };
      const response = await fetch('API', request);
      if (response.ok) {
        reset();
      } else {
        console.error('Erreur lors de la soumission du commentaire');
      }
    } catch (error) {
      console.error('Erreur inattendue', error);
    }
  };

  return (
    <div className="absolute top-20 right-5 h-full">
      {displayModal && isLoggedIn && (
        <div
          className="absolute w-[70vw] md:w-[35vw] right-0 mr-8 open-modal"
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="relative w-full max-h-full border-top-white m-8">
            <div className="relative bg-light-gray rounded-lg">
              <button
                type="button"
                className="absolute top-1 right-1 rounded-lg text-xl w-8 h-8 justify-center items-center text-dark-gray"
                onClick={handleToggleModal}
              >
                X
              </button>

              <div className="px-6 py-8 lg:px-8">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                  {/* <div className="modal-input-group mb-5">
                    <input
                      type="text"
                      id="name"
                      className="modal-input-group__input text-dark-gray"
                      {...register('name')}
                    />
                    <label htmlFor="name" className="modal-input-group__label">
                      Votre nom
                    </label>
                  </div> */}
                  <div className="modal-input-group mb-5">
                    <textarea
                      id="review"
                      className="modal-input-group__input w-full h-[10vh] text-dark-gray bg-light-brown"
                      {...register('review')}
                    />
                    <label
                      htmlFor="review"
                      className="modal-input-group__label text-dark-gray text-lg"
                    >
                      Votre commentaire
                    </label>
                  </div>
                  <SquaredButton
                    name="Envoyer"
                    type="submit"
                    height={2.5}
                    width={6}
                    bgColorHover="hover:bg-dark-gray"
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
