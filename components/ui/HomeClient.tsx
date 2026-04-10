"use client";

import Navbar from "@/components/layout/Navbar";
import Row from "@/components/layout/Row";
import { useTrailerStore } from "@/store/useTrailerStore";
import { Movie } from "@/typings";
import MovieBanner from "./MovieBanner";
import TrailerModal from "./TrailerModal";
import useAuth from "@/contexts/AuthContext";
import Plans from "./Plans";
import { Product } from "@/typings";
import useSubscription from "@/hooks/useSubscription";

type HomeClientProps = {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
  products: Product[];
};

export default function HomeClient({
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
  products,
}: HomeClientProps) {

  const isOpen = useTrailerStore((state) => state.isOpen);
  const { loading, user } = useAuth();
  const subscription = useSubscription(user);

  if (loading || (user && subscription === undefined)) return null;

  if (!subscription) return <Plans products={products} />;

  return (
    <div className="relative">
      <Navbar />
      <div className="relative">
        <main className="pb-24">
          <MovieBanner netflixOriginals={netflixOriginals} />
          <section className="pl-4 lg:pl-16 -mt-32 lg:-mt-48 md:mt-0">
            <Row title="Trending Now" movies={trendingNow} />
            <Row title="Top Rated" movies={topRated} />
            <Row title="Action Thrillers" movies={actionMovies} />
            <Row title="Comedies" movies={comedyMovies} />
            <Row title="Scary Movies" movies={horrorMovies} />
            <Row title="Romance Movies" movies={romanceMovies} />
            <Row title="Documentaries" movies={documentaries} />
          </section>
        </main>
        {isOpen && <TrailerModal />}
      </div>
    </div>
  );
}
