import { create } from "zustand";

interface useBrandModalStore {
  isOpen: boolean;
  isClose: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useBrandModal = create<useBrandModalStore>((set) => ({
  isOpen: false,
  isClose: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, isClose: true }),
}));
