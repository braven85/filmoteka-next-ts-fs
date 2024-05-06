import { create } from 'zustand';

interface MovieIdStore {
  movieId: number | string | undefined;
  setMovieId: (id: number | string | undefined) => void;
}

const useMovieId = create<MovieIdStore>(set => ({
  movieId: undefined,
  setMovieId: id => set({ movieId: id }),
}));

export default useMovieId;
