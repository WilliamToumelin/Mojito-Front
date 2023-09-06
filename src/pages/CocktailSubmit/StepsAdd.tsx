import React from 'react';
import {
  FieldValues,
  UseFormRegister,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { AiFillPlusCircle } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';

interface Props {
  register: UseFormRegister<FieldValues>;
}

const StepsAdd: React.FC<Props> = ({ register }) => {
  const { control } = useForm();

  const { fields, append, remove } = useFieldArray({
    name: 'steps',
    control,
  });

  const isAddStepButtonDisabled = fields.length >= 10;

  return (
    <>
      <div className="mb-4 text-center">
        <h3 className="text-2xl font-medium mb-2">Etapes</h3>
        <div className="flex flex-wrap justify-center p-3">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex flex-wrap justify-center items-center space-x-2 p-1"
            >
              <textarea
                {...register(`steps.${index}.content`)}
                className="border-xs rounded bg-light-brown text-dark-gray hover:scale-105 duration-500"
                rows={2}
                defaultValue={field.content}
              />
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="bg-red-900 text-xl p-2 rounded text-white hover:bg-red-700"
                >
                  <FaTrashAlt />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="p-2">
          <button
            type="button"
            onClick={() => append({ content: '' })}
            className={`${
              isAddStepButtonDisabled
                ? 'bg-red-900 text-light-brown cursor-not-allowed '
                : `text-light-brown bg-light-gray hover:text-dark-gray hover:bg-dark-brown`
            } p-2 rounded text-xl`}
            disabled={isAddStepButtonDisabled}
          >
            <AiFillPlusCircle />
          </button>
        </div>
      </div>
    </>
  );
};

export default StepsAdd;
