/* eslint-disable no-restricted-globals */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { FieldValues, useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { AiFillPlusCircle } from 'react-icons/ai';
import Cookies from 'js-cookie';
import { DataCocktailSubmit } from '../../types/types';
import RadioAdd from './RadioAdd';
import SquaredButton from '../../components/common/buttons/SquaredButton';
import ListManager from './ListManager';
import { apiHostName } from '../../env-config';
import { useAuth } from '../../contexts/AuthProvider';

const CocktailSubmit: React.FC = () => {
  const { register, unregister, handleSubmit, watch, control } = useForm();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
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
    // If the user isn't logged in, redirect him to page 403
    if (!isLoggedIn) {
      navigate('/Page403');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    fetch(`${apiHostName}/api/propositions/data`)
      .then((response) => response.json())
      .then((data: DataCocktailSubmit) => {
        setIngredientsList(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleCockailSubmit = async (data: FieldValues) => {
    const cocktailUses = [];
    const categories = ['alcools', 'aromates', 'softs'];
    for (const category of categories) {
      for (let i = 0; i < 3; i++) {
        const id = `${category}_${i}`;
        const quantity = `${id}_quantity`;
        const unit = `${id}_unit`;

        if (data[id]) {
          const parsedUnit = Number(data[unit]);

          const cocktailUse: {
            ingredient: number;
            quantity: number;
            unit?: number;
          } = {
            ingredient: Number(data[id]),
            quantity: Number(data[quantity]),
          };

          if (!Number.isNaN(parsedUnit)) {
            cocktailUse.unit = parsedUnit;
          } else cocktailUse.unit = 1;
          cocktailUses.push(cocktailUse);
        }
      }
    }

    const output = {
      name: data.name,
      description: data.description,
      picture: data.picture,
      difficulty: Number(data.difficulty),
      preparation_time: Number(data.preparation_time),
      alcool: false,
      user: userId,
      glass: Number(data.Verres),
      ice: Number(data.Glaces),
      technical: Number(data.Techniques),
      categories: [] as number[],
      steps: data.steps,
      cocktailUses,
    };

    if (data.alcools_0) {
      output.alcool = true;
    }

    let isOneToFour = false;
    for (let i = 0; i < 3; i += 1) {
      const categoryCheck = parseInt(data[`alcools_${i}`], 10);
      if (!isNaN(categoryCheck)) {
        if ([1, 2, 3, 4].includes(categoryCheck)) {
          isOneToFour = true;
          output.categories.push(categoryCheck);
        }
      }
    }

    if (!isOneToFour && !output.categories.includes(5)) {
      output.categories.push(5);
    }

    if (output.alcool === false && !output.categories.includes(6)) {
      output.categories.push(6);
    }

    for (let i = 0; i < output.steps.length; i += 1) {
      output.steps[i].number_step = i;
    }

    try {
      const response = await fetch(`${apiHostName}/api/cocktails/add`, {
        method: 'POST',
        body: JSON.stringify(output),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        setSuccessMessage(
          "Votre proposition de cocktail est bien soumis, l'équipe Mojit'O vous remercie et va examiner votre proposition. Vous allez être redirigirer vers la page d'acceuil."
        );
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setErrorMessage('Erreur lors de la soumission de votre recette');
      }
    } catch (error) {
      setErrorMessage('Erreur inattendue');
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

  if (successMessage) {
    return (
      <div className="bg-light-brown flex justify-center items-center flex-1 h-[75vh] text-dark-brown">
        <div
          style={{
            boxShadow: '#132226 0px 1px 22px',
          }}
          className="relative w-4/5 lg:w-4/6 h-4/5 lg:max-h-4/5 flex flex-col items-center overflow-y-auto shadow-light-gray shadow-xl rounded-2xl bg-dark-gray"
        >
          <p className="text-center text-green-600">{successMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light-brown flex justify-center items-center flex-1 h-[75vh] text-dark-brown">
      <div
        style={{
          boxShadow: '#132226 0px 1px 22px',
        }}
        className="relative w-[90%] xl:w-4/6 h-[90%] xl:h-4/5 flex flex-col overflow-y-auto shadow-light-gray shadow-xl rounded-2xl pb-3 bg-dark-gray z-20"
      >
        <h1 className="text-dark-brown text-5xl pt-8 pb-8 text-center">
          Proposer un Cocktail
        </h1>
        <form
          onSubmit={handleSubmit(handleCockailSubmit)}
          className="animate-fade-in-down"
        >
          <div className="py-6 px-3 md:px-12">
            <div className="w-full space-y-2 pb-8">
              <div className="text-center text-lg text-light-gray pb-12 space-y-1">
                <p>
                  Bonjour, bienvenue sur notre page de proposition de cocktails,
                  voici quelques{' '}
                  <span className="text-light-brown">règles</span> pour que tout
                  se passe bien :
                </p>
                <div className="w-full md:w-1/2 text-left m-auto pt-3">
                  <p>
                    - Il est{' '}
                    <span className="text-light-brown">obligatoire</span> de
                    choisir au moins un{' '}
                    <span className="text-light-brown">soft</span> ou un{' '}
                    <span className="text-light-brown">alcool</span>.
                  </p>
                  <p>
                    - Tout les autres champs sont{' '}
                    <span className="text-light-brown">obligatoires</span>.
                  </p>
                  <p>
                    - Vous avez un{' '}
                    <span className="text-light-brown">
                      maximum de 10 étapes
                    </span>{' '}
                    pour expliquer la confection de votre création.{' '}
                    <span className="text-light-brown">
                      Dont une est obligatoire
                    </span>
                    .
                  </p>
                  <p>
                    - La validation de votre cocktail est à{' '}
                    <span className="text-light-brown">
                      l&apos;appréciation de la modération
                    </span>
                    .
                  </p>
                </div>
                <p className="text-dark-brown text-xl pt-3">Enjoy !</p>
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
                  className="border-xs rounded p-2 w-2/3 md:w-2/5 bg-light-brown text-dark-gray hover:scale-105 duration-500"
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
                    units={ingredientsList.units}
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
            <div className="flex flex-wrap justify-evenly py-2 w-full items-center">
              <div className="block align-center ">
                <h3 className="text-2xl font-medium text-center">
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
              <div className="block align-center mt-2">
                <h3 className="text-2xl font-medium text-center">Difficulté</h3>
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
            <ul className="w-4/5 text-center flex flex-wrap justify-center">
              {stepsFields.map((item, index) => (
                <li
                  key={item.id}
                  className="border-xs rounded bg-dark-gery text-dark-gray hover:scale-105 duration-500 flex items-center"
                >
                  <div className="p-2 flex items-center">
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
              <h4 className="text-red-200 text-base">
                La description doit contenir entre 30 et 150 caractères
              </h4>
              <textarea
                {...register('description')}
                className="border-xs rounded p-2 w-4/5 md:w-1/2 bg-light-brown text-dark-gray hover:scale-105 duration-500"
                rows={3}
              />
            </div>
            {/* ajouter une photo du cocktail */}
            <div className="m-5 text-center py-2">
              <h3 className="text-2xl font-medium mb-4 text-center">
                La photo du cocktail
              </h3>
              <h4 className="text-red-200 text-base">
                La photo doit etre en format URL
              </h4>
              <input
                {...register('picture')}
                className="border-xs rounded p-2 w-4/5 md:w-1/2 bg-light-brown text-dark-gray hover:scale-105 duration-500"
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
            {errorMessage && (
              <p className="text-center text-red-900">{errorMessage}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CocktailSubmit;
