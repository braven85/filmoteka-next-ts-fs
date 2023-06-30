'use client';

import MovieCard from '@/components/MovieCard';
import Pagination from '@/components/Pagination';
import useIsLoggedIn from '@/hooks/useIsLoggedIn';
import useMoviesList from '@/hooks/useMoviesList';
import usePage from '@/hooks/usePage';
import useQueuedMovies from '@/hooks/useQueuedMovies';
import useSearchInput from '@/hooks/useSearchInput';
import useTotalPagPages from '@/hooks/useTotalPagPages';
import useTotalResults from '@/hooks/useTotalResults';
import useWatchedMovies from '@/hooks/useWatchedMovies';
import { MovieByIdFromDbProps, SafeUser } from '@/types';
import { useEffect } from 'react';

interface HomePageProps {
  currentUser: SafeUser | null;
  watchedMoviesFromDatabase: MovieByIdFromDbProps[];
  queuedMoviesFromDatabase: MovieByIdFromDbProps[];
}

const HomePage: React.FC<HomePageProps> = ({
  currentUser,
  watchedMoviesFromDatabase,
  queuedMoviesFromDatabase,
}) => {
  const { moviesList, setMoviesList } = useMoviesList();
  const { page, setPage } = usePage();
  const { searchInput } = useSearchInput();
  const { setTotalPagPages } = useTotalPagPages();
  const { setTotalResults } = useTotalResults();
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

  const setData = (data: any) => {
    setMoviesList(data.results);
    setTotalPagPages(data.total_pages);
    setTotalResults(data.total_results);
  };

  const fetchTrendingMovies = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=ee05cb5c4e7bec8bf2cb81503e07020d&page=${page}`
      );

      if (!res.ok) {
        throw new Error('Something went wrong!');
      } else {
        return res.json().then((data) => setData(data));
      }
    } catch (error) {
      return console.error(error);
    }
  };

  useEffect(() => {
    if (page !== 1) setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  useEffect(() => {
    if (searchInput === '' || searchInput === undefined) {
      fetchTrendingMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput, page]);

  return (
    <>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-x-7'>
        {moviesList?.map((movie) => (
          <MovieCard key={movie.id} data={movie} />
        ))}
      </div>
      <Pagination />
    </>
  );
};

export default HomePage;
