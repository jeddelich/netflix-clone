import { baseUrl } from "@/constants/movie"
import { Movie } from "@/typings"
import Image from "next/image"

interface Props {
    movie: Movie
}

function Thumbnail({movie}: Props) {
  return (
    <div className="relative h-28 min-w-45 cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-65 hover:scale-105">
        <Image
        src={`${baseUrl}${
          movie.backdrop_path || movie.poster_path
        }`}
        alt=""
        className="object-cover rounded-sm md:rounded"
        fill 
        sizes="25vw"
      />
    </div>
  )
}

export default Thumbnail