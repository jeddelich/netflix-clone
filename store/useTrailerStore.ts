import { create } from "zustand";
import { Movie } from "@/typings";
import { DocumentData } from "firebase/firestore";

interface TrailerStore {
  isOpen: boolean;
  selectedMovie: Movie | DocumentData | null;
  trailerUrl: string | null;
  openTrailer: (movie: Movie | DocumentData, trailerUrl: string) => void;
  closeTrailer: () => void;
}

export const useTrailerStore = create<TrailerStore>((set) => ({
  isOpen: false,
  selectedMovie: null,
  trailerUrl: null,

  openTrailer: (movie: Movie | DocumentData, trailerUrl: string) =>
    set({
      isOpen: true,
      selectedMovie: movie,
      trailerUrl: trailerUrl,
    }),

  closeTrailer: () =>
    set({
      isOpen: false,
      selectedMovie: null,
      trailerUrl: null,
    }),
}));