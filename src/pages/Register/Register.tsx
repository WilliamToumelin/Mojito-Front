/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';

import './Register.scss';

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch, // Fonction pour surveiller les valeurs des champs
  } = useForm<{
    lastName: string;
    firstName: string;
    dateOfBirth: Date;
    email: string;
    password: string;
    pseudonym: string;
    hasConsented: boolean;
    warning: 0;
    created_at: string;
    verified: boolean;
  }>();

  const [errorMessage, setErrorMessage] = useState('');
  const [errorPasswordMessage, setErrorPasswordMessage] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const { login } = useAuth();

  if (!useAuth) {
    // Si le contexte n'est pas défini, tu peux gérer cette situation ici
    return null;
  }

  const handleRegister = async (data: {
    lastName: string;
    firstName: string;
    dateOfBirth: Date;
    email: string;
    password: string;
    pseudonym: string;
    hasConsented: boolean;
    warning: number;
    created_at: string;
    verified: boolean;
  }) => {
    // Variable pour les infos direct
    const currentDate = new Date().toISOString();
    const currentWarning = 0;
    const currentVerified = false;
    // Aujout des valeurs de variables dans la data
    data.created_at = currentDate;
    data.warning = currentWarning;
    data.verified = currentVerified;
    // Appeler votre backend pour l'authentification
    try {
      const response = await fetch('http://localhost:5174/api/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(data);
      if (response.ok) {
        const { token } = await response.json();
        //  Stocker le token JWT dans le local storage
        localStorage.setItem('authToken', token);
        // login();
        setRegisterSuccess(true);
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
    <div className="relative bg-light-brown flex justify-center items-center flex-1 h-[100vh]">
      <div className="relative w-4/5 lg:w-4/6 h-full p-4 lg:h-4/5 lg:max-h-4/5 flex flex-col overflow-y-auto shadow-light-gray shadow-xl rounded-2xl bg-dark-gray">
        <div className="text-center pb-12">
          <h1 className="text-dark-brown pt-5 font-bold text-2xl">
            Créer son compte membre
          </h1>
        </div>
        <div className="flex animate-fade-in-down">
          <div className="w-[50%] flex flex-row h-full px-10">
            <div className="w-full p-6 ">
              {!registerSuccess ? (
                <form
                  onSubmit={handleSubmit(handleRegister)}
                  className="flex flex-col items-start"
                >
                  <div className="flex w-full justify-between">
                    <div className="">
                      <div className="register-input-group mb-5">
                        <input
                          type="lastName"
                          className="register-input-group__input"
                          required
                          {...register('lastName')}
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
                          {...register('firstName')}
                          required
                        />
                        <label
                          htmlFor="firstName"
                          className="register-input-group__label"
                        >
                          Prénom
                        </label>
                      </div>
                      <label htmlFor="dateOfBirth" className="text-light-brown">
                        Date de naissance
                      </label>
                      <div className="register-input-group mb-1">
                        <input
                          type="date"
                          className="register-input-group__input"
                          {...register('dateOfBirth')}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <div className="register-input-group mb-5">
                        <input
                          type="email"
                          className="register-input-group__input"
                          {...register('email')}
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
                          {...register('password')}
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
                          type="pseudonym"
                          className="register-input-group__input"
                          {...register('pseudonym')}
                          required
                        />
                        <label
                          htmlFor="pseudonym"
                          className="register-input-group__label"
                        >
                          Pseudo
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <label
                      htmlFor="consentement"
                      className="p-2 text-light-brown"
                    >
                      Consentez vous aux{' '}
                      <Link
                        to="/mentions-legales"
                        target="blank"
                        className="text-dark-brown "
                      >
                        mentions légales
                      </Link>
                    </label>
                    <input
                      type="checkbox"
                      className="p-2"
                      required
                      {...register('hasConsented')}
                    />
                  </div>
                  {/* Afficher le message d'erreur ici */}
                  {errorMessage && (
                    <div className="text-red-900">{errorMessage}</div>
                  )}
                  <button
                    type="submit"
                    className="p-2 mt-6 bg-dark-brown rounded-xl text-#132226"
                  >
                    Inscription
                  </button>
                </form>
              ) : (
                <p>Création de compte réussi!</p>
              )}
            </div>
          </div>
          <div className="text-white w-[50%] h-full px-10">
            <h3 className=" font-semibold text-dark-brown text-xl">
              Être membre c&apos;est quoi ?
            </h3>
            <br />
            <p className="text-light-brown text-lg">
              Il vous permet de commenter les recettes de cocktails. Vous
              pourrez ainsi suggérer votre touche personnelle aux autres
              utilisateurs et développer votre goût pour la créativité !
            </p>
            <br />
            <p className="text-light-brown text-lg">
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
