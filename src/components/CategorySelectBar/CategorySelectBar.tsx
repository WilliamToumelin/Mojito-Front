/* eslint-disable no-console */
import React, { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import anime from 'animejs/lib/anime';
import { Category } from '../../types/types';
import MenuButton from '../common/buttons/MenuButton';

interface CategorySelectBarProps {
  categoryId: number | null;
  setCategoryId: (id: number | null) => void;
  categoryName: string | null;
  setCategoryName: (name: string | null) => void;
}

const CategorySelectBar: React.FC<CategorySelectBarProps> = ({
  categoryId,
  setCategoryId,
  categoryName,
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
            <MenuButton
              name={categoryItem.name}
              onClick={() => {
                handleCategoryClick(categoryItem.id);
                handleCategoryNameClick(categoryItem.name);
              }}
            />
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default CategorySelectBar;
