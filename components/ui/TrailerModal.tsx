"use client";

import { useTrailerStore } from "@/store/useTrailerStore";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { Element, Genre } from "@/typings";
import { baseUrl } from "@/constants/movie";
import { Modal } from "@mui/material";
import { IoClose } from "react-icons/io5";

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
        </div>
      </div>
    </Modal>
  );
}

export default TrailerModal;
