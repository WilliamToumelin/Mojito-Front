/* eslint-disable no-console */
import { FC, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAuth } from '../../contexts/AuthProvider';
import SquaredButton from '../common/buttons/SquaredButton';
import InputForm from '../common/InputForm/InputForm';
import { apiHostName } from '../../env-config';

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

  const handleLogin = async (connectData: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await fetch(
        `http://williammbakop-server.eddi.cloud/back/api/login_check`,
        {
          method: 'POST',
          body: JSON.stringify(connectData),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        const { token } = responseData;
        const { data } = responseData;
        // Stocker le token dans un cookie avec une date d'expiration (par exemple, 7 jours)
        Cookies.set('authToken', token, { expires: 7 });
        Cookies.set('userToken', JSON.stringify(data), { expires: 7 });

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
    // Supprimer le cookie authToken
    Cookies.remove('authToken');
    logout();
  };

  return (
    <div>
      {isLoggedIn ? (
        <SquaredButton
          name="Déconnexion"
          type="button"
          height={2.5}
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
                className="absolute top-3 right-2.5 bg-transparent hover:text-dark-brown text-dark-gray rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
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
                  className="space-y-3"
                  onSubmit={handleSubmit(handleLogin)}
                >
                  <div className="text-left">
                    <InputForm
                      type="email"
                      htmlFor="email"
                      registerName="email"
                      name="Email"
                      register={register}
                    />
                    {errors.email && (
                      <div className="text-red-cocktail">Email requis</div>
                    )}
                  </div>
                  <div className="pb-4 text-left">
                    <InputForm
                      type="password"
                      htmlFor="password"
                      registerName="password"
                      name="Mot de passe"
                      register={register}
                    />
                    {errors.password && (
                      <div className="text-red-500">Mot de passe requis</div>
                    )}
                    <p className=" text-red-400">{connectMessage}</p>
                  </div>
                  <SquaredButton
                    name="Valider"
                    type="submit"
                    height={2.5}
                    width={6}
                    bgColorHover="hover:bg-dark-gray"
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
