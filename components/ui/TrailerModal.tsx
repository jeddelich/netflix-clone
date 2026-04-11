"use client";

import { useTrailerStore } from "@/store/useTrailerStore";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { Element, Genre, Movie } from "@/typings";
import { baseUrl } from "@/constants/movie";
import { Modal } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import { CheckIcon, PlusIcon } from "@heroicons/react/24/solid";
import { LuThumbsUp } from "react-icons/lu";
import { MdVolumeOff, MdVolumeUp } from "react-icons/md";
import { collection, deleteDoc, doc, DocumentData, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import useAuth from "@/contexts/AuthContext";
import toast, { Toaster } from "react-hot-toast";

function TrailerModal() {

  const { user } = useAuth();

  const { selectedMovie, trailerUrl, closeTrailer, isOpen } = useTrailerStore();
  const [trailer, setTrailer] = useState<string | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(false);
  const [movies, setMovies] = useState<DocumentData[] | Movie[]>([]);

  const toastStyle = {
    background: 'white',
    color: 'black',
    fontWeight: 'bold',
    fontSize: '16px',
    padding: '15px',
    borderRadius: '9999px',
    maxWidth: '1000px',
  }

  const handleList = async () => {
  if (addedToList) {
    await deleteDoc(doc(db, "customers", user!.uid, "myList", selectedMovie!.id.toString()));
    
    toast(`${selectedMovie?.title || selectedMovie?.original_name} has been removed from My List`, {
      duration: 8000, style: toastStyle,
    })
  } else {
    await setDoc(doc(db, "customers", user!.uid, "myList", selectedMovie!.id.toString()), {
      ...selectedMovie
    });
    
    toast(`${selectedMovie?.title || selectedMovie?.original_name} has been added to My List`, {
      duration: 8000, style: toastStyle,
    });
  }
}

  useEffect(() => {
    if (user) {
      return onSnapshot(
        collection(db, 'customers', user.uid, 'myList'),
        (snapshot) => setMovies(snapshot.docs)
      )
    }
  }, [user])

  const addedToList =
    movies.findIndex((result) => result.data().id === selectedMovie?.id) !== -1;

  useEffect(() => {
    if (!selectedMovie) return;
    console.log("Selected movie:", selectedMovie);

    async function fetchTrailer() {
      try {
        const { data } = await axios.get(trailerUrl!);
        if (data?.videos) {
          const trailerVideo = data.videos.results?.find(
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
      className="fixed top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md"
    >
      <div>
        <Toaster position="bottom-center" />
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

              <button
                className="h-4 w-4 md:h-10 md:w-10 bg-gray-400/30 rounded-full flex justify-center items-center cursor-pointer border-2 border-gray-500 hover:bg-transparent"
                onClick={handleList}
              >
                {addedToList ? (
                  <CheckIcon className="w-[80%] h-[80%] text-white" />
                ) : (
                  <PlusIcon className="w-[80%] h-[80%] text-white" />
                )}
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

        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {selectedMovie!.vote_average * 10}% Match
              </p>
              <p className="font-light">
                {selectedMovie?.release_date || selectedMovie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>

            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{selectedMovie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres: </span>
                  {(genres ?? []).map((genre) => genre.name).join(", ")}
                </div>

                <div>
                  <span className="text-[gray]">Original Language: </span>
                  {selectedMovie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes: </span>
                  {selectedMovie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default TrailerModal;
