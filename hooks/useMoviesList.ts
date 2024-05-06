import { TrendingMoviesProps } from '@/types';
import { create } from 'zustand';

interface MoviesListStore {
  moviesList: TrendingMoviesProps[] | undefined;
  setMoviesList: (movies: TrendingMoviesProps[]) => void;
}

const useMoviesList = create<MoviesListStore>(set => ({
  moviesList: undefined,
  setMoviesList: movies => set({ moviesList: movies }),
}));

export default useMoviesList;
