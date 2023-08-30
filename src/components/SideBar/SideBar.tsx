/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import { Cocktails } from '../../types/types';
import GradiantButton from '../common/buttons/GradiantButton';

type Props = {
  filteredCocktails: Cocktails[];
  selectedCocktail: number | null;
  setSelectedCocktail: (id: number | null) => void;
};

const SideBar: React.FC<Props> = ({
  filteredCocktails,
  setSelectedCocktail,
}) => {
  const handleSelectCocktail = (cocktailId: number) => {
    setSelectedCocktail(cocktailId);
    localStorage.setItem('selectedCocktail', cocktailId.toString());
  };

  return (
    <div className="hidden absolute top-24 lg:block w-56 z-10 left-0">
      <div className="flex flex-col gap-1">
        {filteredCocktails.map((cocktail: Cocktails) => (
          <NavLink
            to={`/cocktail/${cocktail.slug}`}
            className="menu-link"
            key={cocktail.id}
            onClick={() => handleSelectCocktail(cocktail.id)}
          >
            <GradiantButton name={cocktail.name} height={30} width={208} />
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
