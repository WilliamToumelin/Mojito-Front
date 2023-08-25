import { create } from 'zustand';

export const useCocktailStore = create(() => ({
  cocktails: [],
  loadingData: false,
  loadCocktails: async () => {
    try {
      set({ loadingData: true });
      const response = await fetch('http://localhost:5174/api/cocktails');
      set({ cocktails: response.json() });
    } catch {
      console.error('failure');
    } finally {
      set({ loadingData: false });
    }
  },
}));
