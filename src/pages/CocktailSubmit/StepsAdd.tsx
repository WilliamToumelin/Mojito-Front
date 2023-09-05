import React, { useState } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { AiFillPlusCircle } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';

interface Props {
  register: UseFormRegister<FieldValues>;
}

const StepsAdd: React.FC<Props> = ({ register }) => {
  const [stepCount, setStepCount] = useState(1);
  const [stepContent, setStepContent] = useState<string[]>(['']);

  const addStep = () => {
    if (stepCount <= 10) {
      setStepCount(stepCount + 1);
      setStepContent([...stepContent, '']);
    }
  };

  const removeStep = (index: number) => {
    if (stepCount > 1) {
      setStepCount(stepCount - 1);
      const clearContent = [...stepContent];
      clearContent.splice(index, 1);
      setStepContent(clearContent);
    }
  };

  const isAddStepButtonDisabled = stepCount >= 10;

  return (
    <>
      <div className="mb-4 text-center">
        <h3 className="text-2xl font-medium mb-2">Etapes</h3>
        {Array.from({ length: stepCount }).map((_, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-center items-center space-x-2"
          >
            <textarea
              {...register(`step_${index}`)}
              className="border-xs rounded p-1 w-1/5 bg-light-brown text-dark-gray hover:scale-105 duration-500"
              rows={2}
              value={stepContent[index]}
              onChange={(e) => {
                const updatedContent = [...stepContent];
                updatedContent[index] = e.target.value;
                setStepContent(updatedContent);
              }}
            />
            {stepCount > 1 && (
              <button
                type="button"
                onClick={() => removeStep(index)}
                className="bg-red-900 text-xl p-2 rounded text-white hover:bg-red-700"
              >
                <FaTrashAlt />
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <div className="p-2">
          <button
            type="button"
            onClick={addStep}
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
