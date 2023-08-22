import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';

import './Register.scss';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useAuth();

  if (!useAuth) {
    // Si le contexte n'est pas défini, tu peux gérer cette situation ici
    return null;
  }

  // const signIn = () => {
  //   // Appeler votre backend pour l'authentification
  //   try {
  //     const response = await fetch('/api/signIn', {
  //       method: 'POST',
  //       body: JSON.stringify({ email, password }),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     if (response.ok) {
  //       const { token } = await response.json();
  //       //  Stocker le token JWT dans le local storage
  //       localStorage.setItem('authToken', token);
  //       login();
  //     } else {
  //       //  Gérer les erreurs d'authentification ici
  //     }
  //   } catch (error) {
  //     //  Gérer les erreurs réseau ici
  //   }
  // };

  return (
    <div className="relative bg-black flex justify-center items-center flex-1 h-[100vh]">
      <div className="relative w-4/5 lg:w-3/5 h-4/5 max-h-4/5 flex flex-col overflow-y-auto shadow-purple-700 shadow-2xl rounded-2xl bg-black">
        <div className="text-center pb-12">
          <h1 className="text-amber-700 text-2xl pt-5">
            Créer son compte membre
          </h1>
        </div>
        <div className="flex">
          <div className="w-[50%] flex flex-row h-full p-10">
            <div className="text-white p-6 ">
              <form action="POST" className="flex flex-col items-start">
                <div className="input-group mb-5">
                  <input
                    type="email"
                    className="input-group__input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="email" className="input-group__label">
                    Email address
                  </label>
                </div>
                <div className="input-group mb-5">
                  <input
                    type="password"
                    className="input-group__input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label htmlFor="password" className="input-group__label">
                    Mot de passe
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
                  className="p-2 bg-amber-700 rounded-xl"
                  onClick={signIn}
                >
                  Inscription
                </button>
              </form>
            </div>
          </div>
          <div className="text-white w-[50%] h-full p-10">
            <h3 className=" font-semibold text-amber-700 text-xl">
              Être membre c'est quoi ?
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
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

//    <div class="input-group">
//   <input type="text" id="email" class="input-group__input" required />
//   <label htmlFor="" class="input-group__label">Email adress</label>
// </div>;
