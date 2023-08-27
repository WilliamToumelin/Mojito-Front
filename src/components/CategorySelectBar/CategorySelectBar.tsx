/* eslint-disable no-console */
import React, { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import anime from 'animejs/lib/anime';
import { Category } from '../../types/types';
import GradiantButtonOval from '../common/buttons/GradiantButtonOval';

interface CategorySelectBarProps {
  categoryId: number | null;
  setCategoryId: (id: number | null) => void;
}

const CategorySelectBar: React.FC<CategorySelectBarProps> = ({
  categoryId,
  setCategoryId,
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

  const categoriesDataMemo = useMemo(() => categoriesData, [categoriesData]);
  console.log(categoriesDataMemo);

  return (
    <div className="flex">
      <nav className="flex justify-center gap-4 no-underline text-white delay-30">
        {categoriesDataMemo.slice(0, 6).map((categoryItem: Category) => (
          <NavLink key={categoryItem.id} to="/">
            <GradiantButtonOval
              name={categoryItem.name}
              onClick={() => handleCategoryClick(categoryItem.id)}
            />
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default CategorySelectBar;
