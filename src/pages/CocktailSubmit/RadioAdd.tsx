import React from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import Register from '../Register/Register';

interface Props {
  name: string;
  options: string[];
  selected: string | null;
  register: UseFormRegister<FieldValues>;
}

const RadioAdd: React.FC<Props> = ({ options, selected, name, register }) => {
  return (
    <div className="mb-4">
      {options.map((option, index) => (
        <label key={index} className="flex items-center">
          <span className="mr-3">{option}</span>
          <div
            className={`w-8 h-8 rounded-full border-gray-400 border-4 flex items-center justify-center ${
              selected === option
                ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-black border-none'
                : ''
            }`}
          >
            {selected === option && <BsFillCheckCircleFill size={24} />}
          </div>
          <input
            type="radio"
            className="sr-only"
            value={option}
            {...register(name)}
          />
        </label>
      ))}
    </div>
  );
};

export default RadioAdd;
