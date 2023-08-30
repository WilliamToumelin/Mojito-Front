/* eslint-disable no-console */
import React, { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import anime from 'animejs/lib/anime';
import { Category } from '../../types/types';
import RoundedButton from '../common/buttons/RoundedButton';

interface CategorySelectBarProps {
  categoryId: number | null;
  setCategoryId: (id: number | null) => void;
  setCategoryName: (name: string | null) => void;
}

const CategorySelectBar: React.FC<CategorySelectBarProps> = ({
  categoryId,
  setCategoryId,
  setCategoryName,
}) => {
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);

  useEffect(() => {
    fetch('http://localhost:5174/api/categories')
      .then((response) => response.json())
      .then((data: Category[]) => {
        setCategoriesData(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const animeCategory = () => {
    const random = () => {
      return anime.random(0, 0);
    };

    anime({
      targets: '.menu-link',
      translateY: () => random(),
      scale: [0, 1],
      delay: anime.stagger(150),
    });
  };

  useEffect(() => {
    animeCategory();
  }, [categoryId]);

  const handleCategoryClick = (clickedCategoryId: number) => {
    setCategoryId(clickedCategoryId);
  };

  const handleCategoryNameClick = (clickedCategoryName: string) => {
    setCategoryName(clickedCategoryName);
  };

  const categoriesDataMemo = useMemo(() => categoriesData, [categoriesData]);
  console.log(categoriesDataMemo);

  return (
    <div className="flex">
      <nav className="flex justify-center gap-4 no-underline delay-30">
        {categoriesDataMemo.slice(0, 6).map((categoryItem: Category) => (
          <NavLink key={categoryItem.id} to="/">
            <RoundedButton
              name={categoryItem.name}
              onClick={() => {
                handleCategoryClick(categoryItem.id);
                handleCategoryNameClick(categoryItem.name);
              }}
              height={48}
              width={112}
            />
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default CategorySelectBar;
