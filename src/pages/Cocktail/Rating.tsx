/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { FaCocktail } from 'react-icons/fa';

import './Rating.scss';

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
  const handleIconClick = (
    i: number,
    event: React.MouseEvent<HTMLSpanElement>
  ) => {
    setRating(i);
    event.currentTarget.classList.add('bounce');
    setTimeout(() => {
      event.currentTarget.classList.remove('bounce');
    }, 750);
    setIndex(-1);
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          onClick={(event) => handleIconClick(i, event)}
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
