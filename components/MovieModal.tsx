"use client";

import useMovieId from "@/hooks/useMovieId";
import useMovieModal from "@/hooks/useMovieModal";
import { MovieByIdFromDbProps, MovieByIdProps } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import noPoster from "../public/noPoster.png";
import Button from "./Button";
import axios from "axios";
import useWatchedMovies from "@/hooks/useWatchedMovies";
import useQueuedMovies from "@/hooks/useQueuedMovies";
import useIsLoggedIn from "@/hooks/useIsLoggedIn";
import { toast } from "react-toastify";
import useLoginModal from "@/hooks/useLoginModal";

const MovieModal = () => {
  const [movieData, setMovieData] = useState<MovieByIdProps | undefined>();

  const { watchedMovies, setWatchedMovies } = useWatchedMovies();
  const { queuedMovies, setQueuedMovies } = useQueuedMovies();

  const movieModal = useMovieModal();
  const loginModal = useLoginModal();
  const { movieId, setMovieId } = useMovieId();
  const { isLoggedIn } = useIsLoggedIn();

  const checkIsMovieWatched = (): boolean => {
    const isWatched = watchedMovies.find((movie) => movie?.movieId === movieId);

    if (isWatched) {
      return true;
    } else {
      return false;
    }
  };

  const [isMovieWatched, setIsMovieWatched] = useState<boolean>(checkIsMovieWatched());

  const checkIsMovieQueued = (): boolean => {
    const isQueued = queuedMovies.find((movie) => movie?.movieId === movieId);

    if (isQueued) {
      return true;
    } else {
      return false;
    }
  };

  const [isMovieQueued, setIsMovieQueued] = useState<boolean>(checkIsMovieQueued());

  const fetchMovieById = async (movieId: number | string | undefined): Promise<void> => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=ee05cb5c4e7bec8bf2cb81503e07020d`);

      if (!res.ok) {
        throw new Error("Something went wrong!");
      } else {
        return res.json().then((data) => setMovieData(data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovieById(movieId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleModalClose = () => {
    movieModal.onClose();
    setMovieId(undefined);
  };

  let moviePoster;
  if (movieData?.poster_path !== null) {
    moviePoster = `https://image.tmdb.org/t/p/w500${movieData?.poster_path}`;
  } else {
    moviePoster = noPoster;
  }

  let genresNames: string[] = [];
  if (movieData && movieData.genres) {
    for (const genre of movieData.genres) {
      if (genre && genre.name) {
        genresNames.push(genre.name);
      }
    }
  }
  const genresJoinedWithComma = genresNames.join(", ");

  const handleWatchedOnClick = () => {
    if (!isLoggedIn) {
      loginModal.onOpen();
      return;
    }

    if (isMovieQueued) {
      // remove movie from queued
      const currentMovie = queuedMovies.find((movie) => movie.movieId === movieId);
      axios
        .delete(`/api/queuedMovies/${currentMovie?.id}`)
        .then(() => {
          const filteredQueuedMovies = queuedMovies.filter((movies) => movies.movieId !== movieData?.id);
          setQueuedMovies(filteredQueuedMovies);
        })
        .catch((error) => {
          console.log(error);
        });

      setIsMovieQueued(!isMovieQueued);

      // add movie to watched
      let posterPath: string | undefined;
      if (movieData?.poster_path === null) {
        posterPath = "empty";
      } else {
        posterPath = movieData?.poster_path;
      }

      axios
        .post("/api/watchedMovies", {
          title: movieData?.title,
          originalTitle: movieData?.original_title,
          movieId: movieData?.id,
          overview: movieData?.overview,
          popularity: movieData?.popularity,
          posterPath,
          releaseDate: movieData?.release_date,
          voteAverage: movieData?.vote_average,
          voteCount: movieData?.vote_count,
          genres: genresJoinedWithComma,
        })
        .then((res) => {
          toast.success(`You have successfully added ${movieData?.title} to watched!`);
          const newMovie: MovieByIdFromDbProps = {
            createdAt: res.data.createdAt,
            id: res.data.id,
            title: res.data.title,
            originalTitle: res.data.originalTitle,
            movieId: res.data.movieId,
            overview: res.data.overview,
            popularity: res.data.popularity,
            posterPath: res.data.posterPath,
            releaseDate: res.data.releaseDate,
            userId: res.data.userId,
            voteAverage: res.data.voteAverage,
            voteCount: res.data.voteCount,
            genres: genresJoinedWithComma,
          };
          const newWatchedMovies: MovieByIdFromDbProps[] = [...watchedMovies, newMovie];
          setWatchedMovies(newWatchedMovies);
        })
        .catch((error) => {
          console.log(error);
        });

      setIsMovieWatched(!isMovieWatched);

      return;
    }

    if (isMovieWatched) {
      // remove movie from watched
      const currentMovie = watchedMovies.find((movie) => movie.movieId === movieId);
      axios
        .delete(`/api/watchedMovies/${currentMovie?.id}`)
        .then(() => {
          toast.success(`You have successfully removed ${movieData?.title} from watched!`);
          const filteredWatchedMovies = watchedMovies.filter((movies) => movies.movieId !== movieData?.id);
          setWatchedMovies(filteredWatchedMovies);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // add movie to watched
      let posterPath: string | undefined;
      if (movieData?.poster_path === null) {
        posterPath = "empty";
      } else {
        posterPath = movieData?.poster_path;
      }

      axios
        .post("/api/watchedMovies", {
          title: movieData?.title,
          originalTitle: movieData?.original_title,
          movieId: movieData?.id,
          overview: movieData?.overview,
          popularity: movieData?.popularity,
          posterPath,
          releaseDate: movieData?.release_date,
          voteAverage: movieData?.vote_average,
          voteCount: movieData?.vote_count,
          genres: genresJoinedWithComma,
        })
        .then((res) => {
          toast.success(`You have successfully added ${movieData?.title} to watched!`);
          const newMovie: MovieByIdFromDbProps = {
            createdAt: res.data.createdAt,
            id: res.data.id,
            title: res.data.title,
            originalTitle: res.data.originalTitle,
            movieId: res.data.movieId,
            overview: res.data.overview,
            popularity: res.data.popularity,
            posterPath: res.data.posterPath,
            releaseDate: res.data.releaseDate,
            userId: res.data.userId,
            voteAverage: res.data.voteAverage,
            voteCount: res.data.voteCount,
            genres: genresJoinedWithComma,
          };
          const newWatchedMovies: MovieByIdFromDbProps[] = [...watchedMovies, newMovie];
          setWatchedMovies(newWatchedMovies);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    setIsMovieWatched(!isMovieWatched);
  };

  const handleQueuedOnClick = () => {
    if (!isLoggedIn) {
      loginModal.onOpen();
      return;
    }

    if (isMovieWatched) {
      // remove movie from watched
      const currentMovie = watchedMovies.find((movie) => movie.movieId === movieId);
      axios
        .delete(`/api/watchedMovies/${currentMovie?.id}`)
        .then(() => {
          const filteredWatchedMovies = watchedMovies.filter((movies) => movies.movieId !== movieData?.id);
          setWatchedMovies(filteredWatchedMovies);
        })
        .catch((error) => {
          console.log(error);
        });
      setIsMovieWatched(!isMovieWatched);

      // add movie to queued
      let posterPath: string | undefined;
      if (movieData?.poster_path === null) {
        posterPath = "empty";
      } else {
        posterPath = movieData?.poster_path;
      }

      axios
        .post("/api/queuedMovies", {
          title: movieData?.title,
          originalTitle: movieData?.original_title,
          movieId: movieData?.id,
          overview: movieData?.overview,
          popularity: movieData?.popularity,
          posterPath,
          releaseDate: movieData?.release_date,
          voteAverage: movieData?.vote_average,
          voteCount: movieData?.vote_count,
          genres: genresJoinedWithComma,
        })
        .then((res) => {
          toast.success(`You have successfully added ${movieData?.title} to queued!`);
          const newMovie: MovieByIdFromDbProps = {
            createdAt: res.data.createdAt,
            id: res.data.id,
            title: res.data.title,
            originalTitle: res.data.originalTitle,
            movieId: res.data.movieId,
            overview: res.data.overview,
            popularity: res.data.popularity,
            posterPath: res.data.posterPath,
            releaseDate: res.data.releaseDate,
            userId: res.data.userId,
            voteAverage: res.data.voteAverage,
            voteCount: res.data.voteCount,
            genres: genresJoinedWithComma,
          };
          const newQueuedMovies: MovieByIdFromDbProps[] = [...queuedMovies, newMovie];
          setQueuedMovies(newQueuedMovies);
        })
        .catch((error) => {
          console.log(error);
        });

      setIsMovieQueued(!isMovieQueued);

      return;
    }

    if (isMovieQueued) {
      // remove movie from queued
      const currentMovie = queuedMovies.find((movie) => movie.movieId === movieId);
      axios
        .delete(`/api/queuedMovies/${currentMovie?.id}`)
        .then(() => {
          toast.success(`You have successfully removed ${movieData?.title} from queued!`);
          const filteredQueuedMovies = queuedMovies.filter((movies) => movies.movieId !== movieData?.id);
          setQueuedMovies(filteredQueuedMovies);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // add movie to queued
      let posterPath: string | undefined;
      if (movieData?.poster_path === null) {
        posterPath = "empty";
      } else {
        posterPath = movieData?.poster_path;
      }

      axios
        .post("/api/queuedMovies", {
          title: movieData?.title,
          originalTitle: movieData?.original_title,
          movieId: movieData?.id,
          overview: movieData?.overview,
          popularity: movieData?.popularity,
          posterPath,
          releaseDate: movieData?.release_date,
          voteAverage: movieData?.vote_average,
          voteCount: movieData?.vote_count,
          genres: genresJoinedWithComma,
        })
        .then((res) => {
          toast.success(`You have successfully added ${movieData?.title} to queued!`);
          const newMovie: MovieByIdFromDbProps = {
            createdAt: res.data.createdAt,
            id: res.data.id,
            title: res.data.title,
            originalTitle: res.data.originalTitle,
            movieId: res.data.movieId,
            overview: res.data.overview,
            popularity: res.data.popularity,
            posterPath: res.data.posterPath,
            releaseDate: res.data.releaseDate,
            userId: res.data.userId,
            voteAverage: res.data.voteAverage,
            voteCount: res.data.voteCount,
            genres: genresJoinedWithComma,
          };
          const newQueuedMovies: MovieByIdFromDbProps[] = [...queuedMovies, newMovie];
          setQueuedMovies(newQueuedMovies);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    setIsMovieQueued(!isMovieQueued);
  };

  return (
    <div className="fixed z-50 w-screen h-screen bg-white overflow-y-scroll pb-20 md:pb-0">
      <div className="flex justify-end">
        <div className="m-2 p-5 hover:cursor-pointer rounded-full" onClick={handleModalClose}>
          <HiXMark size={26} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center min-w-[240px] px-10">
        <div className="md:w-[50%] md:h-auto flex justify-center">
          <Image
            src={moviePoster}
            alt={`${movieData?.title} poster`}
            width={500}
            height={750}
            className="rounded-md w-[240px] md:w-[264px] lg:w-[396px]"
          />
        </div>
        <div className="md:w-[50%] flex flex-col justify-center items-center">
          <div className="flex flex-wrap text-center uppercase mt-6 text-xl lg:text-3xl font-medium">{movieData?.title}</div>
          <div className="flex text-xs lg:text-base font-medium mt-4 w-full">
            <div className="flex flex-col text-center w-[50%] text-modal-text-gray gap-y-2">
              <div>Vote / Votes</div>
              <div>Popularity</div>
              <div>Original Title</div>
              <div>Genre</div>
            </div>
            <div className="flex flex-col text-center w-[50%] gap-y-2">
              <div>
                <span className="text-white bg-vote-average-bg rounded-md py-[2px] px-2">
                  {movieData?.vote_average.toFixed(1)}
                </span>{" "}
                / <span className="bg-gray-100 rounded-md py-[2px] px-2">{movieData?.vote_count}</span>
              </div>
              <div>{movieData?.popularity.toFixed(1)}</div>
              <div>{movieData?.original_title}</div>
              <div>{genresJoinedWithComma}</div>
            </div>
          </div>
          <div className="flex uppercase text-sm lg:text-base font-medium mt-4">About</div>
          <div className="flex text-sm lg:text-base font-medium mt-2">{movieData?.overview}</div>
          <div className="flex w-full justify-evenly my-4 gap-x-2">
            <Button
              onClick={handleWatchedOnClick}
              className={`px-10 py-5
              ${isMovieWatched ? "bg-active-button-bg" : ""}
              ${isMovieWatched ? "border-active-button-bg" : ""}
              ${isMovieWatched ? "text-white" : ""}
            `}
            >
              {isMovieWatched ? "watched" : "add to watched"}
            </Button>
            <Button
              onClick={handleQueuedOnClick}
              className={`px-10 py-5
              ${isMovieQueued ? "bg-active-button-bg" : ""}
              ${isMovieQueued ? "border-active-button-bg" : ""}
              ${isMovieQueued ? "text-white" : ""}
            `}
            >
              {isMovieQueued ? "queued" : "add to queue"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
