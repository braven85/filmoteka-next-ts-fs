import { create } from 'zustand';

interface WatchedStore {
  watched: boolean;
  toggleWatched: () => void;
}

const useWatched = create<WatchedStore>(set => ({
  watched: false,
  toggleWatched: () => set(state => ({ watched: !state.watched })),
}));

export default useWatched;
