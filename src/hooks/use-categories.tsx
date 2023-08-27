import { create } from 'zustand';

type categoryType = {
  id: string;
  name: string;
  priorityNumber: number;
  imageUrl: string;
  storeId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

interface useCategoriesStore {
  categories: categoryType[];
  setCategories: (values: categoryType[]) => void;
}

export const useCategory = create<useCategoriesStore>((set) => ({
  categories: [],
  setCategories: (values) => set({ categories: values }),
}));
