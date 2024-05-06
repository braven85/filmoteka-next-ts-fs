import { create } from 'zustand';

interface WatchedAndQueuedStore {
  watchedAndQueued: boolean;
  setWatchedAndQueued: () => void;
  setNotWatchedAndQueued: () => void;
}

const useWatchedAndQueued = create<WatchedAndQueuedStore>(set => ({
  watchedAndQueued: false,
  setWatchedAndQueued: () => set({ watchedAndQueued: true }),
  setNotWatchedAndQueued: () => set({ watchedAndQueued: false }),
}));

export default useWatchedAndQueued;
