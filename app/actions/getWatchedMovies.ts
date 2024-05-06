import prisma from '@/libs/prismadb';

export interface WatchedMoviesParams {
  userId?: string;
}

export default async function getWatchedMovies(params: WatchedMoviesParams) {
  try {
    const { userId } = params;

    const watchedMovies = await prisma.watched.findMany({
      where: { userId: userId },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safeWatchedMovies = watchedMovies.map((movie) => ({
      ...movie,
      createdAt: movie.createdAt.toISOString(),
    }));

    return safeWatchedMovies;
  } catch (error: any) {
    throw new Error(error);
  }
}
