/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { FaCocktail } from 'react-icons/fa';

const Rating = () => {
  const [rating, setRating] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const handleIconMouseOver = (index: number) => {
    if (rating === 0) {
      setHoveredIndex(index);
    }
  };

  const handleIconMouseLeave = () => {
    setHoveredIndex(-1);
  };
  const handleIconClick = (index: number) => {
    setRating(index);
    setHoveredIndex(-1); // Désactive le survol après le clic
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((index) => (
        <span
          key={index}
          onClick={() => handleIconClick(index)}
          onMouseOver={() => handleIconMouseOver(index)}
          onMouseLeave={handleIconMouseLeave}
          className={`text-3xl p-1 ${
            index <= rating || index <= hoveredIndex
              ? 'text-yellow-400'
              : 'text-gray-300'
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
