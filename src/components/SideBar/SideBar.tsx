/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import { Cocktails } from '../../types/types';

type Props = {
  filteredCocktails: Cocktails[];
};

const SideBar: React.FC<Props> = ({ filteredCocktails }) => {
  return (
    <div className="absolute top-24 lg:block w-56 z-10 left-0">
      <div className="flex flex-col gap-1">
        {filteredCocktails.map((cocktail: Cocktails) => (
          <NavLink
            to={`/cocktail/${cocktail.slug}`}
            className="menu-link"
            key={cocktail.id}
          >
            {/* <GradientButtonRectangle
              name={cocktail.name}
              onClick={() => handleSelectCocktail()}
            /> */}
            <div className="menu-link w-52 h-8 flex justify-center items-center rounded-r-lg bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-400 hover:to-orange-400 border-white transition-transform duration-400 ease-out hover:scale-125">
              <span className="text-white font-bold text-base">
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
