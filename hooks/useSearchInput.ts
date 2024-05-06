import { create } from 'zustand';

interface SearchInputStore {
  searchInput: string;
  setSearchInput: (input: string) => void;
  resetSearchInput: () => void;
}

const useSearchInput = create<SearchInputStore>((set) => ({
  searchInput: '',
  setSearchInput: (input) => set({ searchInput: input }),
  resetSearchInput: () => set({ searchInput: '' }),
}));

export default useSearchInput;
