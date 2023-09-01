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
    <div className="block text-lg text-[#b3a8a0]">
      {options.map((option, index) => (
        <label key={index} className="flex flex-wrap items-center">
          <div
            className={`w-8 h-8 rounded-full border-4 flex items-center justify-center hover:transform:scale(2) ${
              selected === option
                ? `bg-light-gray border-dark-brown`
                : 'bg-[#b3a8a0] border-light-gray'
            }`}
          >
            {selected === option && (
              <BsFillCheckCircleFill
                size={24}
                className="text-dark-gray bg-dark-brown"
              />
            )}
          </div>
          <input
            type="radio"
            className="sr-only"
            value={option}
            {...register(name)}
          />
          <div className="p-2 rounded-full">{option}</div>
        </label>
      ))}
    </div>
  );
};

export default RadioAdd;
