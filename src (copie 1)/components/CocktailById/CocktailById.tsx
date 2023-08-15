/* eslint-disable no-console */
import React from 'react';
import { Link } from 'react-router-dom';
import './CocktailById.scss';

type Cocktails = {
  categoryId: number;
  id: number;
  slug: string;
  content: string;
};

type Props = {
  cocktailItem: Cocktails;
};

const CocktailById: React.FC<Props> = ({ cocktailItem }) => {
  // console.log(cocktailItem);
  return (
    <article className="posts">
      <Link to={`/cocktail/${cocktailItem.slug}`}>
        <div>{cocktailItem.categoryId}</div>
        {/* <div>{cocktailItem.content}</div> */}
      </Link>
    </article>
  );
};

export default CocktailById;
