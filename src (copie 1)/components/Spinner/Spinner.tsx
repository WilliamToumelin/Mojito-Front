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
      <span>Mojit`&apos;`O</span>
    </main>
  );
};

export default Spinner;
