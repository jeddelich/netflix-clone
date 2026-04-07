"use client";

import { baseUrl } from "@/constants/movie"
import { Movie } from "@/typings"
import Image from "next/image"
import { useTrailerStore } from "@/store/useTrailerStore"

interface Props {
    movie: Movie
}

function MovieThumbnail({movie}: Props) {

  const { openTrailer } = useTrailerStore();

  return (
    <div className="relative h-28 min-w-45 cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-65 hover:scale-105">
        <Image
        src={`${baseUrl}${
          movie.backdrop_path || movie.poster_path
        }`}
        alt=""
        className="object-cover rounded-sm md:rounded"
        fill 
        sizes="25vw"
        onClick={() => openTrailer(movie, `https://api.themoviedb.org/3/${movie?.media_type === "movie" ? "movie" : "tv"}/${movie.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`)}
      />
    </div>
  )
}

export default MovieThumbnail