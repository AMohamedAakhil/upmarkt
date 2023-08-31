import { create } from "zustand";

interface useDeleteModalStore {
  isOpen: boolean;
  isClose: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useDeleteModal = create<useDeleteModalStore>((set) => ({
  isOpen: false,
  isClose: false,
  afterFetch: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, isClose: true }),
}));
