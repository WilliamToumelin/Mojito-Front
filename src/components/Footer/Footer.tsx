import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <div className="h-[3em] bg-black flex justify-evenly text-white">
      <Link to="/a-propos-de-nous" className="text-white">
        A propos de nous
      </Link>
      <Link to="/mentions-legales" className="text-white">
        Mentions Légales
      </Link>
      <Link to="/proposition-cocktail" className="text-white">
        Propose un de tes cocktails !
      </Link>
    </div>
  );
};

export default Footer;
