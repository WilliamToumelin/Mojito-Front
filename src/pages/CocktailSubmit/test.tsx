/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { FieldValues, useForm, useFieldArray } from 'react-hook-form';
import { FaTrashAlt } from 'react-icons/fa';
import { AiFillPlusCircle } from 'react-icons/ai';
import { DataCocktailSubmit } from '../../types/types';
import SquaredButton from '../../components/common/buttons/SquaredButton';

const CocktailSubmit: React.FC = () => {
  const { register, handleSubmit, watch, control } = useForm();
  const [ingredientsList, setIngredientsList] =
    useState<DataCocktailSubmit | null>(null);

  useEffect(() => {
    fetch('http://localhost:5174/api/propositions/data')
      .then((response) => response.json())
      .then((data: DataCocktailSubmit) => {
        setIngredientsList(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleCockailSubmit = async (data: FieldValues) => {
    const cocktailUses = data.ingredients.map((ingredient: any) => ({
      ingredient: ingredient.name,
      quantity: parseFloat(ingredient.quantity), // Conversion en float
      unit: 1,
    }));

    const output = {
      name: data.name,
      description: data.description,
      picture: data.picture,
      difficulty: Number(data.difficulty),
      preparation_time: Number(data.preparation_time),
      alcool: false,
      user: 0,
      glass: data.Verres,
      ice: data.Glaces,
      technical: data.Techniques,
      categories: [],
      steps: data.steps,
      cocktailUses,
    };

    console.log(output);

    try {
      const response = await fetch('http://localhost:5174/api/cocktails/add', {
        method: 'POST',
        body: JSON.stringify(output),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(data);
      if (response.ok) {
        console.log('envoi réussi');
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
        <h1 className="text-dark-brown text-5xl pt-8 pb-8 text-center">
          Proposer un Cocktail
        </h1>
        <form
          onSubmit={handleSubmit(handleCockailSubmit)}
          className="animate-fade-in-down"
        >
          <div className="py-6 px-12">
            <div className="w-full space-y-2">
              <label
                htmlFor="name"
                className="text-2xl text-center flex flex-wrap justify-center"
              >
                Le nom de votre Cocktail:
              </label>
              <div className="flex justify-center pb-8">
                <input
                  type="text"
                  className="border-xs rounded p-1 w-1/5 bg-light-brown text-dark-gray hover:scale-105 duration-500"
                  {...register(`name`)}
                />
              </div>
            </div>

            {/* Liste pour ajouter les ingredients */}
            <div className="w-full pb-6">
              <ul className="flex flex-wrap justify-center"></ul>
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
