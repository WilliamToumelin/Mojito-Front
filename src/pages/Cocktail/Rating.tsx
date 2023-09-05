/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { FaCocktail } from 'react-icons/fa';
import Cookies from 'js-cookie';

const Rating = () => {
  const [rating, setRating] = useState(0);
  const [index, setIndex] = useState(-1);
  const selectedCocktailId = localStorage.getItem('selectedCocktail');

  const handleIconMouseOver = (i: number) => {
    if (rating === 0) {
      setIndex(i);
    }
  };

  const handleIconMouseLeave = () => {
    setIndex(-1);
  };

  const handleIconClick = async (
    i: number,
    event: React.MouseEvent<HTMLSpanElement>
  ) => {
    setRating(i);
    event.currentTarget.classList.add('bounce');
    setTimeout(() => {
      event.currentTarget.classList.remove('bounce');
    }, 750);
    setIndex(-1);

    const authToken = Cookies.get('authToken');

    const data = {
      rating: index,
      user: 1,
      cocktail: selectedCocktailId,
    };

    try {
      const response = await fetch('http://localhost:5174/api/login_check', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`, // Ajouter le token JWT aux en-têtes
        },
      });
      if (response.ok) {
        console.log('envoi réussi');
      } else {
        console.error('Erreur lors de la soumission du commentaire');
      }
    } catch (error) {
      console.error('Erreur inattendue', error);
    }
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
