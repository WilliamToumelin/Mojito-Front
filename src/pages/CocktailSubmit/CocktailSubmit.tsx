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
  const description = watch('description');

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
    <div className="bg-white flex justify-center items-center flex-1 h-[75vh]">
      <div
        style={{
          boxShadow: 'rgba(0, 0, 0, 0.08) 0px 4px 12px',
        }}
        className="relative w-4/5 lg:w-3/5 h-4/5 max-h-4/5 flex flex-col overflow-y-auto over shadow-purple-700 shadow-xl rounded-2xl bg-white"
      >
        <h2 className="text-3xl font-bold my-8 text-center">
          Proposer un Cocktail
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-6 px-12 flex">
            <div className="w-1/2 pr-4">
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
            </div>
            <div className="flex flex-wrap justify-center pt-5 w-1/2">
              <div className="">
                <h3 className="text-lg font-medium mb-4 text-center">Verres</h3>
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
              <div className="">
                <h3 className="text-lg font-medium mb-4 text-center">Glaces</h3>
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
              <div className="">
                <h3 className="text-lg font-medium mb-4 text-center">
                  Techniques
                </h3>
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
          </div>
          <div>
            <div className="mb-4 text-center">
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <textarea
                {...register('description')}
                className="border-xs rounded p-1 w-1/2"
                rows={3}
              />
            </div>
            <div className="text-center py-2">
              <button
                type="submit"
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
