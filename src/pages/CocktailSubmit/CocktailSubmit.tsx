/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import ItemRemove from './ItemRemove';
import ListAdd from './ListAdd';
import {
  Ingredients,
  Technicals,
  Ices,
  Glasses,
  Units,
} from '../../types/types';

const CocktailSubmit: React.FC = () => {
  const [ingredientsList, setIngredientsList] = useState<string[]>([]);
  const [selectedAlcohols, setSelectedAlcohols] = useState<string[]>([]);
  const [selectedSofts, setSelectedSofts] = useState<string[]>([]);
  const [selectedAromatics, setSelectedAromatics] = useState<string[]>([]);
  const [selectedGlasses, setSelectedGlasses] = useState<string[]>([]);
  const [selectedIces, setSelectedIces] = useState<string[]>([]);
  const [selectedTechnicals, setSelectedTechnicals] = useState<string[]>([]);
  const [selectedUnits, setSelectedUnits] = useState<string[]>([]);

  const [alcohol, setAlcohol] = useState<string>('');
  const [soft, setSoft] = useState<string>('');
  const [aromatic, setAromatic] = useState<string>('');
  const [glass, setGlass] = useState<string>('');
  const [ice, setIce] = useState<string>('');
  const [technicals, setTechnicals] = useState<string>('');
  const [unit, setUnit] = useState<string>('');

  const [alcoholAmount, setAlcoholAmount] = useState<number>(1);
  const [softAmount, setSoftAmount] = useState<number>(1);

  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    const ingredientsByCategory: {
      categoryName: string;
      ingredients: string[];
    }[] = [];
    fetch('http://localhost:5174/api/typeingredients/ingredients')
      .then((response) => response.json())
      .then((data: Ingredients[]) => {
        data.forEach((item) => {
          const categoryName = item.name;
          const categoryIngredients = item.ingredients.map(
            (ingredient: { name: string }) => ingredient.name
          );
          ingredientsByCategory.push({
            categoryName,
            ingredients: categoryIngredients,
          });
        });
        console.log(ingredientsByCategory);
      })
      .catch((err) => console.error(err));

    fetch('http://localhost:5174/api/technicals')
      .then((response) => response.json())
      .then((data: Technicals[]) => {
        const technicalNames = data.map((technical) => technical.name);
        setSelectedTechnicals(technicalNames);
      })
      .catch((err) => console.error(err));

    fetch('http://localhost:5174/api/ices')
      .then((response) => response.json())
      .then((data: Ices[]) => {
        const iceNames = data.map((iceItem) => iceItem.name);
        setSelectedIces(iceNames);
      })
      .catch((err) => console.error(err));

    fetch('http://localhost:5174/api/glass')
      .then((response) => response.json())
      .then((data: Glasses[]) => {
        const glassNames = data.map((glassItem) => glassItem.name);
        setSelectedGlasses(glassNames);
      })
      .catch((err) => console.error(err));

    fetch('http://localhost:5174/api/units')
      .then((response) => response.json())
      .then((data: Units[]) => {
        const unitNames = data.map((unitItem) => unitItem.name);
        setSelectedUnits(unitNames);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleAlcoholAdd = () => {
    if (alcohol && alcoholAmount > 0) {
      setSelectedAlcohols([
        ...selectedAlcohols,
        `${alcohol} (${alcoholAmount} cl)`,
      ]);
      setAlcohol('');
      setAlcoholAmount(1);
    }
  };

  const handleSoftAdd = () => {
    if (soft && softAmount > 0) {
      setSelectedSofts([...selectedSofts, `${soft} (${softAmount} cl)`]);
      setSoft('');
      setSoftAmount(1);
    }
  };

  const handleAromaticAdd = () => {
    if (aromatic !== '') {
      setSelectedAromatics([...selectedAromatics, `${aromatic}`]);
      setAromatic('');
    }
  };

  const handleAlcoholRemove = (index: number) => {
    const updatedAlcohols = [...selectedAlcohols];
    updatedAlcohols.splice(index, 1);
    setSelectedAlcohols(updatedAlcohols);
  };

  const handleSoftRemove = (index: number) => {
    const updatedSofts = [...selectedSofts];
    updatedSofts.splice(index, 1);
    setSelectedSofts(updatedSofts);
  };

  const handleAromaticRemove = (index: number) => {
    const updatedAromatics = [...selectedAromatics];
    updatedAromatics.splice(index, 1);
    setSelectedAromatics(updatedAromatics);
  };

  const handleSubmit = async () => {
    const cocktailSubmitData = {
      alcohols: selectedAlcohols,
      softs: selectedSofts,
      aromatics: selectedAromatics,
      glass,
      ice,
      technicals,
      unit,
      description,
    };

    try {
      const response = await fetch('API post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cocktailSubmitData),
      });

      if (response.ok) {
        console.log('Cocktail submitted successfully!');
      } else {
        console.error('Failed to submit cocktail.');
      }
    } catch (error) {
      console.error('An error occurred while submitting cocktail:', error);
    }
  };

  return (
    <div className="bg-black flex justify-center items-center flex-1 h-[75vh]">
      <div className="relative w-4/5 lg:w-3/5 h-4/5 max-h-4/5 flex flex-col overflow-y-auto over shadow-purple-700 shadow-2xl rounded-2xl bg-black text-white">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Proposer un Cocktail
        </h2>
        <div className="py-6 px-12 flex">
          <div className="inline-block w-3/5 pr-4">
            <ListAdd
              title="Alcools"
              itemsList={ingredientsList}
              itemValue={alcohol}
              setItemValue={setAlcohol}
              amount={alcoholAmount}
              setAmount={setAlcoholAmount}
              handleAdd={handleAlcoholAdd}
            />
            <ListAdd
              title="Softs"
              itemsList={selectedSofts}
              itemValue={soft}
              setItemValue={setSoft}
              amount={softAmount}
              setAmount={setSoftAmount}
              handleAdd={handleSoftAdd}
            />
            {/* <ListAdd
              title="Aromates"
              itemsList={selectedAromatics}
              itemValue={aromatic}
              setItemValue={setAromatic}
              handleAdd={handleAromaticAdd}
              amount={0}
              setAmount={function (): void {
                throw new Error('Function not implemented.');
              }}
            />
            <ListAdd
              title="Verre"
              itemsList={selectedGlasses}
              itemValue={glass}
              setItemValue={setGlass}
              amount={0}
              setAmount={function (): void {
                throw new Error('Function not implemented.');
              }}
              handleAdd={function (): void {
                throw new Error('Function not implemented.');
              }}
            /> */}
            {/* <div className="mb-4">
              <h3 className="text-lg font-medium mb-4">Technique</h3>
              <div className="flex items-center gap-4">
                {technicals.map((technicalsOption, index) => (
                  <label key={index} className="flex items-center">
                    <span className="mr-3">{technicalsOption}</span>
                    <div
                      className={`w-8 h-8 rounded-full border-gray-400 border-4 flex items-center justify-center ${
                        technicals === technicalsOption
                          ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-black border-none'
                          : ''
                      }`}
                    >
                      {technicals === technicalsOption && (
                        <BsFillCheckCircleFill size={24} />
                      )}
                    </div>
                    <input
                      type="radio"
                      value={technicalsOption}
                      checked={technicals === technicalsOption}
                      onChange={(e) => setTechnicals(e.target.value)}
                      className="sr-only"
                    />
                  </label>
                ))}
              </div>
            </div> */}
          </div>

          <div className="flex w-2/5 h-full">
            <ItemRemove
              items={selectedAlcohols}
              onRemove={handleAlcoholRemove}
            />
            <ItemRemove items={selectedSofts} onRemove={handleSoftRemove} />
            <ItemRemove
              items={selectedAromatics}
              onRemove={handleAromaticRemove}
            />
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
              onClick={handleSubmit}
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
