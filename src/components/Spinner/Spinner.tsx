import React, { useState, useEffect } from 'react';
import './Spinner.scss';

type Props = {
  isLoading: boolean;
};

const Spinner: React.FC<Props> = ({ isLoading }) => {
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimationDone(true);
    }, 6000); // 2 animations * 6 seconds each

    return () => {
      setAnimationDone(false);
    };
  }, [isLoading]);

  return (
    <div className="bg-white h-screen">
      <div className="z-40 bg-white">
        <div
          className={`view ${
            animationDone ? 'animation-done z-50' : 'hideen z-30'
          }`}
        >
          <div className="left">
            <div className="image1" />
          </div>
          <div className="divider" />
          <div className="right">
            <div className="image2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
