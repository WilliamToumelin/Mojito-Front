/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { FaCocktail } from 'react-icons/fa';

const Rating = () => {
  const [rating, setRating] = useState(0);
  const [index, setIndex] = useState(-1);

  const handleIconMouseOver = (i: number) => {
    if (rating === 0) {
      setIndex(i);
    }
  };

  const handleIconMouseLeave = () => {
    setIndex(-1);
  };
  const handleIconClick = (i: number) => {
    setRating(i);
    setIndex(-1); // Désactive le survol après le clic
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          onClick={() => handleIconClick(i)}
          onMouseOver={() => handleIconMouseOver(i)}
          onFocus={() => handleIconMouseOver(i)}
          onMouseLeave={handleIconMouseLeave}
          className={`text-3xl p-1 ${
            i <= rating || i <= index ? 'text-yellow-400' : 'text-gray-300'
          }`}
        >
          <span className="">
            <FaCocktail />
          </span>
        </span>
      ))}
      {/* {rating} */}
    </div>
  );
};

export default Rating;
