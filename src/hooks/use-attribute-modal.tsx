import { create } from "zustand";

interface useAttributeModalStore {
  isOpen: boolean;
  isClose: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useAttributeModal = create<useAttributeModalStore>((set) => ({
  isOpen: false,
  isClose: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, isClose: true }),
}));
