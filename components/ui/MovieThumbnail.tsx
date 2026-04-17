"use client";

import { tmdbThumbnailBaseUrl } from "@/constants/movie"
import { Movie } from "@/typings"
import Image from "next/image"
import { useTrailerStore } from "@/store/useTrailerStore"
import { DocumentData } from "firebase/firestore";
import { getMediaType } from "@/utils/getMediaType";

interface Props {
  movie: Movie | DocumentData;
}

function MovieThumbnail({movie}: Props) {

  const { openTrailer } = useTrailerStore();
  const mediaType = getMediaType(movie);

  return (
    <div className="relative h-28 min-w-45 cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-65 hover:scale-105">
        <Image
        src={`${tmdbThumbnailBaseUrl}${
          movie.backdrop_path || movie.poster_path
        }`}
        alt=""
        className="object-cover rounded-sm md:rounded"
        fill 
        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 20vw"
        quality={70}
        onClick={() =>
          openTrailer(
            movie,
            `https://api.themoviedb.org/3/${mediaType}/${movie.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`,
          )
        }
      />
    </div>
  )
}

export default MovieThumbnail