import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();

  // Vérifier si vous êtes sur la page de proposition de cocktail
  const CocktailSubmitPage = location.pathname === '/proposition-cocktail';

  return (
    <div className="h-[3em] bg-black flex justify-evenly items-center text-white">
      <Link to="/a-propos-de-nous" className="text-white">
        A propos de nous
      </Link>

      <Link to="/mentions-legales" className="text-white">
        Mentions Légales
      </Link>
    </div>
  );
};

export default Footer;
