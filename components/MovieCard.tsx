import { TrendingMoviesProps } from "@/types";
import Image from "next/image";
import React from "react";
import movieGenres from "../helpers/movieGenres.json";
import noPoster from "../public/noPoster.png";
import useMovieModal from "@/hooks/useMovieModal";
import useMovieId from "@/hooks/useMovieId";

interface MovieCardProps {
  data: TrendingMoviesProps;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const movieModal = useMovieModal();
  const { setMovieId } = useMovieId();

  let genresNames = [];
  for (const genre of data.genre_ids) {
    const filteredMovieObject = movieGenres.filter((movieGenre) => movieGenre.id === genre);
    genresNames.push(filteredMovieObject[0].name);
  }
  const genresJoinedWithComma = genresNames.join(", ");

  const releaseYear = data.release_date.slice(0, 4);

  let moviePoster;
  if (data.poster_path !== null) {
    moviePoster = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
  } else {
    moviePoster = noPoster;
  }

  const handleOnMovieClick = () => {
    movieModal.onOpen();
    setMovieId(data.id);
  };

  return (
    <div
      onClick={handleOnMovieClick}
      className="flex flex-col justify-center items-center my-4 rounded-md hover:shadow-black shadow-md hover:cursor-pointer"
    >
      <Image
        src={moviePoster}
        alt={`${data.title} poster`}
        width={280}
        height={398}
        className="rounded-md"
      />
      <div className="flex max-w-[280px] text-center text-xs uppercase font-medium">{data.title}</div>
      <div className="flex max-w-[280px] text-center text-xs font-medium text-movie-genres-and-date">
        {genresJoinedWithComma} | {releaseYear}
      </div>
    </div>
  );
};

export default MovieCard;
