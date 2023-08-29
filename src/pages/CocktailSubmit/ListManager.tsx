import React, { useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { FaTrashAlt } from 'react-icons/fa';
import { Ingredient } from '../../types/types';

interface Props {
  category: string;
  ingredients: Ingredient[];
  register: UseFormRegister<FieldValues>;
}

const ListManager: React.FC<Props> = ({ category, ingredients, register }) => {
  const [selectCount, setSelectCount] = useState(1);

  const addSelect = () => {
    if (selectCount < 3) {
      setSelectCount(selectCount + 1);
    }
  };

  const onRemove = () => {
    if (selectCount > 1) {
      setSelectCount(selectCount - 1);
    }
  };

  return (
    <div className="block gap-2">
      <h3 className="text-xl text-center">{category}</h3>
      <div key={category} className="flex justify-center p-3">
        {/* création d'un tableau d'un longueur max de selectCount, dans le map avec _ on ignore l'élément actuel, on a besoin que de l'index */}
        {Array.from({ length: selectCount }).map((_, index) => (
          <div key={index} className="flex p-2">
            <select
              {...register(`${category}_${index}`)}
              className="max-w-lg border rounded p-1 text-white text-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-400 hover:to-orange-400"
            >
              <option className="text-black" value="">
                A vous de jouer !
              </option>
              {ingredients.map((ingredient) => (
                <option
                  className="text-black"
                  key={ingredient.id}
                  value={ingredient.name}
                >
                  {ingredient.name}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <div className="p-2">
          <button
            type="button"
            onClick={addSelect}
            className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-400 hover:to-orange-400 text-white p-2 rounded text-xl"
          >
            <AiFillPlusCircle />
          </button>
        </div>

        {selectCount > 1 && (
          <div className="">
            <button
              type="button"
              onClick={onRemove}
              className="bg-red-700 text-white text-xl p-2 rounded"
            >
              <FaTrashAlt />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListManager;
