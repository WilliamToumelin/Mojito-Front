/* eslint-disable no-console */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';

import './Register.scss';

const Register: React.FC = () => {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pseudonym, setPseudonym] = useState('');
  const [hasConsented, setHasConsented] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { register, login } = useAuth();

  if (!useAuth) {
    // Si le contexte n'est pas défini, tu peux gérer cette situation ici
    return null;
  }

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas.');
      return;
    }
    // Appeler votre backend pour l'authentification
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({
          data: [
            lastName,
            firstName,
            dateOfBirth,
            username,
            password,
            pseudonym,
            hasConsented,
          ],
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const { token } = await response.json();
        //  Stocker le token JWT dans le local storage
        localStorage.setItem('authToken', token);

        register();
        login();
      } else {
        //  Gérer les erreurs d'authentification ici
        setErrorMessage('Erreur lors de la soumission du formulaire'); // Définir le message d'erreur
      }
    } catch (error) {
      //  Gérer les erreurs réseau ici
      console.error("Erreur réseau lors de l'inscription", error);
    }
  };

  return (
    <div className="relative bg-[#A4978E] flex justify-center items-center flex-1 h-[100vh]">
      <div className="relative w-4/5 lg:w-4/6 h-full p-4 lg:h-4/5 lg:max-h-4/5 flex flex-col overflow-y-auto shadow-[#525B56] shadow-xl rounded-2xl bg-[#132226]">
        <div className="text-center pb-12">
          <h1 className="text-[#BE9063] pt-5 font-bold text-2xl">
            Créer son compte membre
          </h1>
        </div>
        <div className="flex">
          <div className="w-[50%] flex flex-row h-full px-10">
            <div className="w-full p-6 ">
              <form action="POST" className="flex flex-col items-start">
                <div className="flex w-full justify-between">
                  <div className="">
                    <div className="register-input-group mb-5">
                      <input
                        type="lastName"
                        className="register-input-group__input"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                      <label
                        htmlFor="lastName"
                        className="register-input-group__label"
                      >
                        Nom
                      </label>
                    </div>
                    <div className="register-input-group mb-5">
                      <input
                        type="firstName"
                        className="register-input-group__input"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                      <label
                        htmlFor="firstName"
                        className="register-input-group__label"
                      >
                        Prénom
                      </label>
                    </div>
                    <div className="register-input-group mb-5">
                      <input
                        type="dateOfBirth"
                        className="register-input-group__input"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        required
                      />
                      <label
                        htmlFor="dateOfBirth"
                        className="register-input-group__label"
                      >
                        Date de naissance
                      </label>
                    </div>
                  </div>
                  <div>
                    <div className="register-input-group mb-5">
                      <input
                        type="email"
                        className="register-input-group__input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                      <label
                        htmlFor="email-register"
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
                        htmlFor="password-register"
                        className="register-input-group__label"
                      >
                        Mot de passe
                      </label>
                    </div>
                    <div className="register-input-group mb-5">
                      <input
                        type="password"
                        className="register-input-group__input"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <label
                        htmlFor="confirm-password"
                        className="register-input-group__label"
                      >
                        Confirmer MdP
                      </label>
                    </div>
                    <div className="register-input-group mb-5">
                      <input
                        type="username"
                        className="register-input-group__input"
                        value={pseudonym}
                        onChange={(e) => setPseudonym(e.target.value)}
                        required
                      />
                      <label
                        htmlFor="username"
                        className="register-input-group__label"
                      >
                        Pseudo
                      </label>
                    </div>
                  </div>
                </div>

                <div className="py-2">
                  <label htmlFor="consentement" className="p-2 text-[#A4978E]">
                    Consentez vous aux{' '}
                    <Link
                      to="/mentions-legales"
                      target="blank"
                      className="text-[#BE9063] "
                    >
                      mentions légales
                    </Link>
                  </label>
                  <input
                    type="checkbox"
                    name="consentement"
                    className="p-2"
                    required
                    onChange={() => setHasConsented(!hasConsented)}
                  />
                </div>
                {/* Afficher le message d'erreur ici */}
                {errorMessage && (
                  <div className="text-red-500">{errorMessage}</div>
                )}
                <button
                  type="submit"
                  className="p-2 mt-6 bg-[#BE9063] rounded-xl text-#132226"
                  onClick={handleRegister}
                >
                  Inscription
                </button>
              </form>
            </div>
          </div>
          <div className="text-white w-[50%] h-full px-10">
            <h3 className=" font-semibold text-[#BE9063] text-xl">
              Être membre c&apos;est quoi ?
            </h3>
            <br />
            <p className="text-[#A4978E] text-lg">
              Il vous permet de commenter les recettes de cocktails. Vous
              pourrez ainsi suggérer votre touche personnelle aux autres
              utilisateurs et développer votre goût pour la créativité !
            </p>
            <br />
            <p className="text-[#A4978E] text-lg">
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
