/* eslint-disable no-alert */
/* eslint-disable react/button-has-type */
import { FC, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';

const ConnectModal: FC = () => {
  const [displayModal, setDisplayModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isLoggedIn, login, logout } = useAuth();

  // --- handleToggleModal sert à toggle le modal
  const handleToggleModal = useCallback((): void => {
    setDisplayModal((prevstate) => !prevstate);
  }, []);

  if (!useAuth) {
    // Si le contexte n'est pas défini, tu peux gérer cette situation ici
    return null;
  }

  const handleLogin = () => {
    // Simuler l'authentification avec les informations fournies
    if (email === 'will@gmail.com' && password === 'niqueRedux') {
      login();
      setDisplayModal(false);
    } else {
      // Gérer les erreurs d'authentification ici
      window.alert('Identifiants invalides');
    }
  };

  const handleLogout = () => {
    logout(); // Appelle la fonction de déconnexion du contexte
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      {isLoggedIn ? (
        <button
          className="block text-white font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-400 hover:to-orange-400 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleLogout}
        >
          Déconnexion
        </button>
      ) : (
        <button
          className="block text-white font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-400 hover:to-orange-400 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleToggleModal}
        >
          Se connecter
        </button>
      )}
      {displayModal && (
        <div
          className="fixed top-0 right-0 z-50 w-2/6 md:w-auto p-4 overflow-x-hidden overflow-y-auto h-[calc(100%-1rem)] max-h-full"
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="relative w-full max-w-md max-h-full">
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
                  Se connecter
                </h3>
                <form className="space-y-6" action="#">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="nom@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-400 hover:to-orange-400 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleLogin}
                  >
                    Valider
                  </button>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Pas encore Membre?{' '}
                    <Link
                      to="/register"
                      className="text-blue-700 hover:underline dark:text-blue-500"
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

// Code pour se connecter une fois l'API prête

// const handleLogin = async () => {
//  Appeler votre backend pour l'authentification
//   try {
//     const response = await fetch('/api/login', {
//       method: 'POST',
//       body: JSON.stringify({ email, password }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.ok) {
//       const { token } = await response.json();
//        Stocker le token JWT dans le local storage
//       localStorage.setItem('authToken', token);
//       login();
//     } else {
//        Gérer les erreurs d'authentification ici
//     }
//   } catch (error) {
//      Gérer les erreurs réseau ici
//   }
// };

// const handleLogout = () => {
//    Supprimer le token JWT du local storage
//   localStorage.removeItem('authToken');
//   logout();
// };
