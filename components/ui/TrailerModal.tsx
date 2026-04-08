"use client";

import { useTrailerStore } from "@/store/useTrailerStore";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { Element, Genre } from "@/typings";
import { baseUrl } from "@/constants/movie";
import { Modal } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import { PlusIcon } from "@heroicons/react/24/solid";
import { LuThumbsUp } from "react-icons/lu";
import { MdVolumeOff, MdVolumeUp } from "react-icons/md";

function TrailerModal() {
  const { selectedMovie, trailerUrl, closeTrailer, isOpen } = useTrailerStore();
  const [trailer, setTrailer] = useState<string | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (!selectedMovie) return;
    console.log("Selected movie:", selectedMovie);

    async function fetchTrailer() {
      try {
        const { data } = await axios.get(trailerUrl!);
        if (data?.videos) {
          const trailerVideo = data.videos.results.find(
            (element: Element) => element.type === "Trailer",
          );
          setTrailer(trailerVideo?.key ?? null);
        } else {
          setTrailer(null);
        }
        if (data?.genres) {
          setGenres(data.genres);
        }
      } catch (error) {
        setTrailer(null);
        console.error("Failed to fetch trailer:", error);
      }
    }

    fetchTrailer();

    return () => {
      setTrailer(null);
    };
  }, [selectedMovie, trailerUrl]);

  console.log("Trailer data:", trailer);

  return (
    <Modal
      open={isOpen}
      onClose={closeTrailer}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="fixed top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden rounded-md"
    >
      <div>
        <button
          onClick={closeTrailer}
          className="absolute right-5 top-5 z-50 h-9 w-9 border-none outline-none bg-[#181818] flex items-center justify-center rounded-full cursor-pointer"
        >
          <IoClose className="h-6 w-6 text-white" />
        </button>

        <div className="relative pt-[56.25%]">
          {trailer ? (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailer}`}
              width="100%"
              height="100%"
              style={{ position: "absolute", top: "0", left: "0" }}
              playing
              muted={muted}
            />
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${baseUrl}${selectedMovie?.backdrop_path || selectedMovie?.poster_path || ""})`,
              }}
            />
          )}
          <div className="absolute bottom-7 flex w-full items-center justify-between px-10">
            <div className="flex space-x-4">
              <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6] cursor-pointer">
                <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
                Play
              </button>

              <button className="h-4 w-4 md:h-10 md:w-10 bg-gray-400/30 rounded-full flex justify-center items-center cursor-pointer border-2 border-gray-500 hover:bg-transparent">
                <PlusIcon className="w-[80%] h-[80%] text-white" />
              </button>
              <button className="h-4 w-4 md:h-10 md:w-10 bg-gray-400/30 rounded-full flex justify-center items-center cursor-pointer border-2 border-gray-500 hover:bg-transparent">
                <LuThumbsUp className="w-[60%] h-[60%] text-white" />
              </button>
            </div>
            <button className="cursor-pointer" onClick={() => setMuted(!muted)}>
              {muted ? (
                <MdVolumeOff className="h-10 w-10 text-white" />
              ) : (
                <MdVolumeUp className="h-10 w-10 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default TrailerModal;
