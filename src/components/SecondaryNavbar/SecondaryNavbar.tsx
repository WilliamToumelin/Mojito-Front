import React from 'react';
import { Link } from 'react-router-dom';

import '../../styles/index.scss';

type Cocktails = {
  id: number;
  slug: string;
  content: string;
  categoryId: number;
};

type Props = {
  filteredCocktails: Cocktails[];
};

const SecondaryNavbar: React.FC<Props> = ({ filteredCocktails }) => {
  return (
    <div className="secondary-navbar">
      <ul>
        {filteredCocktails.map((cocktail: Cocktails, key) => (
          <li key={key}>
            <Link to={`/cocktail/${cocktail.slug}`}>{cocktail.id}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SecondaryNavbar;
