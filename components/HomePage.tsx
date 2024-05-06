"use client";

import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";
import useHideWatched from "@/hooks/useHideWatched";
import useIsLoggedIn from "@/hooks/useIsLoggedIn";
import useMoviesList from "@/hooks/useMoviesList";
import useQueuedMovies from "@/hooks/useQueuedMovies";
import useWatchedMovies from "@/hooks/useWatchedMovies";
import { MovieByIdFromDbProps, SafeUser, TrendingMoviesProps } from "@/types";
import { useEffect } from "react";

interface HomePageProps {
  currentUser: SafeUser | null;
  watchedMoviesFromDatabase: MovieByIdFromDbProps[];
  queuedMoviesFromDatabase: MovieByIdFromDbProps[];
}

const HomePage: React.FC<HomePageProps> = ({ currentUser, watchedMoviesFromDatabase, queuedMoviesFromDatabase }) => {
  const { moviesList } = useMoviesList();
  const { setWatchedMovies, watchedMovies } = useWatchedMovies();
  const { setQueuedMovies } = useQueuedMovies();
  const { setIsLoggedIn } = useIsLoggedIn();
  const { hideWatched } = useHideWatched();

  useEffect(() => {
    if (currentUser) {
      setWatchedMovies(watchedMoviesFromDatabase);
      setQueuedMovies(queuedMoviesFromDatabase);
      setIsLoggedIn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const haveWatchedMovies = watchedMovies.length > 0 ? true : false;

  let filteredMovies: TrendingMoviesProps[] | undefined = [];

  if (haveWatchedMovies && moviesList) {
    filteredMovies = moviesList.filter((movie) => {
      return watchedMovies.findIndex((watchedMovie) => watchedMovie.movieId === movie.id) === -1;
    });
  }

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-x-7 px-5">
        {!currentUser && moviesList?.map((movie) => <MovieCard key={movie.id} data={movie} />)}
        {currentUser && filteredMovies.length === 0 && moviesList?.map((movie) => <MovieCard key={movie.id} data={movie} />)}
        {currentUser &&
          hideWatched &&
          filteredMovies.length > 0 &&
          filteredMovies?.map((movie) => <MovieCard key={movie.id} data={movie} />)}
        {currentUser &&
          !hideWatched &&
          filteredMovies.length > 0 &&
          moviesList?.map((movie) => <MovieCard key={movie.id} data={movie} />)}
      </div>
      <Pagination />
    </>
  );
};

export default HomePage;
