import { create } from 'zustand';

interface useCategoryModalStore {
  isOpen: boolean;
  afterFetch: boolean;
  isClose: boolean;
  onOpen: () => void;
  onClose: () => void;
  onFetch: () => void;
}

export const useCategoryModal = create<useCategoryModalStore>((set) => ({
  isOpen: false,
  isClose: false,
  afterFetch: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, isClose: true }),
  onFetch: () => set({ afterFetch: true}),
}));