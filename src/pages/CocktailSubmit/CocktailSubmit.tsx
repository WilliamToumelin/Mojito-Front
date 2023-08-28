/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { IngredientsData } from '../../types/types';
import ListAdd from './ListAdd';
import RadioAdd from './RadioAdd';

const CocktailSubmit: React.FC = () => {
  const [ingredientsList, setIngredientsList] =
    useState<IngredientsData | null>(null);
  const [amounts, setAmounts] = useState<{ [key: string]: number }>({
    alcools: 1,
    softs: 1,
  });
  const [selectedAlcohols, setSelectedAlcohols] = useState<
    { name: string; quantity: number }[]
  >([]);
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

  const handleAlcoholChange = (selectedAlcoholName: string) => {
    if (selectedAlcoholName) {
      setSelectedAlcohols((prevSelectedAlcohols) => [
        ...prevSelectedAlcohols,
        { name: selectedAlcoholName, quantity: amounts.alcools },
      ]);
    }
  };

  const handleAlcoholRemove = (name: string) => {
    setSelectedAlcohols((prevSelectedAlcohols) =>
      prevSelectedAlcohols.filter((item) => item.name !== name)
    );
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
              {ingredientsList?.ingredients?.map((category) => (
                <ListAdd
                  key={category.name}
                  category={category.name}
                  amounts={amounts}
                  handleAmountChange={handleAmountChange}
                  handleChange={handleAlcoholChange}
                  selected={selectedAlcohols}
                  ingredients={[]}
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
                onSelect={(value) => setGlass(value)}
              />
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-4">Glaces</h3>
              <RadioAdd
                options={
                  ingredientsList?.ices?.map((icesOption) => icesOption.name) ||
                  []
                }
                selected={ices}
                onSelect={(value) => setIces(value)}
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
                onSelect={(value) => setTechniques(value)}
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
