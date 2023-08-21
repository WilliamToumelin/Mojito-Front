import React from 'react';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  return (
    <div className="relative bg-black flex justify-center items-center flex-1 h-[75vh]">
      <div className="relative w-4/5 lg:w-3/5 h-4/5 max-h-4/5 flex flex-col overflow-y-auto shadow-purple-700 shadow-2xl rounded-2xl bg-black">
        <div className="text-center pb-12">
          <h1 className="text-amber-700 text-2xl pt-5">
            Créer son compte membre
          </h1>
        </div>
        <div className="text-white p-6 ">
          <form action="POST" className="flex flex-col items-start">
            <label htmlFor="email" className="p-2">
              Votre adresse Email
            </label>
            <input
              type="email"
              placeholder="email@mail.com"
              className="p-2"
              required
            />
            <label htmlFor="password" className="p-2">
              Votre mot de passe
            </label>
            <input
              type="password"
              placeholder="*****"
              className="p-2"
              required
            />
            <div className="py-2">
              <label htmlFor="majeur" className="p-2">
                Avez-vous plus de 18 ans
              </label>
              <input type="checkbox" name="majeur" className="p-2" required />
            </div>
            <div className="py-2">
              <label htmlFor="consentement" className="p-2">
                Consentez vous aux{' '}
                <Link
                  to="/mentions-legales"
                  target={'_blank'}
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
            <button type="button" className="p-2">
              S'inscrire
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
