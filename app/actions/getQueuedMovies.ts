import prisma from '@/libs/prismadb';

export interface QueuedMoviesParams {
  userId?: string;
}

export default async function getQueuedMovies(params: QueuedMoviesParams) {
  try {
    const { userId } = params;

    const queuedMovies = await prisma.queued.findMany({
      where: { userId: userId },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safeQueuedMovies = queuedMovies.map((movie) => ({
      ...movie,
      createdAt: movie.createdAt.toISOString(),
    }));

    return safeQueuedMovies;
  } catch (error: any) {
    throw new Error(error);
  }
}
