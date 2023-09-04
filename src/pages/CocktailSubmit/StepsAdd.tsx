// import React, { useState } from 'react';
// import { AiFillPlusCircle } from 'react-icons/ai';
// import { FaTrashAlt } from 'react-icons/fa';

// interface Props {
//   number_step: number;
//   content: string;
// }

// const StepsAdd: React.FC<Props> = ({ number_step, content }) => {
//   const [stepCount, setStepCount] = useState(1);

//   const addStep = () => {
//     if (stepCount < 3) {
//       setStepCount(stepCount + 1);
//     }
//   };

//   const removeStep = () => {
//     if (stepCount > 1) {
//       setStepCount(stepCount - 1);
//     }
//   };

//   const isAddStepButtonDisabled = stepCount >= 10;

//   function register(
//     arg0: string
//   ): JSX.IntrinsicAttributes &
//     React.ClassAttributes<HTMLTextAreaElement> &
//     React.TextareaHTMLAttributes<HTMLTextAreaElement> {
//     throw new Error('Function not implemented.');
//   }

//   return (
//     <div>
//       <div className="mb-4 text-center">
//         <h3 className="text-2xl font-medium mb-2">Etapes</h3>
//         {Array.from({ length: stepCount }).map((_, index) => (
//           <div key={index} className="flex space-x-2">
//             <textarea
//               {...register(`step_${index}`)}
//               className="border-xs rounded p-1 w-1/5 bg-light-brown text-dark-gray hover:scale-105 duration-500"
//               rows={2}
//             />
//             {/* Bouton "Supprimer" visible si le nombre d'étapes est supérieur à 1 */}
//             {stepCount > 1 && (
//               <button
//                 type="button"
//                 onClick={removeStep}
//                 className="bg-red-900 text-xl p-2 rounded text-white hover:bg-red-700"
//               >
//                 <FaTrashAlt />
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//       <div className="flex justify-center">
//         <div className="p-2">
//           <button
//             type="button"
//             onClick={addStep}
//             className={`${
//               isAddStepButtonDisabled
//                 ? 'bg-red-900 text-light-brown cursor-not-allowed '
//                 : `text-light-brown bg-light-gray hover:text-dark-gray hover:bg-dark-brown`
//             } p-2 rounded text-xl`}
//             disabled={isAddStepButtonDisabled}
//           >
//             <AiFillPlusCircle />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StepsAdd;
