import { create } from 'zustand';

interface WatchedStore {
  watched: boolean;
  setWatched: () => void;
  setNotWatched: () => void;
}

const useWatched = create<WatchedStore>(set => ({
  watched: false,
  setWatched: () => set({ watched: true }),
  setNotWatched: () => set({ watched: false }),
}));

export default useWatched;
