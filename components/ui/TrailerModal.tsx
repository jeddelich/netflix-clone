"use client";

import { useTrailerStore } from "@/store/useTrailerStore";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { Element, Genre } from "@/typings";
import { Modal } from "@mui/material";
import { IoClose } from "react-icons/io5";

function TrailerModal() {
  const { selectedMovie, trailerUrl, closeTrailer, isOpen } = useTrailerStore();
  const [trailer, setTrailer] = useState<string | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (!selectedMovie) return;

    async function fetchTrailer() {
      try {
        const { data } = await axios.get(trailerUrl!);
        if (data?.videos) {
          const index = data.videos.results.findIndex(
            (element: Element) => element.type === "Trailer",
          );
          setTrailer(data.videos?.results[index]?.key);
        }
        if (data?.genres) {
          setGenres(data.genres);
        }
      } catch (error) {
        console.error("Failed to fetch trailer:", error);
      }
    }

    fetchTrailer();
  }, [selectedMovie]);

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
          { trailer && (
            <ReactPlayer
            url={trailer ? `https://www.youtube.com/watch?v=${trailer}` : ""}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
            muted={muted}
            />)
          }
        </div>
      </div>
    </Modal>
  );
}

export default TrailerModal;
