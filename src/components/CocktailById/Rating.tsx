/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { FaCocktail } from 'react-icons/fa';

const Rating = () => {
  const [rating, setRating] = useState(0);

  const handleClick = (index: number) => {
    if (rating !== index) {
      setRating(index);
    }
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((index) => (
        <span
          key={index}
          onClick={() => handleClick(index)}
          className={`text-3xl p-1 ${
            index <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
        >
          <FaCocktail />
        </span>
      ))}
      {/* {rating} */}
    </div>
  );
};

export default Rating;
