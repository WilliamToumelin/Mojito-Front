/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { FieldValues, useForm, useFieldArray } from 'react-hook-form';
import { FaTrashAlt } from 'react-icons/fa';
import { AiFillPlusCircle } from 'react-icons/ai';
import Cookies from 'js-cookie';
import { DataCocktailSubmit } from '../../types/types';
import RadioAdd from './RadioAdd';
import SquaredButton from '../../components/common/buttons/SquaredButton';
import ListManager from './ListManager';

const CocktailSubmit: React.FC = () => {
  const { register, unregister, handleSubmit, watch, control } = useForm();
  const [ingredientsList, setIngredientsList] =
    useState<DataCocktailSubmit | null>(null);
  const techniques = watch('Techniques');
  const ices = watch('Glaces');
  const glass = watch('Verres');
  const authToken = Cookies.get('authToken');
  const userToken = Cookies.get('userToken');
  let userId: number | null = null;

  if (userToken) {
    const userTokenObj = JSON.parse(userToken);
    userId = userTokenObj.id;
  }

  useEffect(() => {
    fetch('http://localhost:5174/api/propositions/data')
      // fetch('https://celestin-j-server.eddi.cloud/api/propositions/data')
      .then((response) => response.json())
      .then((data: DataCocktailSubmit) => {
        setIngredientsList(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleCockailSubmit = async (data: FieldValues) => {
    console.log(data, 'coucou');

    const cocktailUses = [];
    const categories = ['alcools', 'aromates', 'softs'];
    for (const category of categories) {
      for (let i = 0; i < 3; i++) {
        const id = `${category}_${i}`;
        const quantity = `${id}_quantity`;

        if (data[id]) {
          cocktailUses.push({
            ingredient: Number(data[id]),
            quantity: Number(data[quantity]),
            // unit: Number(data[unit]),
          });
        }
      }
    }

    console.log(cocktailUses);

    const output = {
      name: data.name,
      description: data.description,
      picture: data.picture,
      difficulty: Number(data.difficulty),
      preparation_time: Number(data.preparation_time),
      alcool: false,
      user: 0,
      glass: Number(data.Verres),
      ice: Number(data.Glaces),
      technical: Number(data.Techniques),
      categories: [] as number[],
      steps: data.steps,
      cocktailUses,
      // unit:
    };

    if (data.alcools_0) {
      output.alcool = true;
    }

    for (let i = 0; i < 3; i += 1) {
      const categoryCheck = data[`alcools_${i}`];
      if (categoryCheck) {
        if (
          categoryCheck === 0 ||
          categoryCheck === 1 ||
          categoryCheck === 2 ||
          categoryCheck === 3
        ) {
          if (!output.categories.includes(categoryCheck)) {
            output.categories.push(categoryCheck);
          }
        } else if (!output.categories.includes(4)) {
          output.categories.push(4);
        }
      }
    }
    if (output.alcool === false && !output.categories.includes(5)) {
      output.categories.push(5);
    }

    for (let i = 0; i < output.steps.length; i += 1) {
      console.log(i);
      output.steps[i].number_step = i;
    }

    console.log(output);

    try {
      const response = await fetch('http://localhost:5174/api/cocktails/add', {
        method: 'POST',
        body: JSON.stringify(output),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
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

  const {
    fields: stepsFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    control,
    name: 'steps',
  });

  const isAddStepButtonDisabled = stepsFields.length >= 10;

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
            <div className="w-full space-y-2 pb-8">
              <div className="text-center text-lg text-light-gray pb-12 space-y-1">
                <p>
                  Bonjour, bienvenue sur notre page de proposition de cocktails,
                  voici quelques <span className="text-dark-brown">règles</span>{' '}
                  pour que tout se passe bien :
                </p>
                <p>
                  - Il est <span className="text-dark-brown">obligatoire</span>{' '}
                  de choisir au moins un soft ou un alcool
                </p>
                <p>
                  - Tout les autres champs sont{' '}
                  <span className="text-dark-brown">obligatoires</span>{' '}
                </p>
                <p>
                  - Vous avez un{' '}
                  <span className="text-dark-brown">maximum de 10 étapes</span>{' '}
                  pour expliquer la confection de votre création
                </p>
                <p>
                  - La validation de votre cocktail est à{' '}
                  <span className="text-dark-brown">
                    l&apos;appréciation de la modération
                  </span>{' '}
                </p>
                <p>Enjoy !</p>
              </div>
              <label
                htmlFor="name"
                className="text-2xl text-center flex flex-wrap justify-center"
              >
                Le nom de votre Cocktail:
              </label>
              <div className="flex justify-center">
                <input
                  type="text"
                  className="border-xs rounded p-2 w-1/5 bg-light-brown text-dark-gray hover:scale-105 duration-500"
                  {...register(`name`)}
                />
              </div>
            </div>

            {/* Liste pour ajouter les ingredients */}
            <div className="w-full">
              <ul className="flex flex-wrap justify-evenly">
                {ingredientsList?.ingredients?.map((category) => (
                  <ListManager
                    key={category.name}
                    category={category.name}
                    ingredients={category.ingredients}
                    register={register}
                    unregister={unregister}
                  />
                ))}
              </ul>
            </div>

            {/* Liste pour ajouter les verres, techniques, glaces  */}
            <div className="flex flex-wrap justify-evenly py-2 w-full">
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
            {/* Temps de préparation  */}
            <div className="flex flex-wrap justify-evenly py-2 w-full">
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
              {/* Difficulté  */}
              <div className="">
                <h3 className="text-2xl font-medium mb-4 text-center">
                  Difficulté
                </h3>
                <select
                  {...register(`difficulty`)}
                  className="text-light-brown text-base font-bold text-center w-48 h-12 rounded p-2 bg-light-gray border border-light-brown hover:bg-dark-brown hover:text-dark-gray"
                >
                  <option value="">A vous de jouez!</option>
                  <option value="1">Facile</option>
                  <option value="2">Moyen</option>
                  <option value="3">Pour les pros!</option>
                </select>
              </div>
            </div>
          </div>

          {/* ajouter des steps de préparation du cocktail */}
          <div className="flex flex-col items-center py-2">
            <h3 className="text-2xl font-medium mb-4 text-center">
              Les étapes
            </h3>
            <ul className="text-center ">
              {stepsFields.map((item, index) => (
                <li
                  key={item.id}
                  className="border-xs rounded bg-dark-gery text-dark-gray hover:scale-105 duration-500 flex items-center"
                >
                  <div className="p-2">
                    <textarea
                      {...register(`steps.${index}.content`)}
                      className="rounded bg-light-brown text-dark-gray"
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeStep(index)}
                      className="bg-red-900 text-xl p-2 rounded text-white hover:bg-red-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => appendStep({ content: '' })}
              className={`${
                isAddStepButtonDisabled
                  ? 'bg-red-900 text-light-brown cursor-not-allowed '
                  : `text-light-brown bg-light-gray hover:text-dark-gray hover:bg-dark-brown`
              } p-2 rounded text-xl`}
              disabled={isAddStepButtonDisabled}
            >
              <AiFillPlusCircle />
            </button>
          </div>
          <div className="py-2">
            {/* ajouter une description du cocktail */}
            <div className="m-5 text-center">
              <h3 className="text-2xl font-medium mb-2">Description</h3>
              <textarea
                {...register('description')}
                className="border-xs rounded p-2 w-1/2 bg-light-brown text-dark-gray hover:scale-105 duration-500"
                rows={3}
              />
            </div>
            {/* ajouter une photo du cocktail */}
            <div className="m-5 text-center py-2">
              <h3 className="text-2xl font-medium mb-4 text-center">
                La photo du cocktail
              </h3>
              <input
                {...register('picture')}
                className="border-xs rounded p-2 w-1/2 bg-light-brown text-dark-gray hover:scale-105 duration-500"
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
