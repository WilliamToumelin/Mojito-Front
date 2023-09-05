/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthProvider';
import Cookies from 'js-cookie';
import SquaredButton from '../common/buttons/SquaredButton';

// import './Modal.scss';

interface Props {
  displayModal: boolean;
  handleToggleModal: () => void;
}

const CommentModal: React.FC<Props> = ({ displayModal, handleToggleModal }) => {
  const [successMessage, setSuccessMessage] = useState('');
  const [postSuccess, setPostSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { isLoggedIn } = useAuth();
  const { register, handleSubmit, reset } = useForm<{
    user: number;
    content: string;
    postedAt: Date;
    cocktail: number | null;
  }>();
  const authToken = Cookies.get('authToken');
  const userToken = Cookies.get('userToken');
  let userId: number | null = null;

  if (userToken) {
    const userTokenObj = JSON.parse(userToken);
    userId = userTokenObj.id;
  }

  const selectedCocktailId = Number(localStorage.getItem('selectedCocktail'));

  const onSubmit = async (data: {
    user: number | null;
    content: string;
    postedAt: Date | string | null;
    cocktail: number | null;
  }) => {
    const date = new Date();

    data.postedAt = date;
    data.user = userId;
    if (typeof selectedCocktailId === 'number') {
      data.cocktail = selectedCocktailId;
    } else {
      data.cocktail = null;
    }

    try {
      const response = await fetch('http://localhost:5174/api/comments/add', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`, // Ajouter le token JWT aux en-têtes
        },
      });

      if (response.ok) {
        setSuccessMessage('Votre commentaire a bien été envoyer');
        setPostSuccess(true);
      } else {
        setErrorMessage(
          "L'envoi de votre commentaire n'a pu aboutir, peut être avez vous déja commenter ce cocktail..."
        );
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
                className="absolute top-3 right-2.5 rounded-lg text-sm w-8 h-8 justify-center items-center bg-dark-brown text-dark-gray hover:bg-dark-gray hover:text-dark-brown hover:border hover:border-dark-brown"
                onClick={handleToggleModal}
              >
                X
              </button>

              <div className="px-6 py-6 lg:px-8">
                {!postSuccess ? (
                  <>
                    <h3 className="mb-4 text-xl font-medium text-dark-gray">
                      Votre commentaire
                    </h3>
                    <form
                      className="space-y-6"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="modal-input-group mb-5">
                        <textarea
                          id="content"
                          className="modal-input-group__input w-full h-[10vh] text-dark-gray"
                          {...register('content')}
                        />
                        <label
                          htmlFor="content"
                          className="modal-input-group__label text-light-brown"
                        >
                          Votre commentaire
                        </label>
                      </div>
                      <p className="text-red-600">{errorMessage}</p>
                      <SquaredButton
                        name="Envoyer"
                        type="submit"
                        height={2.5}
                        width={6}
                        bgColorHover="hover:bg-dark-gray"
                      />
                    </form>
                  </>
                ) : (
                  <p className="text-green-600">{successMessage}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentModal;
