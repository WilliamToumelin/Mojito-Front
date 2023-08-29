import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <div className="h-[3em] bg-[#132226] flex justify-evenly items-center text-[#A4978E]">
      <Link to="/a-propos-de-nous">A propos de nous</Link>

      <Link to="/mentions-legales">Mentions Légales</Link>
    </div>
  );
};

export default Footer;
