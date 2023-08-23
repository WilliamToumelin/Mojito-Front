/* eslint-disable no-console */
import React, { useState } from 'react';
import { BsPlusCircleFill } from 'react-icons/bs';
import ItemRemove from './ItemRemove';

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
        <div>
          <div className="inline-block w-1/2 p-10 ">
            {/* Alcools */}
            <h3 className="text-lg font-medium">Alcools</h3>
            <div className="flex mb-5">
              <div className="flex items-center space-x-4 h-full">
                <select
                  value={alcohol}
                  onChange={(e) => setAlcohol(e.target.value)}
                  className="max-w-lg border rounded p-1 text-black"
                >
                  <option value="">A vous de jouer !</option>
                  {alcoholsList.map((alcoholOption, index) => (
                    <option key={index} value={alcoholOption}>
                      {alcoholOption}
                    </option>
                  ))}
                </select>
                <label htmlFor="cl" className="">
                  en Cl:
                </label>
                <input
                  type="number"
                  value={alcoholAmount}
                  onChange={(e) =>
                    setAlcoholAmount(parseInt(e.target.value, 10))
                  }
                  className="border rounded p-1 w-16 text-black"
                />
                <button
                  type="button"
                  onClick={handleAlcoholAdd}
                  className="bg-gradient-to-r from-purple-700 via-pink-500 to-orange-500 text-white p-2 rounded ml-auto text-xl"
                >
                  <BsPlusCircleFill />
                </button>
              </div>
            </div>

            {/* Softs */}
            <h3 className="text-lg font-medium">Softs</h3>
            <div className="flex mb-5">
              <div className="flex items-center space-x-4 h-full">
                <select
                  value={soft}
                  onChange={(e) => setSoft(e.target.value)}
                  className="max-w-lg border rounded p-1 text-black"
                >
                  <option value="">A vous de jouer !</option>
                  {softsList.map((softOption, index) => (
                    <option key={index} value={softOption}>
                      {softOption}
                    </option>
                  ))}
                </select>
                <label htmlFor="cl" className="">
                  en Cl:
                </label>
                <input
                  type="number"
                  value={softAmount}
                  onChange={(e) => setSoftAmount(parseInt(e.target.value, 10))}
                  className="border rounded p-1 w-16 text-black"
                />
                <button
                  type="button"
                  onClick={handleSoftAdd}
                  className="bg-gradient-to-r from-purple-700 via-pink-500 to-orange-500 text-white p-2 rounded ml-auto text-xl"
                >
                  <BsPlusCircleFill />
                </button>
              </div>
            </div>

            {/* Aromatic */}
            <h3 className="text-lg font-medium">Aromates</h3>
            <div className="flex mb-5">
              <div className="flex items-center space-x-4 h-full justify-end">
                <select
                  value={aromatic}
                  onChange={(e) => setAromatic(e.target.value)}
                  className="max-w-lg border rounded p-1 text-black"
                >
                  <option value="">A vous de jouer !</option>
                  {aromaticsList.map((aromaticOption, index) => (
                    <option key={index} value={aromaticOption}>
                      {aromaticOption}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={handleAromaticAdd}
                  className="bg-gradient-to-r from-purple-700 via-pink-500 to-orange-500 text-white p-2 rounded ml-auto text-xl"
                >
                  <BsPlusCircleFill />
                </button>
              </div>
            </div>

            {/* Technique */}
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

            <div>
              <div className="boite2 w-1/2">
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
          </div>
        </div>
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded p-1 w-full"
              rows={4}
            />
          </div>

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
  );
};

export default CocktailSubmit;
