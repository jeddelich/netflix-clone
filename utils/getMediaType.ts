import { Movie } from "@/typings";
import { DocumentData } from "firebase/firestore";

export function getMediaType(movie: Movie | DocumentData): "tv" | "movie" {
  return movie.media_type === "tv" ||
    (!!movie.first_air_date && !movie.release_date)
    ? "tv"
    : "movie";
}
