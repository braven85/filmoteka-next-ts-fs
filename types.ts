import { User } from '@prisma/client';

export interface TrendingMoviesProps {
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
}

export interface MovieByIdProps {
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genres: [{ id: number; name: string }];
}

export interface MovieByIdFromDbProps {
  createdAt: string;
  id: string;
  userId: string;
  title: string;
  originalTitle: string;
  movieId: number;
  overview: string;
  popularity: number;
  posterPath: string;
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
  genres: string;
}

export type SafeUser = Omit<User, 'createdAt' | 'updatedAt' | 'emailVerified'> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
