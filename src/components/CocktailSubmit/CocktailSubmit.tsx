import React, { ReactNode, useState } from 'react';

const CocktailSubmit: React.FC = () => {
  const [alcoholCount, setAlcoholCount] = useState(1);
  const [softCount, setSoftCount] = useState(1);

  const handleAlcoholChange = () => {
    setAlcoholCount(alcoholCount + 1);
  };

  const handleSoftChange = () => {
    setSoftCount(softCount + 1);
  };

  const deleteSelect = (type: string, index: number) => {
    if (type === 'alcohol') {
      setAlcoholCount(alcoholCount - 1);
    } else if (type === 'soft') {
      setSoftCount(softCount - 1);
    }
  };

  const quantityOptions = Array.from({ length: 41 }).map((_, i) => (
    <option key={i} value={`${i} cl`}>{`${i} cl`}</option>
  ));

  const alcoholSelects = [];
  for (let i = 0; i < alcoholCount; i++) {
    alcoholSelects.push(
      <div key={i}>
        <div>
          <label htmlFor={`alcool-${i}`}>Alcool {i + 1}</label>
          <select
            name={`alcool-${i}`}
            id={`alcool-${i}`}
            className="text-black"
          >
            <option value="">--Please choose an option--</option>
            <option value="rhum">rhum</option>
            <option value="vodka">vodka</option>
            <option value="gin">gin</option>
            <option value="whisky">Whisky</option>
            <option value="martini-rouge">Martini Rouge</option>
            <option value="martini-blanc">Martini Blanc</option>
          </select>
          <label htmlFor={`alcool-${i}-quantity`}>
            Quantité
            <select
              name={`alcool-${i}-quantity`}
              id={`alcool-${i}-quantity`}
              className="text-black"
            >
              <option value="">--Please choose an option--</option>
              {quantityOptions}
            </select>
          </label>
          <button
            type="button"
            onClick={() => deleteSelect('alcohol', i)} // Appeler la fonction de suppression pour les alcools
            className="bg-red-500 text-white rounded-md p-2 mt-2"
          >
            Supprimer
          </button>
        </div>
      </div>
    );
  }

  const softSelects = [];
  for (let i = 0; i < softCount; i++) {
    softSelects.push(
      <div key={i}>
        <div>
          <label htmlFor={`soft-${i}`}>Soft/Mixer {i + 1}</label>
          <select name={`soft-${i}`} id={`soft-${i}`} className="text-black">
            <option value="">--Please choose an option--</option>
            <option value="coca">coca</option>
            <option value="tonic">tonic</option>
            <option value="perrier">perrier</option>
            <option value="jus-orange">jus d'orange</option>
          </select>
          <label htmlFor="quantity">
            Quantité
            <select
              name={`soft-${i}-quantity`}
              id={`soft-${i}-quantity`}
              className="text-black"
            >
              <option value="">--Please choose an option--</option>
              {quantityOptions}
            </select>
          </label>
          <button
            type="button"
            onClick={() => deleteSelect('soft', i)} // Appeler la fonction de suppression pour les softs/mixers
            className="bg-red-500 text-white rounded-md p-2 mt-2"
          >
            Supprimer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-black flex justify-center items-center flex-1 h-[100vh]">
      <div className="relative w-4/5 lg:w-3/5 h-4/5 max-h-4/5 flex flex-col overflow-y-auto shadow-purple-700 shadow-2xl rounded-2xl bg-black">
        <div className="text-center pb-12">
          <h1 className="text-amber-700 text-2xl pt-5">Propose ton cocktail</h1>
          <form
            action="POST"
            className="text-white text-center flex flex-col content-center"
          >
            <h3>Alcool</h3>
            {alcoholSelects}
            <button
              type="button"
              onClick={handleAlcoholChange}
              className="bg-amber-700 text-white rounded-md p-2 mt-2"
            >
              Ajouter un nouvel alcool
            </button>
            <h3>Soft/Mixer</h3>
            {softSelects}
            <button
              type="button"
              onClick={handleSoftChange}
              className="bg-amber-700 text-white rounded-md p-2 mt-2"
            >
              Ajouter un nouveau soft/mixer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CocktailSubmit;
