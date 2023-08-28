/* eslint-disable @typescript-eslint/no-explicit-any */
export type Category = {
  id: number;
  slug: string;
  name: string;
};

export type Comment = {
  id: number;
  content: string;
  posted_at: string;
  user: { id: number; pseudonym: string };
};

export type Cocktails = {
  map(arg0: (data: any) => JSX.Element): import('react').ReactNode;
  id: number;
  name: string;
  slug: string;
  categories: Array<{ id: number; name: string; slug: string }>;
  description: string;
  picture: string;
  difficulty: number;
  preparation_time: number;
  trick: string;
  rating: number;
  steps: Array<{
    id: number;
    content: string;
  }>;
  cocktailUses: Array<{
    quantity: number;
    ingredient: {
      id: number;
      name: string;
      typeingredient: { id: number; name: string };
    };
    unit: { id: number; name: string };
  }>;
  glass: { id: number; name: string };
  ice: { id: number; name: string };
  technical: { id: number; name: string };
  comments: Comment[];
};

export type Ingredient = {
  id: number;
  name: string;
};

export type IngredientCategory = {
  name: string;
  ingredients: Ingredient[];
};

export type IngredientsData = {
  ingredients: IngredientCategory[];
  glass: { id: number; name: string }[];
  ices: { id: number; name: string }[];
  technicals: { id: number; name: string }[];
  units: { id: number; name: string }[];
};
