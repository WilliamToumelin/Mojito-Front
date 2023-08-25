/* eslint-disable @typescript-eslint/no-explicit-any */
export type Category = {
  id: number;
  slug: string;
  name: string;
};

export type Cocktails = {
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
  comments: {
    length: number;
    map(
      arg0: (
        comment: Cocktails & {
          comments: {
            id: number;
            content: string;
            posted_at: string;
            length: number;
            user: { id: number; pseudonym: string };
          }[];
        }
      ) => JSX.Element
    ): import('react').ReactNode;
    id: number;
    content: string;
    posted_at: string;
    user: { id: number; pseudonym: string };
  };
};
