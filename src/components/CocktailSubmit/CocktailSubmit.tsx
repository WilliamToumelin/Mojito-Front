/* eslint-disable no-console */
import React, { useState } from 'react';

const CocktailSubmit: React.FC = () => {
  const [selectedAlcohols, setSelectedAlcohols] = useState<string[]>([]);
  const [selectedSofts, setSelectedSofts] = useState<string[]>([]);
  const [selectedAromatics, setSelectedAromatics] = useState<string[]>([]);
  const [selectedTechnique, setSelectedTechnique] = useState<string[]>([]);

  const [alcohol, setAlcohol] = useState<string>('');
  const [soft, setSoft] = useState<string>('');
  const [aromatic, setAromatic] = useState<string>('');
  const [technique, setTechnique] = useState<string>('');

  const [alcoholAmount, setAlcoholAmount] = useState<number>(0);
  const [softAmount, setSoftAmount] = useState<number>(0);

  const [description, setDescription] = useState<string>('');

  const alcoholsList = [
    'Rhum',
    'Whisky',
    'Gin' /* Ajouter d'autres alcools ici */,
  ];
  const softsList = [
    'Coca',
    'Tonic',
    "Jus d'orange" /* Ajouter d'autres softs ici */,
  ];

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

  const handleTechniqueAdd = () => {
    if (technique !== '') {
      setSelectedTechnique([...selectedTechnique, `${technique}`]);
      setTechnique('');
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

  const handleTechniqueRemove = (index: number) => {
    const updatedTechnique = [...selectedTechnique];
    updatedTechnique.splice(index, 1);
    setSelectedTechnique(updatedTechnique);
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
      <div className="relative w-4/5 lg:w-3/5 h-4/5 max-h-4/5 flex flex-col overflow-y-auto over shadow-purple-700 shadow-2xl rounded-2xl bg-black">
        <div className="p-4 text-white">
          <h2 className="text-2xl font-bold mb-4">Proposer un Cocktail</h2>

          {/* Alcools section */}
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Alcools</h3>
            <div className="flex space-x-2">
              <select
                value={alcohol}
                onChange={(e) => setAlcohol(e.target.value)}
                className="border rounded p-1 text-black"
              >
                <option value="">Sélectionner un alcool</option>
                {alcoholsList.map((alcoholOption, index) => (
                  <option key={index} value={alcoholOption}>
                    {alcoholOption}
                  </option>
                ))}
              </select>
              <label htmlFor="cl" className="pt-1">
                Centilitres:
              </label>
              <input
                type="number"
                value={alcoholAmount}
                onChange={(e) => setAlcoholAmount(parseInt(e.target.value, 10))}
                className="border rounded p-1 w-16 text-black"
              />
              <button
                type="button"
                onClick={handleAlcoholAdd}
                className="bg-blue-500 text-white px-2 rounded"
              >
                Ajouter
              </button>
            </div>
            <ul>
              {selectedAlcohols.map((item, index) => (
                <li key={index} className="flex items-center gap-2 m-1">
                  {item}
                  <button
                    type="button"
                    onClick={() => handleAlcoholRemove(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Softs section */}
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Softs</h3>
            <div className="flex space-x-2">
              <select
                value={soft}
                onChange={(e) => setSoft(e.target.value)}
                className="border rounded p-1 text-black"
              >
                <option value="">Sélectionner un soft</option>
                {softsList.map((softOption, index) => (
                  <option key={index} value={softOption}>
                    {softOption}
                  </option>
                ))}
              </select>
              <label htmlFor="cl" className="pt-1">
                Centilitres:
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
                className="bg-blue-500 text-white px-2 rounded"
              >
                Ajouter
              </button>
            </div>
            <ul>
              {selectedSofts.map((item, index) => (
                <li key={index} className="flex items-center gap-2 m-1">
                  {item}
                  <button
                    type="button"
                    onClick={() => handleSoftRemove(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Aromatic section */}
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Aromates</h3>
            <div className="flex space-x-2">
              <select
                value={aromatic}
                onChange={(e) => setAromatic(e.target.value)}
                className="border rounded p-1 text-black"
              >
                <option value="">Sélectionner des aromates</option>
                {aromaticsList.map((aromaticOption, index) => (
                  <option key={index} value={aromaticOption}>
                    {aromaticOption}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={handleAromaticAdd}
                className="bg-blue-500 text-white px-2 rounded"
              >
                Ajouter
              </button>
            </div>
            <ul>
              {selectedAromatics.map((item, index) => (
                <li key={index} className="flex items-center gap-2 m-1">
                  {item}
                  <button
                    type="button"
                    onClick={() => handleAromaticRemove(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Technique section */}
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Technique</h3>
            <div className="flex space-x-2">
              <select
                value={technique}
                onChange={(e) => setTechnique(e.target.value)}
                className="border rounded p-1 text-black"
              >
                <option value="">Sélectionner une technique</option>
                {techniqueList.map((techniqueOption, index) => (
                  <option key={index} value={techniqueOption}>
                    {techniqueOption}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={handleTechniqueAdd}
                className="bg-blue-500 text-white px-2 rounded"
              >
                Ajouter
              </button>
            </div>
            <ul className="">
              {selectedTechnique.map((item, index) => (
                <li key={index} className="flex items-center gap-2 m-1">
                  {item}
                  <button
                    type="button"
                    onClick={() => handleTechniqueRemove(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          </div>

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
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Soumettre le Cocktail
          </button>
        </div>
      </div>
    </div>
  );
};

export default CocktailSubmit;
