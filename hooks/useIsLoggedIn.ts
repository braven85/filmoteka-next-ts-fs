import { create } from 'zustand';

interface IsLoggedInStore {
  isLoggedIn: boolean;
  setIsLoggedIn: () => void;
  setIsNotLoggedIn: () => void;
}

const useIsLoggedIn = create<IsLoggedInStore>(set => ({
  isLoggedIn: false,
  setIsLoggedIn: () => set({ isLoggedIn: true }),
  setIsNotLoggedIn: () => set({ isLoggedIn: false }),
}));

export default useIsLoggedIn;
