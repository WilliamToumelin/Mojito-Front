import React from 'react';
import { useParams } from 'react-router-dom';
import Page404 from '../Error/Page404';
import image from '../../images/image.jpeg';

type Cocktails = {
  categoryId: number;
  id: number;
  slug: string;
  content: string;
  title: string;
};

type Props = {
  cocktailList: Cocktails[];
};

const CocktailById: React.FC<Props> = ({ cocktailList }) => {
  const { slug } = useParams<{ slug: string }>();

  const cocktailItem = cocktailList.find((cocktail) => cocktail.slug === slug);

  if (!cocktailItem) {
    return <Page404 />;
  }

  return (
    <div className="bg-black flex justify-center items-center flex-1 h-[85vh]">
      <div className="w-4/5 lg:w-3/5 h-4/5 flex flex-col overflow-y-auto shadow-purple-700 shadow-2xl rounded-2xl bg-black">
        <article className="h-full w-3/3 flex">
          <div
            style={{ width: '33.33%' }}
            className="flex items-center justify-center"
          >
            <div className="shadow-amber-700 shadow h-6/8 w-4/5 rounded-2xl overflow-hidden">
              <img src={image} alt="cocktail" className="h-full w-full " />
            </div>
          </div>
          <div
            style={{ width: '66.67%' }}
            className="flex flex-col items-center"
          >
            <h1 className="text-amber-700 text-5xl p-5 w-2/3">
              {cocktailItem.title}
            </h1>
            <div className="p-6">{cocktailItem.content}</div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default CocktailById;
