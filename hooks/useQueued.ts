import { create } from 'zustand';

interface QueuedStore {
  queued: boolean;
  toggleQueued: () => void;
}

const useQueued = create<QueuedStore>(set => ({
  queued: false,
  toggleQueued: () => set(state => ({ queued: !state.queued })),
}));

export default useQueued;
