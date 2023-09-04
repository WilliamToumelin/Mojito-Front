/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthProvider';
import SquaredButton from '../common/buttons/SquaredButton';

interface Props {
  selectedCocktail: number | null;
  displayModal: boolean;
  handleToggleModal: () => void;
}

const CommentModal: React.FC<Props> = ({
  displayModal,
  handleToggleModal,
  selectedCocktail,
}) => {
  const { isLoggedIn } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, reset } = useForm<{
    user: number;
    content: string;
    postedAt: Date | string;
    cocktail: number | null;
  }>();

  const onSubmit = async (data: {
    user: number;
    content: string;
    postedAt: Date | string;
    cocktail: number | null;
  }) => {
    try {
      // Inserer la data en 'dur'
      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleDateString(
        'fr-FR',
        {
          month: 'long',
          year: 'numeric',
        }
      )}`;

      // Assigner la data en 'dur' aux champs respectif
      data.postedAt = formattedDate;
      data.user = 1;
      data.cocktail = selectedCocktail;

      let token = '';
      try {
        const authTokenString = localStorage.getItem('authToken');
        if (authTokenString) {
          const authToken = JSON.parse(authTokenString);
          if (authToken.token) {
            token = authToken.token;
          } else {
            console.log('Erreur : Le token est nul dans authToken');
          }
        } else {
          console.log(
            "Erreur : L'objet authToken est nul ou introuvable dans le local storage"
          );
        }
      } catch (error) {
        console.log('Erreur de désérialisation JSON :', error);
      }

      const response = await fetch('http://localhost:5174/api/comments/add', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Assurez-vous que Bearer est correctement orthographié
        },
      });
      if (response.ok) {
        console.log('envoi réussi');
      } else {
        setErrorMessage('Erreur lors de la soumission du commentaire');
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
                      id="content"
                      className="modal-input-group__input w-full h-[10vh] text-dark-gray bg-light-grey"
                      {...register('content')}
                    />
                    <label
                      htmlFor="content"
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
