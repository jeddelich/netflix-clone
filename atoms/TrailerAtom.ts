import { DocumentData } from "firebase/firestore";
import { atom } from "recoil"; 
import { Movie } from "@/typings";

export const trailerState = atom<boolean>({
  key: "trailerState",
  default: false,
});

export const movieState = atom<Movie | DocumentData | null>({
  key: "movieState",
  default: null,
});
