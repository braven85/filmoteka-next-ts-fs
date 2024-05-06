import { create } from 'zustand';

interface PageStore {
  page: number;
  setPage: (pageNumber: number) => void;
}

const usePage = create<PageStore>(set => ({
  page: 1,
  setPage: pageNumber => set({ page: pageNumber }),
}));

export default usePage;
