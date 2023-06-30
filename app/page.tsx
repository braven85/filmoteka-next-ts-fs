import HomePage from '@/components/HomePage';
import getCurrentUser from './actions/getCurrentUser';
import getWatchedMovies from './actions/getWatchedMovies';
import getQueuedMovies from './actions/getQueuedMovies';

export default async function Home() {
  const currentUser = await getCurrentUser();

  const watchedMoviesFromDatabase = await getWatchedMovies({
    userId: currentUser?.id,
  });

  const queuedMoviesFromDatabase = await getQueuedMovies({
    userId: currentUser?.id,
  });

  return (
    <main className='flex flex-col justify-center items-center'>
      <HomePage
        currentUser={currentUser}
        watchedMoviesFromDatabase={watchedMoviesFromDatabase}
        queuedMoviesFromDatabase={queuedMoviesFromDatabase}
      />
    </main>
  );
}
