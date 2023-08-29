/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import { Cocktails } from '../../types/types';

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
            {/* <GradientButtonRectangle
              name={cocktail.name}
              onClick={() => handleSelectCocktail()}
            /> */}
            <div className="menu-link w-52 h-8 flex justify-center items-center rounded-r-lg bg-gradient-to-r from-[#132226] via-[#525B56] to-[#A4978E] hover:bg-gradient-to-r hover:from-[#1e353b] hover:via-[rgb(106, 116, 110);] hover:to-[#b3a8a0] border-white transition-transform duration-400 ease-out hover:scale-125">
              <span className="text-[#BE9063] font-bold text-base">
                {cocktail.name}
              </span>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
