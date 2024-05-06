import { MovieByIdFromDbProps } from '@/types';
import { create } from 'zustand';

interface QueuedMoviesStore {
  queuedMovies: MovieByIdFromDbProps[];
  setQueuedMovies: (movies: MovieByIdFromDbProps[]) => void;
}

const useQueuedMovies = create<QueuedMoviesStore>(set => ({
  queuedMovies: [],
  setQueuedMovies: movies => set({ queuedMovies: movies }),
}));

export default useQueuedMovies;
