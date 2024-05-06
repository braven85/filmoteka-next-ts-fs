import { NextResponse } from 'next/server';

import prisma from '@/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const {
    title,
    originalTitle,
    movieId,
    overview,
    popularity,
    posterPath,
    releaseDate,
    voteAverage,
    voteCount,
    genres,
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const queuedMovies = await prisma.queued.create({
    data: {
      title,
      originalTitle,
      movieId,
      overview,
      popularity,
      posterPath,
      releaseDate,
      voteAverage,
      voteCount,
      genres,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(queuedMovies);
}
