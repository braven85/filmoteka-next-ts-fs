import { create } from 'zustand';

interface WatchedStore {
  watched: boolean;
  toggleWatched: () => void;
  resetWatched: () => void;
}

const useWatched = create<WatchedStore>((set) => ({
  watched: false,
  toggleWatched: () => set((state) => ({ watched: !state.watched })),
  resetWatched: () => set({ watched: false }),
}));

export default useWatched;
