import React from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface Props {
  name: string;
  options: string[];
  selected: string | null;
  register: UseFormRegister<FieldValues>;
}

const RadioAdd: React.FC<Props> = ({ options, selected, name, register }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {options.map((option, index) => (
        <label key={index} className="flex flex-wrap items-center p-3">
          <div className="p-4 shadow-white border-white rounded-full">
            {option}
          </div>
          <div
            className={`w-8 h-8 rounded-full border-4 flex items-center justify-center ${
              selected === option
                ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white border-none'
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
