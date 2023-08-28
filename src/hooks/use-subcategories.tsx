import { create } from "zustand";

type subCategoryType = {
  id: string;
  name: string;
  priorityNumber: number;
  imageUrl: string;
  categoryId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

interface useSubcategoryStore {
  subcategories: subCategoryType[];
  setSubcategories: (values: subCategoryType[]) => void;
}

export const useSubcategory = create<useSubcategoryStore>((set) => ({
  subcategories: [],
  setSubcategories: (values) => set({ subcategories: values }),
}));
