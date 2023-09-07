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
      .then((response) => response.json())
      .then((data: DataCocktailSubmit) => {
        setIngredientsList(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleCockailSubmit = async (data: FieldValues) => {
    console.log(data);

    const cocktailUses = [];
    if (data.alcools_0)
      cocktailUses.push({
        id: data.alcools_0,
        quantity: data.alcools_0_quantity,
      });
    if (data.alcools_1)
      cocktailUses.push({
        id: data.alcools_1,
        quantity: data.alcools_1_quantity,
      });
    if (data.alcools_2)
      cocktailUses.push({
        id: data.alcools_2,
        quantity: data.alcools_2_quantity,
      });
    if (data.aromates_0)
      cocktailUses.push({
        id: data.aromates_0,
        quantity: data.aromates_0_quantity,
      });
    if (data.aromates_1)
      cocktailUses.push({
        id: data.aromates_1,
        quantity: data.aromates_1_quantity,
      });
    if (data.aromates_2)
      cocktailUses.push({
        id: data.aromates_2,
        quantity: data.aromates_2_quantity,
      });
    if (data.softs_0)
      cocktailUses.push({ id: data.softs_0, quantity: data.softs_0_quantity });
    if (data.softs_1)
      cocktailUses.push({ id: data.softs_1, quantity: data.softs_1_quantity });
    if (data.softs_2)
      cocktailUses.push({ id: data.softs_2, quantity: data.softs_2_quantity });

    console.log(cocktailUses);

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
  const isAddIngredientButtonDisabled = stepsFields.length >= 3;

  const [selectCount, setSelectCount] = useState(1);

  const appendIngredient = () => {
    setSelectCount((prevstate) => prevstate + 1);
  };
  const removeIngredient = () => {
    if (selectCount > 1) {
      setSelectCount((prevstate) => prevstate - 1);
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
              {/* <ul className="flex flex-wrap justify-center">
                {ingredientsList?.ingredients.map((ingredient, index) => (
                  <div className="p-2" key={ingredient.id}>
                    <h3 className="text-2xl text-center">{ingredient.name}</h3>
                    <div className="block p-3 space-y-2">
                      <div key={index} className="flex space-x-2">
                        <select
                          {...register(`ingredients[${index}].name`)}
                          className="text-light-brown text-base font-bold text-center w-48 h-12 rounded p-2 bg-light-gray border border-light-brown hover:bg-dark-brown hover:text-dark-gray"
                        >
                          <option value="">A vous de jouer !</option>
                          {ingredient.ingredients?.map(
                            (ingredientOption: any, optionIndex: number) => (
                              <option
                                key={ingredientOption.id}
                                value={ingredientOption.id}
                              >
                                {ingredientOption.name}
                              </option>
                            )
                          )}
                        </select>
                        <input
                          type="number"
                          {...register(`ingredients[${index}].quantity`, {
                            setValueAs: (value) => Number(value), // Convertit la valeur en float lors de la soumission
                          })}
                          className="text-light-brown text-xl font-bold text-center w-16 h-12 rounded p-2 bg-light-gray border border-light-brown hover:bg-dark-brown hover:text-dark-gray"
                          min="1"
                          max="99"
                          onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                              e.preventDefault();
                            }
                            if (
                              e.target instanceof HTMLInputElement &&
                              e.target.value.length >= 2
                            ) {
                              e.preventDefault();
                            }
                          }}
                        />
                        <div className="flex items-center justify-center">
                          <div className="">
                            <button
                              type="button"
                              onClick={() => removeIngredient(index)}
                              className="bg-red-900 text-xl p-2 rounded text-white hover:bg-red-700"
                            >
                              <FaTrashAlt />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="">
                        <button
                          type="button"
                          onClick={() =>
                            appendIngredient({ name: '', quantity: '' })
                          }
                          className={`${
                            isAddIngredientButtonDisabled
                              ? 'bg-red-900 text-light-brown cursor-not-allowed '
                              : `text-light-brown bg-light-gray hover:text-dark-gray hover:bg-dark-brown`
                          } p-2 rounded text-xl`}
                          disabled={isAddIngredientButtonDisabled}
                        >
                          <AiFillPlusCircle />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </ul> */}
              <ul>
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
                  <option value="1">Facile</option>
                  <option value="2">Moyen</option>
                  <option value="3">Pour les pros!</option>
                </select>
              </div>
            </div>
          </div>

          {/* ajouter des steps de préparation du cocktail */}
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-medium mb-4 text-center">
              Les étapes
            </h3>
            <ul className="text-center ">
              {stepsFields.map((item, index) => (
                <li
                  key={item.id}
                  className="border-xs rounded bg-dark-gery text-dark-gray hover:scale-105 duration-500 flex items-center my-2"
                >
                  <textarea
                    {...register(`steps.${index}.content`)}
                    className="rounded bg-light-brown text-dark-gray"
                  />
                  <button
                    type="button"
                    onClick={() => removeStep(index)}
                    className="bg-red-900 text-xl p-2 rounded text-white hover:bg-red-700"
                  >
                    <FaTrashAlt />
                  </button>
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
          {/* ajouter une description du cocktail */}
          <div>
            <div className="m-5 text-center">
              <h3 className="text-2xl font-medium mb-2">Description</h3>
              <textarea
                {...register('description')}
                className="border-xs rounded p-1 w-1/2 bg-light-brown text-dark-gray hover:scale-105 duration-500"
                rows={3}
              />
            </div>
            <div className="m-5 text-center">
              <h3 className="text-2xl font-medium mb-4 text-center">
                La photo du cocktail
              </h3>
              <input
                {...register('picture')}
                className="border-xs rounded p-1 w-1/2 bg-light-brown text-dark-gray hover:scale-105 duration-500"
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
