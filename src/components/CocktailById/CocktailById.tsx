import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaCocktail } from 'react-icons/fa';
import { FiChevronRight } from 'react-icons/fi';
import { BsClockFill } from 'react-icons/bs';
import Rating from './Rating';
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
    <div className="bg-black flex justify-center items-center flex-1 h-[75vh]">
      <div className="w-4/5 lg:w-3/5 h-4/5 flex rounded-2xl shadow-purple-700 shadow-2xl bg-black">
        <div className="flex-1 flex">
          <div className="w-2/5">
            <div className="h-full">
              <img
                src={image}
                alt="cocktail"
                className="h-full w-full object-cover object-center rounded-2xl"
              />
            </div>
          </div>
          <div className="w-3/5 flex-1 overflow-y-auto p-12 text-white space-y-12">
            <h2 className=" text-3xl font-semibold">{cocktailItem.title}</h2>
            <div className="flex items-center text-2xl">
              <div className=" text-yellow-400 mr-1">
                <FaCocktail />
              </div>
              <p className="ml-2 text-lg mr-1 font-bold">4.95 {}</p>
              <span className="w-2 h-2 mx-1.5 bg-white rounded-full" />
              <Link to={`/cocktail/${cocktailItem.slug}/commentaires`}>
                <div className="ml-1 text-lg">{}73 reviews</div>
              </Link>
            </div>
            <div className="pt-6 text-3xl flex items-center">
              <BsClockFill className="" />
              <div className="pl-3">12min {}</div>
            </div>
            <div className="text-xl">
              <ul className="grid grid-cols-2 gap-4">
                <li className="flex items-center">
                  <FiChevronRight /> {cocktailItem.id}
                </li>
                <li className="flex items-center">
                  <FiChevronRight /> {cocktailItem.id}
                </li>
                <li className="flex items-center">
                  <FiChevronRight /> {cocktailItem.id}
                </li>
                <li className="flex items-center">
                  <FiChevronRight /> {cocktailItem.id}
                </li>
                <li className="flex items-center">
                  <FiChevronRight /> {cocktailItem.id}
                </li>
                <li className="flex items-center">
                  <FiChevronRight /> {cocktailItem.id}
                </li>
                <li className="flex items-center">
                  <FiChevronRight /> {cocktailItem.id}
                </li>
                <li className="flex items-center">
                  <FiChevronRight /> {cocktailItem.id}
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-base">Méthode</h3>
              <ul>
                <li />
              </ul>
            </div>
            <h3 className="text-base">L&apos;histoire du {}:</h3>
            <p>{cocktailItem.content}</p>
            <div className="text-base items-center">
              <p className="pb-6 text-center">Donnez votre avis !</p>
              <div className="text-base flex items-center gap-8 justify-center">
                <Rating />
                <Link
                  to={`/cocktail/${cocktailItem.slug}/commentaires`}
                  className="text-white bg-gradient-to-r from-purple-700 via-pink-500 to-orange-500 font-medium rounded-lg text-sm p-2"
                >
                  Commenter ce cocktail
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CocktailById;
