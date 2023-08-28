import { create } from "zustand";
import { Store } from "@prisma/client";

type Attribute = {
  id: string;
  name: string;
  store?: Store | null;
  storeId?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

interface useAttributeStore {
  attributes: Attribute[];
  selectedAttributes: Attribute[];
  setAttributes: (values: Attribute[]) => void;
  setSelectedAttributes: (values: Attribute[]) => void;
}

export const useAttribute = create<useAttributeStore>((set) => ({
  attributes: [],
  selectedAttributes: [],
  setAttributes: (values) => set({ attributes: values }),
  setSelectedAttributes: (values) => set({ selectedAttributes: values }),
}));
