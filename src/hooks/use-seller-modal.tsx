import { create } from "zustand";

interface useSellerModalStore {
  isOpen: boolean;
  isClose: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSellerModal = create<useSellerModalStore>((set) => ({
  isOpen: false,
  isClose: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, isClose: true }),
}));
