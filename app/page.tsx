import MovieBanner from "@/components/ui/MovieBanner";
import Navbar from "@/components/layout/Navbar";
import Row from "@/components/layout/Row";
import requests from "@/utils/requests";
import { useRecoilValue } from "recoil";
import { trailerState } from "@/atoms/TrailerAtom";
import TrailerModal from "@/components/ui/TrailerModal";

export default function Home() {
  const showTrailer = useRecoilValue(trailerState);
  
  return <HomeContent showTrailer={showTrailer} />;
}

async function HomeContent({ showTrailer }: { showTrailer: boolean }) {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return (
    <div className="relative">
      <Navbar />
      <div className="relative">
        <main className="pb-24">
          <MovieBanner netflixOriginals={netflixOriginals.results} />
          <section className="pl-4 lg:pl-16 -mt-32 lg:-mt-48 md:mt-0">
            <Row title="Trending Now" movies={trendingNow.results} />
            <Row title="Top Rated" movies={topRated.results} />
            <Row title="Action Thrillers" movies={actionMovies.results} />
            <Row title="Comedies" movies={comedyMovies.results} />
            <Row title="Scary Movies" movies={horrorMovies.results} />
            <Row title="Romance Movies" movies={romanceMovies.results} />
            <Row title="Documentaries" movies={documentaries.results} />
          </section>
        </main>
        {showTrailer && <TrailerModal />}
      </div>
    </div>
  );
}
