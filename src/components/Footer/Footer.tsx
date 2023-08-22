import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <div className="h-[3em] bg-black flex justify-evenly items-center text-white">
      <Link to="/a-propos-de-nous" className="text-white">
        A propos de nous
      </Link>
      <Link
        to="/proposition-cocktail"
        className="text-white rounded-full bg-gradient-to-r from-purple-700 via-pink-500 to-orange-500 p-2 font-bold"
      >
        Propose un cocktail !
      </Link>
      <Link to="/mentions-legales" className="text-white">
        Mentions Légales
      </Link>
    </div>
  );
};

export default Footer;
