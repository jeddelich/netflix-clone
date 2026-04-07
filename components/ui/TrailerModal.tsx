"use client";

import { useTrailerStore } from "@/store/useTrailerStore";
import { useEffect, useState } from "react";
import axios from "axios";

function TrailerModal() {

  const { selectedMovie, trailerUrl, closeTrailer } = useTrailerStore();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!selectedMovie) return;

    async function fetchTrailer() {

      try {
        const { data } = await axios.get(trailerUrl!);
        setData(data);
      } catch (error) {
        console.error("Failed to fetch trailer:", error);
      }
    }

    fetchTrailer();
  }, [selectedMovie, trailerUrl]);

  console.log("Trailer data:", data);

  return (
    <div>TrailerModal</div>
  )
}

export default TrailerModal