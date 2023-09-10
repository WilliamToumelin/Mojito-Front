import React, { useEffect, useState } from 'react';
import { GiCookie } from 'react-icons/gi';
import { MdCookie } from 'react-icons/md';
import Cookies from 'js-cookie';

const CookieConsentModal = () => {
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    // Vérifiez si l'utilisateur a déjà donné son consentement en vérifiant le cookie
    const hasConsent = Cookies.get('cookieConsent') === 'true';
    setConsent(hasConsent);
  }, []);

  const handleAccept = () => {
    // L'utilisateur a accepté les cookies, vous pouvez stocker un cookie de consentement ici
    Cookies.set('cookieConsent', 'true', { expires: 1 }); // Expire dans 1 jour
    setConsent(true);
  };

  if (consent === null || consent === false) {
    // Rendre le composant si l'état est null (affichage initial)
    return (
      <div className="fixed z-50 bottom-0 right-30">
        <div className="bg-dark-gray p-4 md:w-[70vw] rounded border-4 border-light-gray">
          <div className="flex flex-col h-full justify-center">
            <h3 className="text-xl font-medium text-dark-brown mb-3 flex items-center">
              Enjoy the experience with some{'   '}
              <GiCookie className="text-[2rem]" />
              <MdCookie className="text-[2rem]" />
            </h3>
            <p className="text-dark-brown mb-3 break-all">
              Nous utilisons des cookies strictement nécessaires pour le bon
              fonctionnement de notre site, tels que le stockage de votre token
              JWT et de certaines informations de base que vous nous fournissez
              a votre inscritption sur notre site. Cependant, par souci de
              transparence, nous vous informons de leur utilisation.
            </p>
            <button
              type="button"
              className="rounded bg-dark-brown text-white px-4 py-2"
              onClick={handleAccept}
            >
              OK, j&apos;ai compris
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null; // Le consentement est déjà donné, donc ne rien afficher
};

export default CookieConsentModal;
