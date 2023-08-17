import React from 'react';

import './Spinner.scss';

type Props = {
  isLoading: boolean;
};

const Spinner: React.FC<Props> = ({ isLoading }) => {
  return (
    <main
      className="spinner"
      style={{
        opacity: isLoading ? 1 : 0,
        zIndex: isLoading ? 1 : -1,
        height: isLoading ? '100vh' : '0vh',
        transition: isLoading ? 'none' : '0.5s',
      }}
    >
      <p>Mojit`&apos;`O</p>
    </main>
  );
};

export default Spinner;
