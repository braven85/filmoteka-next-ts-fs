"use client";

import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";
import useIsLoggedIn from "@/hooks/useIsLoggedIn";
import useMoviesList from "@/hooks/useMoviesList";
import useQueuedMovies from "@/hooks/useQueuedMovies";
import useWatchedMovies from "@/hooks/useWatchedMovies";
import { MovieByIdFromDbProps, SafeUser } from "@/types";
import { useEffect } from "react";

interface HomePageProps {
  currentUser: SafeUser | null;
  watchedMoviesFromDatabase: MovieByIdFromDbProps[];
  queuedMoviesFromDatabase: MovieByIdFromDbProps[];
}

const HomePage: React.FC<HomePageProps> = ({ currentUser, watchedMoviesFromDatabase, queuedMoviesFromDatabase }) => {
  const { moviesList } = useMoviesList();
  const { setWatchedMovies } = useWatchedMovies();
  const { setQueuedMovies } = useQueuedMovies();
  const { setIsLoggedIn } = useIsLoggedIn();

  useEffect(() => {
    if (currentUser) {
      setWatchedMovies(watchedMoviesFromDatabase);
      setQueuedMovies(queuedMoviesFromDatabase);
      setIsLoggedIn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-x-7 px-5">
        {moviesList?.map((movie) => (
          <MovieCard key={movie.id} data={movie} />
        ))}
      </div>
      <Pagination />
    </>
  );
};

export default HomePage;
