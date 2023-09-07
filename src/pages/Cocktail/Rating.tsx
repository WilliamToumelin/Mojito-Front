/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { FaCocktail } from 'react-icons/fa';
import Cookies from 'js-cookie';

const Rating = () => {
  const [rating, setRating] = useState(0);
  const [index, setIndex] = useState(-1);
  const [successMessage, setSuccessMessage] = useState('');
  const [postSuccess, setPostSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const selectedCocktailId = Number(localStorage.getItem('selectedCocktail'));

  const handleIconMouseOver = (i: number) => {
    if (rating === 0) {
      setIndex(i);
    }
  };

  const handleIconMouseLeave = () => {
    setIndex(-1);
  };

  const sendRatingToServer = async (i: number) => {
    const authToken = Cookies.get('authToken');
    const userToken = Cookies.get('userToken');
    let userId: number | null = null;

    if (userToken) {
      const userTokenObj = JSON.parse(userToken);
      userId = userTokenObj.id;
    }

    const data = {
      rating: i,
      user: userId,
      cocktail: selectedCocktailId,
    };

    try {
      const response = await fetch(
        'http://celestin-j-server.eddi.cloud/api/ratings/add',
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.ok) {
        setSuccessMessage('Votre note a bien été envoyer');
        setPostSuccess(true);
      } else {
        setErrorMessage(
          "L'envoi de votre note n'a pu aboutir, peut être avez vous déja noter ce cocktail..."
        );
      }
    } catch (error) {
      console.error('Erreur inattendue', error);
    }
  };

  const handleIconClick = (i: number) => {
    setRating(i);
    setIndex(-1);
    sendRatingToServer(i);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            onClick={() => handleIconClick(i)}
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
      </div>
      {successMessage ? (
        <p className="text-green-700">{successMessage}</p>
      ) : (
        errorMessage ?? (
          <p className="text-red-600 text center">{errorMessage}</p>
        )
      )}
    </div>
  );
};

export default Rating;
