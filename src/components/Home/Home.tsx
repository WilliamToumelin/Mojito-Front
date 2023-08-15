/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import './Home.scss';

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

const Home: React.FC<Props> = ({ categoriesData, cocktailList }) => {
  return (
    <div className="home">
      <h1>Home</h1>
    </div>
  );
};

export default Home;
