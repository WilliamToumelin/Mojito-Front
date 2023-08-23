/* eslint-disable no-console */
import React, { useState } from 'react';
import ItemRemove from './ItemRemove';
import ItemAdd from './ItemAdd';

const CocktailSubmit: React.FC = () => {
  const [selectedAlcohols, setSelectedAlcohols] = useState<string[]>([]);
  const [selectedSofts, setSelectedSofts] = useState<string[]>([]);
  const [selectedAromatics, setSelectedAromatics] = useState<string[]>([]);

  const [alcohol, setAlcohol] = useState<string>('');
  const [soft, setSoft] = useState<string>('');
  const [aromatic, setAromatic] = useState<string>('');
  const [technique, setTechnique] = useState<string>('');

  const [alcoholAmount, setAlcoholAmount] = useState<number>(0);
  const [softAmount, setSoftAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>('');

  const alcoholsList = ['Rhum', 'Whisky', 'Gin'];
  const softsList = ['Coca', 'Tonic', "Jus d'orange"];
  const aromaticsList = ['Basilic', 'Menthe', 'Poivre', 'Thym'];
  const techniqueList = ['Shaker', 'Cuillère', 'Assemblage'];

  const handleAlcoholAdd = () => {
    if (alcohol && alcoholAmount > 0) {
      setSelectedAlcohols([
        ...selectedAlcohols,
        `${alcohol} (${alcoholAmount} cl)`,
      ]);
      setAlcohol('');
      setAlcoholAmount(0);
    }
  };

  const handleSoftAdd = () => {
    if (soft && softAmount > 0) {
      setSelectedSofts([...selectedSofts, `${soft} (${softAmount} cl)`]);
      setSoft('');
      setSoftAmount(0);
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
      description,
    };

    try {
      const response = await fetch('YOUR_SYMFONY_API_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cocktailSubmitData),
      });

      if (response.ok) {
        // Handle success, e.g., show a success message
        console.log('Cocktail submitted successfully!');
      } else {
        // Handle error, e.g., show an error message
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
        <div className="p-8 flex">
          <div className="inline-block w-3/5 pr-4">
            <ItemAdd
              title="Alcools"
              itemsList={alcoholsList}
              itemValue={alcohol}
              setItemValue={setAlcohol}
              amount={alcoholAmount}
              setAmount={setAlcoholAmount}
              handleAdd={handleAlcoholAdd}
            />

            <ItemAdd
              title="Softs"
              itemsList={softsList}
              itemValue={soft}
              setItemValue={setSoft}
              amount={softAmount}
              setAmount={setSoftAmount}
              handleAdd={handleSoftAdd}
            />

            <ItemAdd
              title="Aromates"
              itemsList={aromaticsList}
              itemValue={aromatic}
              setItemValue={setAromatic}
              amount={0}
              setAmount={() => {}}
              handleAdd={handleAromaticAdd}
            />

            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Technique</h3>
              <div className="flex">
                {techniqueList.map((techniqueOption, index) => (
                  <label key={index} className="flex items-center gap-2 m-1">
                    <input
                      type="radio"
                      value={techniqueOption}
                      checked={technique === techniqueOption}
                      onChange={(e) => setTechnique(e.target.value)}
                      className="mr-2"
                    />
                    {techniqueOption}
                  </label>
                ))}
              </div>
            </div>
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
              className="border rounded p-1 w-1/2"
              rows={3}
            />
          </div>

          <div className="text-center py-2">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-gradient-to-r from-purple-700 via-pink-500 to-orange-500 text-white py-2 rounded-lg"
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
