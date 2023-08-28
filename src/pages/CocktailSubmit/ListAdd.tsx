import React from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { BsFillCheckCircleFill } from 'react-icons/bs';

interface Props {
  category: string;
  amounts: any;
  handleAmountChange: (type: string, increment: boolean) => void;
  handleChange: (selected: string) => void;
  selected: any;
  ingredients: { id: string; name: string }[];
}

const ListAdd: React.FC<Props> = ({
  category,
  amounts,
  handleAmountChange,
  handleChange,
  selected,
  ingredients,
}) => {
  return (
    <div key={category}>
      <h3 className="text-xl">{category}</h3>
      <div className="flex">
        <select
          value={selected}
          onChange={(e) => handleChange(e.target.value)}
          className="max-w-lg border rounded p-1 text-white text-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-400 hover:to-orange-400"
        >
          <option className="text-black" value="">
            A vous de jouer !
          </option>
          {ingredients.map((ingredient) => (
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
            category === 'aromates' || category === 'verre' ? 'opacity-0' : ''
          }`}
        >
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className=""
              onClick={() => handleAmountChange(category, false)}
            >
              <AiOutlineMinusCircle />
            </button>
            <div>{amounts[category]}</div>
            <button
              type="button"
              className=""
              onClick={() => handleAmountChange(category, true)}
            >
              <AiOutlinePlusCircle />
            </button>
          </div>
        </div>
        <div className="w-1/6 text-center">
          <button
            type="button"
            onClick={() => {
              if (category === 'alcools') {
                handleChange(selected);
              }
            }}
            className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-400 hover:to-orange-400 text-white p-2 rounded text-xl"
          >
            <BsFillCheckCircleFill />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListAdd;
