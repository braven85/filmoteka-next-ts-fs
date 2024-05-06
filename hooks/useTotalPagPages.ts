import { create } from 'zustand';

interface TotalPagPagesStore {
  totalPagPages: number | undefined;
  setTotalPagPages: (pages: number | undefined) => void;
}

const useTotalPagPages = create<TotalPagPagesStore>(set => ({
  totalPagPages: undefined,
  setTotalPagPages: pages => set({ totalPagPages: pages }),
}));

export default useTotalPagPages;
