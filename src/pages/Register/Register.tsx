import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';

import './Register.scss';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const { register } = useAuth();

  if (!useAuth) {
    // Si le contexte n'est pas défini, tu peux gérer cette situation ici
    return null;
  }

  const handleRegister = async () => {
    // Appeler votre backend pour l'authentification
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const { token } = await response.json();
        //  Stocker le token JWT dans le local storage
        localStorage.setItem('authToken', token);
        register();
      } else {
        //  Gérer les erreurs d'authentification ici
        window.alert("Erreur lors de l'inscription");
      }
    } catch (error) {
      //  Gérer les erreurs réseau ici
      console.error("Erreur réseau lors de l'inscription", error);
    }
  };

  return (
    <div className="relative bg-black flex justify-center items-center flex-1 h-[100vh]">
      <div className="relative w-4/5 lg:w-3/5 h-4/5 max-h-4/5 flex flex-col overflow-y-auto shadow-purple-700 shadow-2xl rounded-2xl bg-black">
        <div className="text-center pb-12">
          <h1 className="text-amber-700 pt-5 font-bold text-xl">
            Créer son compte membre
          </h1>
        </div>
        <div className="flex">
          <div className="w-[50%] flex flex-row h-full p-10">
            <div className="text-white p-6 ">
              <form action="POST" className="flex flex-col items-start">
                <div className="register-input-group mb-5">
                  <input
                    type="email"
                    className="register-input-group__input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label
                    htmlFor="email"
                    className="register-input-group__label"
                  >
                    Email address
                  </label>
                </div>
                <div className="register-input-group mb-5">
                  <input
                    type="password"
                    className="register-input-group__input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label
                    htmlFor="password"
                    className="register-input-group__label"
                  >
                    Mot de passe
                  </label>
                </div>
                <div className="register-input-group mb-5">
                  <input
                    type="username"
                    className="register-input-group__input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <label
                    htmlFor="password"
                    className="register-input-group__label"
                  >
                    Pseudo
                  </label>
                </div>

                <div className="py-2">
                  <label htmlFor="majeur" className="p-2">
                    Avez-vous plus de 18 ans
                  </label>
                  <input
                    type="checkbox"
                    name="majeur"
                    className="p-2"
                    required
                  />
                </div>

                <div className="py-2">
                  <label htmlFor="consentement" className="p-2">
                    Consentez vous aux{' '}
                    <Link
                      to="/mentions-legales"
                      target="blank"
                      className="text-amber-700"
                    >
                      mentions légales
                    </Link>
                  </label>
                  <input
                    type="checkbox"
                    name="consentement"
                    className="p-2"
                    required
                  />
                </div>
                <button
                  type="button"
                  className="p-2 mt-6 bg-amber-700 rounded-xl"
                  onClick={handleRegister}
                >
                  Inscription
                </button>
              </form>
            </div>
          </div>
          <div className="text-white w-[50%] h-full p-10">
            <h3 className=" font-semibold text-amber-700 text-lg">
              Être membre c&apos;est quoi ?
            </h3>
            <br />
            <p>
              Il vous permet de commenter les recettes de cocktails. Vous
              pourrez ainsi suggérer votre touche personnelle aux autres
              utilisateurs et développer votre goût pour la créativité !
            </p>
            <br />
            <p>
              Vous pourrez également noter les cocktails et ainsi éclairer les
              autres utilisateurs sur la qualité de ces dernières. Cela nous
              permettra également de faire le tri et de ne garder que les
              meilleures recettes sur notre site !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
