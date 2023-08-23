/* eslint-disable react/prop-types */
import React, { Dispatch, SetStateAction } from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';

type Props = {
  title: string;
  itemsList: string[];
  itemValue: string;
  setItemValue: Dispatch<SetStateAction<string>>;
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
  handleAdd: () => void;
};

const ItemAdd: React.FC<Props> = ({
  title,
  itemsList,
  itemValue,
  setItemValue,
  amount,
  setAmount,
  handleAdd,
}) => {
  const handleIncrement = () => {
    setAmount(amount + 1);
  };

  const handleDecrement = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };
  return (
    <>
      <h3 className="text-lg font-medium">{title}</h3>
      <div className="flex mb-5">
        <div className="flex items-center space-x-4 w-full">
          <select
            value={itemValue}
            onChange={(e) => setItemValue(e.target.value)}
            className="max-w-lg border rounded p-1 text-white text-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-400 hover:to-orange-400"
          >
            <option value="">A vous de jouer !</option>
            {itemsList.map((itemOption, index) => (
              <option key={index} value={itemOption}>
                {itemOption}
              </option>
            ))}
          </select>
          <div
            className={`flex p-1 pl-4 w-32 text-white text-3xl ${
              title === 'Aromates' ? 'opacity-0' : ''
            }`}
          >
            <div className="flex items-center space-x-4">
              <button type="button" className="" onClick={handleDecrement}>
                <AiOutlineMinusCircle />
              </button>
              <div>{amount}</div>
              <button type="button" className="" onClick={handleIncrement}>
                <AiOutlinePlusCircle />
              </button>
            </div>
          </div>
          <div className="w-1/6 text-center">
            <button
              type="button"
              onClick={handleAdd}
              className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-400 hover:to-orange-400 text-white p-2 rounded text-xl"
            >
              <BsFillCheckCircleFill />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemAdd;
