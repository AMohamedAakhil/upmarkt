import { create } from 'zustand';

interface useSubCategoryModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSubCategoryModal = create<useSubCategoryModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));