import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <div className="h-[3em] bg-black flex justify-evenly text-white">
      <NavLink to="/a-propos-de-nous" className="text-white" />
      <NavLink to="/mentions-legales" className="text-white" />
      <NavLink to="/proposition-cocktail" className="text-white" />
    </div>
  );
};

export default Footer;
