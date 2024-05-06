import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/libs/prismadb';

interface IParams {
  watchedMovieId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { watchedMovieId } = params;

  if (!watchedMovieId || typeof watchedMovieId !== 'string') {
    throw new Error('Invalid ID');
  }

  const watchedMovie = await prisma.watched.deleteMany({
    where: {
      id: watchedMovieId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(watchedMovie);
}
