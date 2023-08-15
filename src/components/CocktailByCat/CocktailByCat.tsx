import React from 'react';
import { useParams } from 'react-router';
import CocktailById from '../CocktailById/CocktailById';
import SecondaryNavbar from '../SecondaryNavbar/SecondaryNavbar';

type Category = {
  id: number;
  slug: string;
  name: string;
};

type Cocktails = {
  categoryId: number;
  id: number;
  slug: string;
  content: string;
};

type Props = {
  categoriesData: Category[];
  cocktailList: Cocktails[];
};

const CocktailByCat: React.FC<Props> = ({ categoriesData, cocktailList }) => {
  const { categoryName } = useParams<{ categoryName: string }>();

  const categoryId = categoriesData.find(
    (category) => category.slug === categoryName
  )?.id;

  const filteredCocktails = cocktailList.filter(
    (cocktail) => cocktail.categoryId === categoryId
  );

  return (
    <div className="cocktailByCat-main">
      <div className="cocktailList-sidebar">
        <SecondaryNavbar filteredCocktails={filteredCocktails} />
      </div>
      <div className="cocktailsByCat">
        <h1>{categoryName}</h1>
        <div className="cocktail-list">
          {filteredCocktails.map((cocktailItemData: Cocktails, key) => (
            <CocktailById key={key} cocktailItem={cocktailItemData} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CocktailByCat;
