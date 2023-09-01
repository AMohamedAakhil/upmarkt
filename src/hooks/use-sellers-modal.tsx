import { create } from "zustand";

interface useSellersModalStore {
  isOpen: boolean;
  isClose: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSellersModal = create<useSellersModalStore>((set) => ({
  isOpen: false,
  isClose: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, isClose: true }),
}));
