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
    <div className="relative mb-5 text-light-brown">
      <input
        type={type}
        className="register-input-group__input text-inherit font-inherit bg-dark-gray text-dark-gray border-light-gray border-2 px-4 py-2 rounded-md outline-2 transition duration-500 outline-gray-600 w-56 focus:outline-light-brown valid:outline-light-brown"
        required
        {...register(registerName)}
      />
      <label
        htmlFor={htmlFor}
        className="register-input-group__label translate-10/10 bg-dark-gray rounded-md px-2 py-1 transition-transform transition-duration-500 scale-100"
      >
        {name}
      </label>
    </div>
  );
};

export default InputForm;
