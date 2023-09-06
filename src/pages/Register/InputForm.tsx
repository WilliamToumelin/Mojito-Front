/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/require-default-props */
import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface InputFormProps {
  type: string;
  htmlFor: string;
  name?: string;
  register: UseFormRegister<any>;
  registerName: string;
}

const InputForm: React.FC<InputFormProps> = ({
  type,
  htmlFor,
  name,
  register,
  registerName,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-700"
      >
        {name}
      </label>
      <input
        type={type}
        className="mt-1 focus:ring-light-brown focus:border-light-brown block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        required
        {...register(registerName)}
      />
    </div>
  );
};

export default InputForm;
