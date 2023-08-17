import React, { FC, useCallback, useState } from 'react';
import { FaXmark } from 'react-icons/fa6';
import { FiLogOut } from 'react-icons/fi';
import '../../styles/index.scss';

const ConnectModal: FC = () => {
  const [displayModal, setDisplayModal] = useState<boolean>(false);

  // --- handleClick sert à toggle le modal
  const handleClick = useCallback((): void => {
    setDisplayModal((prevstate) => !prevstate);
  }, []);

  return (
    <div
      className="connect-modal"
      style={{
        transform: displayModal
          ? 'translate3d(-190px, 0, 0)'
          : 'translate3d(calc(100% + 15px), 0, 0)',
      }}
    >
      <form>
        <input type="email" placeholder="E-mail" name="" id="" required />
        <input
          type="password"
          placeholder="Mot de passe"
          name=""
          id=""
          required
        />
        <button type="submit">Envoyer</button>
      </form>
      <button
        type="button"
        id="modal_toggle"
        style={{ transform: displayModal ? 'rotate(0deg)' : 'rotate(45deg)' }}
        onClick={handleClick}
      >
        <FaXmark />
      </button>
    </div>
  );
};

export default ConnectModal;
