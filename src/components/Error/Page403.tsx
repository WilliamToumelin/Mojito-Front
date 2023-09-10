import React from 'react';
import { Link } from 'react-router-dom';

const Page403: React.FC = () => {
  return (
    <div className="relative bg-light-brown flex justify-center items-center flex-1 h-[75vh]">
      <div
        style={{
          boxShadow: '#132226 0px 1px 22px',
        }}
        className="w-4/5 xl:w-4/6 h-4/5 flex flex-col overflow-y-auto shadow-light-gray shadow-xl rounded-2xl pb-3 bg-dark-gray"
      >
        <div className="flex h-full">
          <div className="w-[50%] h-full p-6 flex flex-col justify-center">
            <h3 className="m-5 mb-3 text-dark-brown first-line:uppercase first-line:tracking-widest text-7xl font-bold mr-3 underline">
              FORBIDDEN !!
            </h3>
            <h3 className="m-5 mb-3 text-light-brown first-line:uppercase first-line:tracking-widest text-4xl font-bold mr-3">
              ERROR 403
            </h3>
            <p className="m-5 text-light-brown">
              Tu essaie d&aposaller la ou tu n&aposas le droit, maman ne serait
              pas fier de toi ...
            </p>
            <p className="m-5 text-light-brown">
              Pour revenir a la page d&apos;acceuil c&apos;est par{' '}
              <Link to="/" className="text-dark-brown">
                ici !
              </Link>
            </p>
          </div>
          <div className="w-[50%] min-h-full flex items-center">
            <img
              src="/forbidden.gif"
              className="w-[90%] h-3/5 rounded-xl"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page403;
