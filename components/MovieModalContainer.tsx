'use client';

import useMovieModal from '@/hooks/useMovieModal';
import React from 'react';
import MovieModal from './MovieModal';

const MovieModalContainer = () => {
  const movieModal = useMovieModal();
  return <>{movieModal.isOpen && <MovieModal />}</>;
};

export default MovieModalContainer;
