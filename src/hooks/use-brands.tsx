import { create } from "zustand";
import { Store } from "@prisma/client";
import { Product } from "@prisma/client";

type brandType = {
  id: string;
  name: string;
  logoUrl: string;
  store?: Store | null;
  storeId?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

interface useBrandsStore {
  brands: brandType[];
  setBrands: (values: brandType[]) => void;
}

export const useBrand = create<useBrandsStore>((set) => ({
  brands: [],
  setBrands: (values) => set({ brands: values }),
}));
