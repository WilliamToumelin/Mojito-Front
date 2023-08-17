// SecondaryNavbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

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
    <div className="absolute top-[10em] left-0 bg-[#2E1603] text-white min-h-[40vh] shadow-amber-700 shadow-lg ">
      <h3 className="text-lg font-semibold mb-2 p-4">Liste à parcourir</h3>
      <ul className="list-disc pl-6 p-3">
        {filteredCocktails.map((cocktail: Cocktails, key) => (
          <li key={key} className="mb-2">
            <Link
              to={`/cocktail/${cocktail.slug}`}
              className="text-blue-500 hover:underline"
            >
              {cocktail.id}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SecondaryNavbar;
