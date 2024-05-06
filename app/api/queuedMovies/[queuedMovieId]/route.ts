import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/libs/prismadb';

interface IParams {
  queuedMovieId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { queuedMovieId } = params;

  if (!queuedMovieId || typeof queuedMovieId !== 'string') {
    throw new Error('Invalid ID');
  }

  const queuedMovie = await prisma.queued.deleteMany({
    where: {
      id: queuedMovieId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(queuedMovie);
}
