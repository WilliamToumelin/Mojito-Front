/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IngredientsData } from '../../types/types';
import ListManager from './ListManager';
import RadioAdd from './RadioAdd';

const CocktailSubmit: React.FC = () => {
  const { register, handleSubmit, watch } = useForm();
  const [ingredientsList, setIngredientsList] =
    useState<IngredientsData | null>(null);
  const techniques = watch('Techniques');
  const ices = watch('Glaces');
  const glass = watch('Verres');

  useEffect(() => {
    fetch('http://localhost:5174/api/propositions/data')
      .then((response) => response.json())
      .then((data: IngredientsData) => {
        setIngredientsList(data);
      })
      .catch((err) => console.error(err));
  }, []);
  console.log(ingredientsList);

  const onSubmit = (data: any) => console.log(data);

  return (
    <div className="bg-black flex justify-center items-center flex-1 h-[75vh]">
      <div className="relative w-4/5 lg:w-3/5 h-4/5 max-h-4/5 flex flex-col overflow-y-auto over shadow-purple-700 shadow-2xl rounded-2xl bg-black text-white">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Proposer un Cocktail
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-6 px-12 flex">
            <div className="inline-block w-3/5 pr-4">
              <ul>
                {ingredientsList?.ingredients?.map((category) => (
                  <ListManager
                    key={category.name}
                    category={category.name}
                    ingredients={category.ingredients}
                    register={register}
                  />
                ))}
              </ul>
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-4">Verres</h3>
                <RadioAdd
                  options={
                    ingredientsList?.glass?.map(
                      (glassOption) => glassOption.name
                    ) || []
                  }
                  selected={glass}
                  register={register}
                  name="Verres"
                />
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-4">Glaces</h3>
                <RadioAdd
                  options={
                    ingredientsList?.ices?.map(
                      (icesOption) => icesOption.name
                    ) || []
                  }
                  selected={ices}
                  register={register}
                  name="Glaces"
                />
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-4">Techniques</h3>
                <RadioAdd
                  options={
                    ingredientsList?.technicals?.map(
                      (techniqueOption) => techniqueOption.name
                    ) || []
                  }
                  selected={techniques}
                  register={register}
                  name="Techniques"
                />
              </div>
            </div>

            <div className="flex w-2/5 h-full">
              {/* <ItemRemove
                items={selectedAlcohols}
                onRemove={handleAlcoholRemove}
              /> */}
            </div>
          </div>
          <div>
            <div className="mb-4 text-center">
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <textarea
                // onChange={(e) => setDescription(e.target.value)}
                className="border-xs rounded p-1 w-1/2 bg-gray-800"
                rows={3}
              />
            </div>
            <div className="text-center py-2">
              <button
                type="submit"
                // onClick={handleSubmit}
                className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-400 hover:to-orange-400 text-white p-2 rounded-lg"
              >
                Soumettre le Cocktail
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CocktailSubmit;
