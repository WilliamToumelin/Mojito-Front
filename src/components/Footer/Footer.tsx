import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <div className="h-[3em] bg-dark-gray flex justify-evenly items-center text-dark-brown">
      <Link to="/a-propos-de-nous" className="hover:text-light-gray">
        A propos de nous
      </Link>

      <Link to="/mentions-legales" className="hover:text-light-gray">
        Mentions Légales
      </Link>
    </div>
  );
};

export default Footer;
