import React from 'react';
import getWatchedMovies from '../actions/getWatchedMovies';
import getCurrentUser from '../actions/getCurrentUser';
import MoviesLibrary from '@/components/MoviesLibrary';
import getQueuedMovies from '../actions/getQueuedMovies';

export default async function Library() {
  const currentUser = await getCurrentUser();

  const watchedMoviesFromDatabase = await getWatchedMovies({
    userId: currentUser?.id,
  });

  const queuedMoviesFromDatabase = await getQueuedMovies({
    userId: currentUser?.id,
  });

  return (
    <div className='flex flex-col justify-center items-center'>
      <MoviesLibrary
        currentUser={currentUser}
        watchedMoviesFromDatabase={watchedMoviesFromDatabase}
        queuedMoviesFromDatabase={queuedMoviesFromDatabase}
      />
    </div>
  );
}
