import { MovieByIdFromDbProps } from '@/types';
import { create } from 'zustand';

interface WatchedMoviesStore {
  watchedMovies: MovieByIdFromDbProps[];
  setWatchedMovies: (movies: MovieByIdFromDbProps[]) => void;
}

const useWatchedMovies = create<WatchedMoviesStore>(set => ({
  watchedMovies: [],
  setWatchedMovies: movies => set({ watchedMovies: movies }),
}));

export default useWatchedMovies;
