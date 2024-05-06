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
import Button from './Button';
import useLoginModal from '@/hooks/useLoginModal';
import useWatchedAndQueued from '@/hooks/useWatchedAndQueued';

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
  const { watchedAndQueued, setWatchedAndQueued } = useWatchedAndQueued();
  const { watched, setNotWatched } = useWatched();
  const { queued, setNotQueued } = useQueued();
  const loginModal = useLoginModal();
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
      setWatchedAndQueued();
      setNotWatched();
      setNotQueued();
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
          <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-x-7 px-5'>
            {watchedAndQueued &&
              wholeLibraryById?.map(movie => <MovieCardFromDb key={movie.id} movieData={movie} />)}
            {watched &&
              watchedMoviesFromDatabase?.map(movie => (
                <MovieCardFromDb key={movie.id} movieData={movie} />
              ))}
            {queued &&
              queuedMoviesFromDatabase?.map(movie => (
                <MovieCardFromDb key={movie.id} movieData={movie} />
              ))}
          </div>
        </>
      ) : (
        <>
          <div className='text-red-600 text-4xl p-10 text-center'>You are not logged in!</div>
          <div className='text-red-600 text-4xl pb-10 text-center'>
            Log in or sign up to use library functions!
          </div>
          <Button className='px-10 py-5 mb-10' onClick={loginModal.onOpen}>
            Login/Sign up
          </Button>
        </>
      )}
    </>
  );
};

export default MoviesLibrary;
