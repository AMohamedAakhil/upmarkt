import { create } from 'zustand';

interface useSubCategoryModalStore {
  isOpen: boolean;
  isClose: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSubCategoryModal = create<useSubCategoryModalStore>((set) => ({
  isOpen: false,
  isClose: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, isClose: true }),
}));