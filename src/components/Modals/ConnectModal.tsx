/* eslint-disable no-alert */
/* eslint-disable react/button-has-type */
import { FC, useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';
import './Modal.scss';

const ConnectModal: FC = () => {
  const [displayModal, setDisplayModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { isLoggedIn, login, logout } = useAuth();

  // --- handleToggleModal sert à toggle le modal
  const handleToggleModal = useCallback((): void => {
    setDisplayModal((prevstate) => !prevstate);
  }, []);

  // Code pour se connecter une fois l'API prête

  const handleLogin = async () => {
    //  Appeler votre backend pour l'authentification
    console.log('Tentative de connexion avec', username, password);
    try {
      const response = await fetch('http://localhost:5174/api/login_check', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json(); // Obtenir les données de la réponse
        const token = data.token; // Extraire le token de la réponse
        //  Stocker le token JWT dans le local storagea
        localStorage.setItem('authToken', token);
        login();
        setDisplayModal(false);
        setPassword('');
      } else {
        //  Gérer les erreurs d'authentification ici
        console.log('id incorrect');
        window.alert('Identifiants invalides');
      }
    } catch (error) {
      //  Gérer les erreurs réseau ici
      console.error('Erreur réseau lors de la connexion', error);
    }
  };

  const handleLogout = () => {
    console.log('Déconnexion en cours');
    //  Supprimer le token JWT du local storage
    localStorage.removeItem('authToken');
    logout();
    setPassword('');
    setUsername('');
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <button
            type="button"
            className="relative text-red-900 hover:text-white border border-[#A4978E] hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={handleLogout}
          >
            Déconnexion
          </button>
          <p className="absolute text-[#A4978E]">Bienvenue {username}</p>
        </>
      ) : (
        <button
          type="button"
          className="text-[#BE9063] border border-[#A4978E] hover:bg-[#525B56] focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={handleToggleModal}
        >
          Se connecter
        </button>
      )}
      {displayModal && (
        <div
          className={`fixed top-0 right-0 z-50 w-2/6 md:w-auto p-4 overflow-x-hidden overflow-y-auto h-[calc(100% - 1rem)] max-h-full ${
            displayModal ? 'open-modal' : 'close-modal'
          }`}
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-[#525B56] rounded-lg shadow ">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
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
                <h3 className="mb-4 text-xl font-medium text-[#BE9063]">
                  Se connecter
                </h3>
                <form className="space-y-6" action="#">
                  <div className="modal-input-group mb-5">
                    <input
                      type="email"
                      name="username"
                      id="email"
                      className="modal-input-group__input"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <label htmlFor="email" className="modal-input-group__label">
                      Email adress
                    </label>
                  </div>
                  <div className="modal-input-group mb-5">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="modal-input-group__input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label
                      htmlFor="password"
                      className="modal-input-group__label"
                    >
                      Mot de passe
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-lg text-sm px-5 py-2.5 text-center text-[#BE9063] font-bold bg-[#132226] border-[#A4978E] border-4"
                    onClick={handleLogin}
                  >
                    Valider
                  </button>
                  <div className="text-sm font-medium text-[#A4978E]">
                    Pas encore Membre?{' '}
                    <Link
                      to="/register"
                      className="text-[#BE9063] hover:text-[#132226]"
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
