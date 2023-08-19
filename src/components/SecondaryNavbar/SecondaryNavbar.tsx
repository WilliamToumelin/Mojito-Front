// SecondaryNavbar.tsx
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

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
  const [animate, setAnimate] = useState(true);
  const url = useParams();

  useEffect(() => {
    setAnimate(false);
  }, [url]);

  return (
    <div
      className={`absolute top-26 left-0 bg-black text-white min-h-[40vh] shadow-purple-700 shadow-lg hidden lg:block w-56 ${animate}`}
    >
      <h3 className="text-lg font-semibold mb-2 p-4">Liste à parcourir</h3>
      <ul className="list-disc pl-6 p-3">
        {filteredCocktails.map((cocktail: Cocktails, key) => (
          <li key={key} className="mb-2">
            <Link
              to={`/cocktail/${cocktail.slug}`}
              className="text-blue-500 hover:underline"
            >
              {cocktail.slug}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SecondaryNavbar;
