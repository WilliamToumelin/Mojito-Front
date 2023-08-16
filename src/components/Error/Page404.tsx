import React from 'react';
import '../../styles/index.scss';
// type Props = {
//   endLoading: () => void;
// };

// const Page404: React.FC<Props> = ({ endLoading }) => {
//   useEffect(() => {
//     setTimeout(() => endLoading(), 1500);
//   }, [endLoading]);

const Page404: React.FC = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Désolé, une erreur inattendue est survenue.</p>
      <p>
        <i>Not Found</i>
      </p>
    </div>
  );
};

export default Page404;
