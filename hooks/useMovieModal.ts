import { create } from 'zustand';

interface MovieModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useMovieModal = create<MovieModalStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useMovieModal;
