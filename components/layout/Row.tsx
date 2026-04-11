"use client";

import { Movie } from "@/typings";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import MovieThumbnail from "../ui/MovieThumbnail";
import { useRef, useState } from "react";
import { DocumentData } from "firebase/firestore";

interface Props {
  title: string;
  movies: Movie[] | DocumentData[];
}

function Row({ title, movies }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const handleClick = (direction: string) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-0.5 md:space-y-1.5 sm:mt-2 md:mt-4 lg:mt-6 pb-4">
      <h2 className="w-fit cursor-pointer text-md sm:text-xl font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl lg:text-3xl">
        {title}
      </h2>
      <div className="group relative md:-ml-2">
        <div
          className={`transition duration-300 group/arrow-left flex items-center justify-center absolute top-1/2 transform -translate-y-1/2 left-0 md:left-2 z-40 m-auto h-28 md:h-36 w-10 md:w-12 cursor-pointer opacity-0 hover:bg-black/20 group-hover:opacity-100 ${!isMoved && "hidden"}`}
          onClick={() => handleClick("left")}
        >
          <ChevronLeftIcon className="transition duration-300 w-7 md:w-9 h-auto group-hover/arrow-left:scale-125" />
        </div>

        <div
          ref={rowRef}
          onScroll={() => {
            if (!rowRef.current) return;
            const { scrollLeft, clientWidth, scrollWidth } = rowRef.current;
            setIsMoved(scrollLeft > 0);
            setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
          }}
          className="scrollbar--remove flex items-center space-x-1.5 overflow-x-scroll md:space-x-2.5 md:m-2 overflow-y-hidden"
        >
          {movies.map((movie: Movie | DocumentData) => (
            <MovieThumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        <div
          className={`transition duration-300 group/arrow flex items-center justify-center absolute top-1/2 transform -translate-y-1/2 right-0 md:right-2 z-40 m-auto h-28 md:h-36 w-10 md:w-12 cursor-pointer opacity-0 hover:bg-black/20 group-hover:opacity-100 ${isAtEnd && "hidden"}`}
          onClick={() => handleClick("right")}
        >
          <ChevronRightIcon className="transition duration-300 w-7 md:w-9 h-auto group-hover/arrow:scale-125" />
        </div>
      </div>
    </div>
  );
}

export default Row;
