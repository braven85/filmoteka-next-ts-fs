import { create } from "zustand";

interface HideWatchedStore {
  hideWatched: boolean;
  setHideWatched: () => void;
  setNotHideWatched: () => void;
}

const useHideWatched = create<HideWatchedStore>((set) => ({
  hideWatched: true,
  setHideWatched: () => set({ hideWatched: true }),
  setNotHideWatched: () => set({ hideWatched: false }),
}));

export default useHideWatched;
