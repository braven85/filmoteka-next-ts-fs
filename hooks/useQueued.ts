import { create } from 'zustand';

interface QueuedStore {
  queued: boolean;
  toggleQueued: () => void;
  resetQueued: () => void;
}

const useQueued = create<QueuedStore>((set) => ({
  queued: false,
  toggleQueued: () => set((state) => ({ queued: !state.queued })),
  resetQueued: () => set({ queued: false }),
}));

export default useQueued;
