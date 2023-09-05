// RadioAdd.tsx
import React from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface Props {
  name: string;
  options: { id: number; name: string }[];
  selected: string | number;
  register: UseFormRegister<FieldValues>;
  id: number;
}

const RadioAdd: React.FC<Props> = ({ options, selected, name, register }) => {
  return (
    <div className="block text-lg text-[#b3a8a0]">
      {options.map((option, index) => (
        <label key={index} className="flex flex-wrap items-center">
          <div
            className={`w-8 h-8 rounded-full border-4 flex items-center justify-center hover:scale-125 ${
              selected === option.id.toString()
                ? `bg-light-gray border-dark-brown`
                : 'bg-[#b3a8a0] border-light-gray'
            }`}
          >
            {selected === option.id.toString() && (
              <BsFillCheckCircleFill
                size={24}
                className="text-dark-gray bg-dark-brown rounded-full"
              />
            )}
          </div>
          <input
            type="radio"
            className="sr-only"
            value={option.id}
            {...register(name)}
          />
          <div className="p-2 rounded-full">{option.name}</div>
        </label>
      ))}
    </div>
  );
};

export default RadioAdd;
