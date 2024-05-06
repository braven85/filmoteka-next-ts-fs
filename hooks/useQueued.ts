import { create } from 'zustand';

interface QueuedStore {
  queued: boolean;
  setQueued: () => void;
  setNotQueued: () => void;
}

const useQueued = create<QueuedStore>(set => ({
  queued: false,
  setQueued: () => set({ queued: true }),
  setNotQueued: () => set({ queued: false }),
}));

export default useQueued;
