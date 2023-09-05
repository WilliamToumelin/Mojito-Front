/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { IngredientsData } from '../../types/types';
import ListManager from './ListManager';
import RadioAdd from './RadioAdd';
import SquaredButton from '../../components/common/buttons/SquaredButton';
import StepsAdd from './StepsAdd';

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
      const input: IngredientsData = {
        ingredients: data.ingredients,
        glass: data.Verres,
        ices: data.Glaces,
        technicals: data.Techniques,
        alcool: '',
        steps: [],
      };
      console.log(input);

      if (data.alcools_0 !== '') {
        input.alcool = 'true';
        console.log(data.alcools_0);
        console.log(input.alcool);
      }
      // const output = {
      //   name: input.name,
      //   description: input.description,
      //   picture: 'aaaa',
      //   difficulty: input.difficulty,
      //   preparation_time: 15,
      //   alcool: input.alcool,
      //   user: 'user.token',
      //   glass: input.Verres,
      //   ice: input.Glaces,
      //   technical: input.Techniques,
      //   cocktailUses: [
      //     {
      //       quantity: input.alcools_0_quantity,
      //       unit: 'cl',
      //       ingredient: input.alcools_0,
      //     },
      //     {
      //       quantity: input.aromates_0_quantity,
      //       unit: 'cl',
      //       ingredient: input.aromates_0,
      //     },
      //   ],
      // };

      const response = await fetch('http://localhost:5174/api/cocktails/add', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(data);
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
                    ingredientsList?.glass?.map((glassOption) => ({
                      id: glassOption.id,
                      name: glassOption.name,
                    })) || []
                  }
                  selected={glass}
                  register={register}
                  name="Verres"
                  id={0}
                />
              </div>
              <div className="p-3">
                <h3 className="text-2xl font-medium mb-4 text-center">
                  Glaces
                </h3>
                <RadioAdd
                  options={
                    ingredientsList?.ices?.map((icesOption) => ({
                      id: icesOption.id,
                      name: icesOption.name,
                    })) || []
                  }
                  selected={ices}
                  register={register}
                  name="Glaces"
                  id={0}
                />
              </div>
              <div className="p-3">
                <h3 className="text-2xl font-medium mb-4 text-center">
                  Techniques
                </h3>
                <RadioAdd
                  options={
                    ingredientsList?.technicals?.map((techniqueOption) => ({
                      id: techniqueOption.id,
                      name: techniqueOption.name,
                    })) || []
                  }
                  selected={techniques}
                  register={register}
                  name="Techniques"
                  id={0}
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-evenly pt-8 w-full">
              <div className="block justify-center">
                <h3 className="text-2xl font-medium mb-4 text-center">
                  Temps de préparation
                </h3>
                <div className="flex justify-center items-center">
                  <input
                    type="number"
                    {...register(`preparation_time`)}
                    className="text-light-brown text-xl font-bold text-center w-16 h-12 rounded p-2 bg-light-gray border border-light-brown hover:bg-dark-brown hover:text-dark-gray"
                    min="1"
                    max="30"
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
                  <span className="pl-2 text-2xl">min</span>
                </div>
              </div>
              <div className="">
                <h3 className="text-2xl font-medium mb-4 text-center">
                  Difficulté
                </h3>
                <select
                  {...register(`difficulty`)}
                  className="text-light-brown text-base font-bold text-center w-48 h-12 rounded p-2 bg-light-gray border border-light-brown hover:bg-dark-brown hover:text-dark-gray"
                >
                  <option value="">A vous de jouez!</option>
                  <option value="1">Très facile</option>
                  <option value="2">Facile</option>
                  <option value="3">Moyen</option>
                  <option value="4">Dur!</option>
                  <option value="5">Pour les pros!</option>
                </select>
              </div>
            </div>
          </div>
          <StepsAdd register={register} />

          <div>
            <div className="m-5 text-center">
              <h3 className="text-2xl font-medium mb-2">Description</h3>
              <textarea
                {...register('description')}
                className="border-xs rounded p-1 w-1/2 bg-light-brown text-dark-gray hover:scale-105 duration-500"
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
