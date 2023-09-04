/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { IngredientsData } from '../../types/types';
import ListManager from './ListManager';
import RadioAdd from './RadioAdd';
import SquaredButton from '../../components/common/buttons/SquaredButton';

const CocktailSubmit: React.FC = () => {
  const { register, handleSubmit, watch, reset } = useForm();
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

  const handleCockailSubmit = async (data: FieldValues) => {
    try {
      const ingredientsData: IngredientsData = {
        ingredients: data.ingredients,
        glass: data.Verres,
        ices: data.Glaces,
        technicals: data.Techniques,
      };

      const response = await fetch('http://localhost:5174/api/cocktails/add', {
        method: 'POST',
        body: JSON.stringify(ingredientsData),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const { token } = await response.json();
        //  Stocker le token JWT dans le local storage
        localStorage.setItem('authToken', token);
        reset();
      } else {
        console.error('Erreur lors de la soumission du commentaire');
      }
    } catch (error) {
      console.error('Erreur inattendue', error);
    }
  };

  return (
    <div className="bg-light-brown flex justify-center items-center flex-1 h-[75vh] text-dark-brown">
      <div
        style={{
          boxShadow: '#132226 0px 1px 22px',
        }}
        className="relative w-4/5 lg:w-4/6 h-4/5 lg:max-h-4/5 flex flex-col overflow-y-auto shadow-light-gray shadow-xl rounded-2xl bg-dark-gray"
      >
        <h1 className="text-dark-brown text-5xl pt-8 pb-4 text-center">
          Proposer un Cocktail
        </h1>
        <form
          onSubmit={handleSubmit(handleCockailSubmit)}
          className="animate-fade-in-down"
        >
          <div className="py-6 px-12">
            <div className="w-full pb-6">
              <ul className="flex flex-wrap justify-center">
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
            <div className="flex flex-wrap justify-evenly pt-8 w-full">
              <div className="p-3">
                <h3 className="text-2xl font-medium mb-4 text-center">
                  Verres
                </h3>
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
              <div className="p-3">
                <h3 className="text-2xl font-medium mb-4 text-center">
                  Glaces
                </h3>
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
              <div className="p-3">
                <h3 className="text-2xl font-medium mb-4 text-center">
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
                className="border-xs rounded p-1 w-1/2 bg-[#b3a8a0] text-dark-gray hover:scale-105 duration-500"
                rows={3}
              />
            </div>
            <div className="flex justify-center py-2">
              <SquaredButton
                name="Soumettre le cocktail"
                type="submit"
                height={3}
                width={12}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CocktailSubmit;
