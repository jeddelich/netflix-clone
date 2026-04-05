"use client";

import { baseUrl } from "@/constants/movie";
import { Movie } from "@/typings";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";

interface Props {
  netflixOriginals: Movie[];
}

function MovieBanner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  return (
    movie && (
      <div className="relative w-full h-screen lg:h-[140vh] flex flex-col justify-end overflow-hidden">
        {/* Image container */}
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <Image
            src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
            alt={movie?.title || movie?.name || movie?.original_name}
            fill
            style={{ objectFit: "cover" }}
            priority
          />

          {/* Bottom fade overlay */}
          <div
            className="absolute bottom-0 left-0 w-full h-[70%] pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(20,20,20,0) 0%, #141414 100%)",
            }}
          />
        </div>

        {/* Banner content */}
        <div className="absolute top-1/3 sm:top-2/7 md:top-2/5 lg:top-1/3 left-4 lg:left-16 z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <p className="mt-2 max-w-xs text-xs sm:max-w-sm sm:text-sm md:max-w-lg md:text-lg lg:max-w-2xl lg:text-xl text-shadow-md">
            {movie?.overview}
          </p>

          <div className="flex space-x-3 mt-4">
            <button className="banner__btn bg-white text-black cursor-not-allowed transition hover:opacity-75">
              <FaPlay className="h-4 w-4 text-black" />
              Play
            </button>
            <button className="banner__btn bg-[gray]/70 flex items-center gap-x-1 transition hover:bg-[gray]/55 cursor-not-allowed">
              More Info{" "}
              <InformationCircleIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default MovieBanner;
