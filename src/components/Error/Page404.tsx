import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/index.scss';

const Page404: React.FC = () => {
  return (
    <div className="relative bg-black flex justify-center items-center flex-1 h-[75vh]">
      <div className="relative w-4/5 lg:w-3/5 h-4/5 max-h-4/5 flex flex-col overflow-y-auto shadow-purple-700 shadow-2xl rounded-2xl bg-black ">
        <div className="flex h-full">
          <div className="w-[50%] h-full p-6 flex flex-col justify-center">
            <h3 className="m-5 mb-3 text-gray-500 dark:text-gray-400 first-line:uppercase first-line:tracking-widest text-7xl font-bold text-gray-900 dark:text-gray-100 mr-3 underline">
              OUPS
            </h3>
            <h3 className="m-5 mb-3 text-gray-500 dark:text-gray-400 first-line:uppercase first-line:tracking-widest text-4xl font-bold text-gray-900 dark:text-gray-100 mr-3">
              ERROR 404
            </h3>
            <p className="m-5 text-gray-500 dark:text-gray-400">
              Rien a voir ici! A part peut être ce sacré John qui cherche un bar
              aussi ...
            </p>
            <p className="m-5 text-gray-500 dark:text-gray-400">
              Pour revenir a la page d'acceuil c'est par{' '}
              <Link to="/" className="text-amber-700">
                ici !
              </Link>
            </p>
          </div>
          <div className="w-[50%] min-h-full flex items-center">
            <img
              src="../../../public/john.gif"
              className="w-[90%] h-3/5 rounded-xl"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page404;
