import React from 'react';
import { useParams } from 'react-router-dom';

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
    return <div>Cocktail introuvable</div>;
  }

  return (
    <article className="posts">
      <h1>{cocktailItem.title}</h1>
      <div>{cocktailItem.content}</div>
    </article>
  );
};

export default CocktailById;
