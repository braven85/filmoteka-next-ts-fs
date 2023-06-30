'use client';

import React, { useEffect } from 'react';
import MovieCardFromDb from './MovieCardFromDb';
import { MovieByIdFromDbProps, SafeUser } from '@/types';
import useWatched from '@/hooks/useWatched';
import useQueued from '@/hooks/useQueued';
import useWatchedMovies from '@/hooks/useWatchedMovies';
import useQueuedMovies from '@/hooks/useQueuedMovies';
import useIsLoggedIn from '@/hooks/useIsLoggedIn';
import { useRouter } from 'next/navigation';

interface MoviesLibraryProps {
  currentUser: SafeUser | null;
  watchedMoviesFromDatabase: MovieByIdFromDbProps[];
  queuedMoviesFromDatabase: MovieByIdFromDbProps[];
}

const MoviesLibrary: React.FC<MoviesLibraryProps> = ({
  currentUser,
  watchedMoviesFromDatabase,
  queuedMoviesFromDatabase,
}) => {
  const { watched } = useWatched();
  const { queued } = useQueued();
  const wholeLibraryById = watchedMoviesFromDatabase.concat(queuedMoviesFromDatabase);
  const { watchedMovies, setWatchedMovies } = useWatchedMovies();
  const { queuedMovies, setQueuedMovies } = useQueuedMovies();
  const { setIsLoggedIn } = useIsLoggedIn();
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      setWatchedMovies(watchedMoviesFromDatabase);
      setQueuedMovies(queuedMoviesFromDatabase);
      setIsLoggedIn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    router.refresh();
  }, [watchedMovies, queuedMovies, router]);

  return (
    <>
      {currentUser ? (
        <>
          {wholeLibraryById.length === 0 && (
            <div className='text-red-600 text-4xl p-10 text-center'>Your library is empty!</div>
          )}
          <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-x-7'>
            {!watched &&
              !queued &&
              wholeLibraryById?.map((movie) => (
                <MovieCardFromDb key={movie.id} movieData={movie} />
              ))}
            {watched &&
              watchedMoviesFromDatabase?.map((movie) => (
                <MovieCardFromDb key={movie.id} movieData={movie} />
              ))}
            {queued &&
              queuedMoviesFromDatabase?.map((movie) => (
                <MovieCardFromDb key={movie.id} movieData={movie} />
              ))}
          </div>
        </>
      ) : (
        <div className='text-red-600 text-4xl p-10 text-center'>You are not logged in!</div>
      )}
    </>
  );
};

export default MoviesLibrary;
