import React, { useEffect, useState } from 'react';
import { GiCookie } from 'react-icons/gi';
import { MdCookie } from 'react-icons/md';
import Cookies from 'js-cookie';

const CookieConsentModal = () => {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    // Vérifiez si l'utilisateur a déjà donné son consentement en vérifiant le cookie
    const hasConsent = Cookies.get('cookieConsent') === 'true';
    setConsent(hasConsent);
  }, []);

  const handleAccept = () => {
    // L'utilisateur a accepté les cookies, vous pouvez stocker un cookie de consentement ici
    Cookies.set('cookieConsent', 'true', { expires: 365 }); // Expire dans 1 an
    setConsent(true);
  };

  const handleReject = () => {
    // L'utilisateur a refusé les cookies, vous pouvez gérer cela selon vos besoins
    // Par exemple, afficher un message de refus ou limiter certaines fonctionnalités
    setConsent(false);
  };

  if (consent) {
    return null; // Ne rien afficher si l'utilisateur a déjà donné son consentement
  }

  return (
    <div
      className={`fixed ${
        consent
          ? 'opacity-0 pointer-events-none z-[-1] bottom-100 right-100 transition-opacity duration-300'
          : 'z-50 bottom-20 right-50'
      }`}
    >
      <div className="bg-dark-gray p-4 h-[30vh] w-[40vw] rounded border-4 border-light-gray">
        <div className="flex flex-col h-[50%] w-full">
          <h3 className="text-xl font-medium text-dark-brown mb-3 flex items-center">
            Enjoy the experience with some{'   '}
            <GiCookie className="text-[2rem]" />
            <MdCookie className="text-[2rem]" />
          </h3>
          <p className="text-dark-brown mb-3">
            Nous utilisons des cookies pour améliorer votre expérience sur notre
            site.
          </p>
        </div>
        <div className="flex flex-col h-[50%] justify-around">
          <button
            type="button"
            className="rounded bg-dark-brown text-white px-4 py-2"
            onClick={handleAccept}
          >
            Accepter
          </button>
          <button
            type="button"
            className="rounded bg-red-900 text-white px-4 py-2"
            onClick={handleReject}
          >
            Refuser
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentModal;
