import React, { useState } from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { Ingredient } from '../../types/types';

interface Props {
  category: string;
  ingredients: Ingredient[];
  register: UseFormRegister<FieldValues>;
}

const ListAdd: React.FC<Props> = ({ category, ingredients, register }) => {
  const [selectCount, setSelectCount] = useState(1);

  const addSelect = () => {
    setSelectCount(selectCount + 1);
  };

  return (
    <div key={category}>
      <h3 className="text-xl">{category}</h3>
      {Array.from({ length: selectCount }).map((_, index) => (
        <div key={index} className="flex">
          <select
            {...register(`${category}_${index}`)} // index unique pour chaque sélecteur
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
          <div className="w-1/6 text-center">
            <button
              type="button"
              onClick={addSelect} // +1 sélecteur
              className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-400 hover:to-orange-400 text-white p-2 rounded text-xl"
            >
              <BsFillCheckCircleFill />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListAdd;
