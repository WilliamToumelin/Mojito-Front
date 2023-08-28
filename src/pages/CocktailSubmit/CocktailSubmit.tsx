/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import ItemRemove from './ItemRemove';
import { IngredientsData } from '../../types/types';

const CocktailSubmit: React.FC = () => {
  const [ingredientsList, setIngredientsList] =
    useState<IngredientsData | null>(null);
  const [amounts, setAmounts] = useState<{ [key: string]: number }>({
    alcools: 1,
    softs: 1,
  });
  const [alcool, setAlcool] = useState<string | null>(null);
  const [soft, setSoft] = useState<string | null>(null);
  const [aromate, setAromate] = useState<string | null>(null);
  const [glass, setGlass] = useState<string | null>(null);
  const [ices, setIces] = useState<string | null>(null);
  const [techniques, setTechniques] = useState<string | null>(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetch('http://localhost:5174/api/propositions/data')
      .then((response) => response.json())
      .then((data: IngredientsData) => {
        setIngredientsList(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleAmountChange = (type: string, increment: boolean) => {
    setAmounts((prevAmounts) => {
      const newValue = increment
        ? prevAmounts[type] + 1
        : prevAmounts[type] - 1;
      const newAmount = Math.max(newValue, 1);
      return {
        ...prevAmounts,
        [type]: newAmount,
      };
    });
  };

  return (
    <div className="bg-black flex justify-center items-center flex-1 h-[75vh]">
      <div className="relative w-4/5 lg:w-3/5 h-4/5 max-h-4/5 flex flex-col overflow-y-auto over shadow-purple-700 shadow-2xl rounded-2xl bg-black text-white">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Proposer un Cocktail
        </h2>
        <div className="py-6 px-12 flex">
          <div className="inline-block w-3/5 pr-4">
            <ul>
              {ingredientsList?.ingredients.map((category) => {
                return (
                  <div className="" key={category.name}>
                    <h3 className="text-xl">{category.name}</h3>
                    <div className="flex">
                      <br />
                      <select
                        value=""
                        onChange={() => {}}
                        className="max-w-lg border rounded p-1 text-white text-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-400 hover:to-orange-400"
                      >
                        <option className="text-black" value="">
                          A vous de jouer !
                        </option>
                        {category.ingredients.map((ingredient) => (
                          <option
                            className="text-black"
                            key={ingredient.id}
                            value={ingredient.name}
                          >
                            {ingredient.name}
                          </option>
                        ))}
                      </select>

                      <div
                        className={`flex p-1 pl-4 w-32 text-white text-3xl ${
                          category.name === 'aromates' ||
                          category.name === 'verre'
                            ? 'opacity-0'
                            : ''
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <button
                            type="button"
                            className=""
                            onClick={() =>
                              handleAmountChange(category.name, false)
                            }
                          >
                            <AiOutlineMinusCircle />
                          </button>
                          <div>{amounts[category.name]}</div>
                          <button
                            type="button"
                            className=""
                            onClick={() =>
                              handleAmountChange(category.name, true)
                            }
                          >
                            <AiOutlinePlusCircle />
                          </button>
                        </div>
                      </div>
                      <div className="w-1/6 text-center">
                        <button
                          type="button"
                          // onClick={handleAdd}
                          className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-400 hover:to-orange-400 text-white p-2 rounded text-xl"
                        >
                          <BsFillCheckCircleFill />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </ul>
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-4">Verres</h3>
              <div className="flex items-center gap-4">
                {ingredientsList?.glass.map((glassOption, index) => (
                  <label key={index} className="flex items-center">
                    <span className="mr-3">{glassOption.name}</span>
                    <div
                      className={`w-8 h-8 rounded-full border-gray-400 border-4 flex items-center justify-center ${
                        glass === glassOption.name
                          ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-black border-none'
                          : ''
                      }`}
                    >
                      {glass === glassOption.name && (
                        <BsFillCheckCircleFill size={24} />
                      )}
                    </div>
                    <input
                      type="radio"
                      value={glassOption.name}
                      checked={glass === glassOption.name}
                      onChange={(e) => setGlass(e.target.value)}
                      className="sr-only"
                    />
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-4">Glaces</h3>
              <div className="flex items-center gap-4">
                {ingredientsList?.ices.map((icesOption, index) => (
                  <label key={index} className="flex items-center">
                    <span className="mr-3">{icesOption.name}</span>
                    <div
                      className={`w-8 h-8 rounded-full border-gray-400 border-4 flex items-center justify-center ${
                        ices === icesOption.name
                          ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-black border-none'
                          : ''
                      }`}
                    >
                      {ices === icesOption.name && (
                        <BsFillCheckCircleFill size={24} />
                      )}
                    </div>
                    <input
                      type="radio"
                      value={icesOption.name}
                      checked={ices === icesOption.name}
                      onChange={(e) => setIces(e.target.value)}
                      className="sr-only"
                    />
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-4">Techniques</h3>
              <div className="flex items-center gap-4">
                {ingredientsList?.technicals.map((techniqueOption, index) => (
                  <label key={index} className="flex items-center">
                    <span className="mr-3">{techniqueOption.name}</span>
                    <div
                      className={`w-8 h-8 rounded-full border-gray-400 border-4 flex items-center justify-center ${
                        techniques === techniqueOption.name
                          ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-black border-none'
                          : ''
                      }`}
                    >
                      {techniques === techniqueOption.name && (
                        <BsFillCheckCircleFill size={24} />
                      )}
                    </div>
                    <input
                      type="radio"
                      value={techniqueOption.name}
                      checked={techniques === techniqueOption.name}
                      onChange={(e) => setTechniques(e.target.value)}
                      className="sr-only"
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex w-2/5 h-full">
            {/* <ItemRemove
              items={selectedAlcohols}
              onRemove={handleAlcoholRemove}
            /> */}
            {/* <ItemRemove items={selectedSofts} onRemove={handleSoftRemove} />
            <ItemRemove
              items={selectedAromatics}
              onRemove={handleAromaticRemove}
            /> */}
          </div>
        </div>
        <div>
          <div className="mb-4 text-center">
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-xs rounded p-1 w-1/2 bg-gray-800"
              rows={3}
            />
          </div>
          <div className="text-center py-2">
            <button
              type="button"
              // onClick={handleSubmit}
              className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-400 hover:to-orange-400 text-white p-2 rounded-lg"
            >
              Soumettre le Cocktail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CocktailSubmit;
