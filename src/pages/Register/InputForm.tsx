/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
    <div className="register-input-group mb-5">
      <input
        type={type}
        className="register-input-group__input"
        required
        {...register(registerName)}
      />
      <label htmlFor={htmlFor} className="register-input-group__label">
        {name}
      </label>
    </div>
  );
};

export default InputForm;
