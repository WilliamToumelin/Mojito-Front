import React, { useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { FaTrashAlt } from 'react-icons/fa';
import { Ingredients } from '../../types/types';

interface Props {
  category: string;
  ingredients: Ingredients[];
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
      <div key={category} className="block p-3 space-y-2">
        {Array.from({ length: selectCount }).map((_, index) => (
          <div key={index} className="flex space-x-2">
            <select
              {...register(`${category}_${index}`)}
              className="text-light-brown text-base font-bold text-center w-48 h-12 rounded p-2 bg-light-gray border border-light-brown hover:bg-dark-brown hover:text-dark-gray"
            >
              <option className="" value="">
                A vous de jouer !
              </option>
              {ingredients.map((ingredient) => (
                <option className="" key={ingredient.id} value={ingredient.id}>
                  {ingredient.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              {...register(`${category}_${index}_quantity`)}
              className="text-light-brown text-xl font-bold text-center w-16 h-12 rounded p-2 bg-light-gray border border-light-brown hover:bg-dark-brown hover:text-dark-gray"
              min="1"
              max="99"
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
                if (
                  // on vérifie si e.target est une instance de HTMLInputElement. Obligé car HTMLInputElement est l'élément HTML qui a la propriété 'value'
                  e.target instanceof HTMLInputElement &&
                  e.target.value.length >= 2
                ) {
                  e.preventDefault();
                }
              }}
            />
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
                ? 'bg-red-900 text-light-brown cursor-not-allowed '
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
              className="bg-red-900 text-xl p-2 rounded text-white hover:bg-red-700"
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
