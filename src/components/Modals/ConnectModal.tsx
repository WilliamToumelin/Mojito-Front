/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable react/button-has-type */
import { FC, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';

import './Modal.scss';
import SquaredButton from '../common/buttons/SquaredButton';

const ConnectModal: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
    password: string;
  }>();

  const [connectMessage, setConnectMessage] = useState('');
  const [displayModal, setDisplayModal] = useState(false);
  const navigate = useNavigate();

  const { isLoggedIn, login, logout } = useAuth();

  // --- handleToggleModal sert à toggle le modal
  const handleToggleModal = useCallback((): void => {
    setDisplayModal((prevstate) => !prevstate);
    setConnectMessage('');
  }, []);

  // Code pour se connecter une fois l'API prête

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      const response = await fetch('http://localhost:5174/api/login_check', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        const { token } = responseData;
        localStorage.setItem('authToken', JSON.stringify(token));
        console.log(token);
        login();
        setDisplayModal(false);
        navigate('/');
        setConnectMessage(`Bienvenue ${data.email}`);
      } else {
        setConnectMessage('Identifiants ou mot de passe invalides');
      }
    } catch (error) {
      console.error('Erreur réseau lors de la connexion', error);
    }
  };

  const handleLogout = () => {
    //  Supprimer le token JWT du local storage
    localStorage.removeItem('authToken');
    logout();
  };

  return (
    <div>
      {isLoggedIn ? (
        <SquaredButton
          name="Déconnexion"
          type="button"
          height={3}
          width={12}
          onClick={handleLogout}
          bgColorHover="hover:bg-red-cocktail"
          fontColor="text-red-cocktail"
        />
      ) : (
        <SquaredButton
          name="Se connecter"
          type="button"
          height={2.5}
          width={11}
          onClick={handleToggleModal}
        />
      )}
      {displayModal && (
        <div
          className={`fixed top-0 right-0 z-50  w-auto p-4 overflow-x-hidden overflow-y-auto h-[calc(100% - 1rem)] max-h-full ${
            displayModal ? 'open-modal' : 'close-modal'
          }`}
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-light-gray rounded-lg shadow ">
              <button
                type="button"
                className="absolute top-3 right-2.5 bg-transparent rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
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
                <h3 className="mb-4 text-xl font-medium text-dark-brown">
                  Se connecter
                </h3>
                <form
                  className="space-y-6"
                  onSubmit={handleSubmit(handleLogin)}
                >
                  <div className="modal-input-group mb-5 ">
                    <input
                      type="email"
                      id="email"
                      className="modal-input-group__input"
                      required
                      {...register('email')}
                    />
                    <label htmlFor="email" className="modal-input-group__label">
                      Email adress
                    </label>
                    {errors.email && (
                      <div className="text-red-500">Email requis</div>
                    )}
                  </div>
                  <div className="modal-input-group mb-5">
                    <input
                      type="password"
                      id="password"
                      className="modal-input-group__input"
                      required
                      {...register('password')}
                    />
                    <label
                      htmlFor="password"
                      className="modal-input-group__label"
                    >
                      Mot de passe
                    </label>
                    {errors.password && (
                      <div className="text-red-500">Mot de passe requis</div>
                    )}
                    <p className=" text-red-400">{connectMessage}</p>
                  </div>
                  <SquaredButton
                    name="Valider"
                    type="submit"
                    height={2.5}
                    width={7}
                    bgColorHover="light-brown"
                    fontColorHover="dark-gray"
                  />

                  <div className="text-sm  font-medium text-light-brown">
                    Pas encore Membre?{' '}
                    <Link
                      to="/register"
                      className="text-dark-brown hover:text-dark-gray"
                      onClick={handleToggleModal}
                    >
                      Créer un compte
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectModal;
