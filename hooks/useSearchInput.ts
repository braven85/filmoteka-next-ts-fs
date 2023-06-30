import { create } from 'zustand';

interface SearchInputStore {
  searchInput: string | undefined;
  setSearchInput: (input: string) => void;
}

const useSearchInput = create<SearchInputStore>(set => ({
  searchInput: undefined,
  setSearchInput: input => set({ searchInput: input }),
}));

export default useSearchInput;
