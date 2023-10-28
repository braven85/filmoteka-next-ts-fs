'use client';

import Image from 'next/image';
import React from 'react';
import noPoster from '../public/noPoster.png';
import useMovieModal from '@/hooks/useMovieModal';
import useMovieId from '@/hooks/useMovieId';
import { MovieByIdFromDbProps } from '@/types';

interface MovieCardProps {
  movieData: MovieByIdFromDbProps;
}

const MovieCardFromDb: React.FC<MovieCardProps> = ({ movieData }) => {
  const movieModal = useMovieModal();
  const { setMovieId } = useMovieId();

  let moviePoster;
  if (movieData.posterPath !== 'empty') {
    moviePoster = `https://image.tmdb.org/t/p/w500${movieData?.posterPath}`;
  } else {
    moviePoster = noPoster;
  }

  const releaseYear = movieData.releaseDate.slice(0, 4);

  const handleOnMovieClick = () => {
    movieModal.onOpen();
    setMovieId(movieData.movieId);
  };

  return (
    <div
      onClick={handleOnMovieClick}
      className='flex flex-col justify-center items-center my-4 rounded-md hover:shadow-black shadow-md hover:cursor-pointer'
    >
      <Image
        src={moviePoster}
        alt={`${movieData.title} poster`}
        width={280}
        height={398}
        className='rounded-md'
      />
      <div className='flex max-w-[280px] text-center text-xs uppercase font-medium'>
        {movieData.title}
      </div>
      <div className='flex max-w-[280px] text-center text-xs font-medium text-movie-genres-and-date'>
        {movieData.genres} | {releaseYear}
      </div>
    </div>
  );
};

export default MovieCardFromDb;
