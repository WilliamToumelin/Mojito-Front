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
      <div className="w-4/5 lg:w-3/5 h-4/5 flex flex-col overflow-y-auto shadow-amber-700 shadow-2xl rounded-2xl bg-black">
        <article className="h-full w-3/3 flex">
          <div style={{ width: '33.33%' }} className="flex just">
            <div className="w-52 h-52 rounded-full overflow-hidden shadow-amber-700 shadow-2xl ">
              <div className="relative w-full h-full my-auto">
                <img
                  src={image}
                  alt="cocktail"
                  className="absolute w-full h-full object-cover transform-center "
                />
              </div>
            </div>
          </div>
          <div style={{ width: '66.67%' }}>
            <h1 className="text-amber-700 text-2xl">{cocktailItem.title}</h1>
            <div className="">{cocktailItem.content}</div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default CocktailById;
