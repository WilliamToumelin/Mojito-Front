/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { FaCocktail } from 'react-icons/fa';

const Rating = () => {
  const [rating, setRating] = useState(0);
  const [index, setIndex] = useState(-1);
  const selectedCocktailId = Number(localStorage.getItem('selectedCocktail'));

  const handleIconMouseOver = (i: number) => {
    if (rating === 0) {
      setIndex(i);
    }
  };

  const handleIconMouseLeave = () => {
    setIndex(-1);
  };

  const handleRating = async (
    i: number,
    event: React.MouseEvent<HTMLSpanElement>
  ) => {
    setRating(i);
    event.currentTarget.classList.add('bounce');
    setTimeout(() => {
      event.currentTarget.classList.remove('bounce');
    }, 750);
    setIndex(-1);

    // Obtenir les données ici
    const data = {
      rating: i,
      user: 1,
      cocktail: selectedCocktailId,
    };

    try {
      const response = await fetch('http://localhost:5174/api/ratings/add', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        const { token } = responseData;
        localStorage.getItem('authToken'); // Stockez le token dans le localStorage
        console.log(token);
        console.log('envoi réussi');
      } else {
        console.log('Echec');
      }
    } catch (error) {
      console.error('Erreur réseau lors de la connexion', error);
    }
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          onClick={(event) => handleRating(i, event)}
          onMouseOver={() => handleIconMouseOver(i)}
          onFocus={() => handleIconMouseOver(i)}
          onMouseLeave={handleIconMouseLeave}
          className={`text-3xl p-1 ${
            i <= rating || i <= index
              ? 'text-dark-brown animate-bounce'
              : 'text-gray-400'
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
