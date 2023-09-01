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

  const isAddButtonDisabled = selectCount >= 3;

  return (
    <div className="p-2">
      <h3 className="text-2xl text-center">{category}</h3>
      <div key={category} className="block p-3">
        {/* création d'un tableau d'un longueur max de selectCount, dans le map avec _ on ignore l'élément actuel, on a besoin que de l'index */}
        {Array.from({ length: selectCount }).map((_, index) => (
          <div key={index} className="flex p-2">
            <select
              {...register(`${category}_${index}`)}
              className="text-light-brown text-base font-bold text-center w-48 h-12 rounded p-2 bg-light-gray border border-light-brown hover:bg-dark-brown hover:text-dark-gray"
            >
              <option className="" value="">
                A vous de jouer !
              </option>
              {ingredients.map((ingredient) => (
                <option
                  className=""
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
            className={`${
              isAddButtonDisabled
                ? 'bg-red-900 text-light-brown cursor-not-allowed'
                : `text-light-brown bg-light-gray hover:text-dark-gray hover:bg-dark-brown`
            } p-2 rounded text-xl`}
            disabled={isAddButtonDisabled}
          >
            <AiFillPlusCircle />
          </button>
        </div>

        {selectCount > 1 && (
          <div className="">
            <button
              type="button"
              onClick={onRemove}
              className="bg-red-900 text-xl p-2 rounded text-white"
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
