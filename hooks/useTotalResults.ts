import { create } from 'zustand';

interface TotalResultsStore {
  totalResults: number | undefined;
  setTotalResults: (results: number | undefined) => void;
}

const useTotalResults = create<TotalResultsStore>(set => ({
  totalResults: undefined,
  setTotalResults: results => set({ totalResults: results }),
}));

export default useTotalResults;
