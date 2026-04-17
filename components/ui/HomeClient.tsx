"use client";

import Navbar from "@/components/layout/Navbar";
import Row from "@/components/layout/Row";
import { useTrailerStore } from "@/store/useTrailerStore";
import { Movie } from "@/typings";
import MovieBanner from "./MovieBanner";
import useAuth from "@/contexts/AuthContext";
import Plans from "./Plans";
import useSubscription from "@/hooks/useSubscription";
import useList from "@/hooks/useList";
import PageLoader from "@/components/ui/PageLoader";  
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const TrailerModal = dynamic(() => import("./TrailerModal"), {
  ssr: false,
});

type HomeClientProps = {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
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
}: HomeClientProps) {

  const isOpen = useTrailerStore((state) => state.isOpen);
  const { loading, user } = useAuth();
  const subscription = useSubscription(user);
  const list = useList(user?.uid);
  const [showSecondaryRows, setShowSecondaryRows] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSecondaryRows(true), 250);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (loading || (user && subscription === undefined)) return <PageLoader />;

  if (!user) return null;

  if (!subscription) return <Plans />;

  return (
    <div className="relative">
      <Navbar />
      <div className="relative">
        <main className="pb-24">
          <MovieBanner netflixOriginals={netflixOriginals} />
          <section className="pl-4 lg:pl-16 -mt-32 lg:-mt-48 md:mt-0">
            <section id="trending" className="scroll-m-20">
            <Row title="Trending Now" movies={trendingNow} />
            </section>
            <Row title="Top Rated" movies={topRated} />
            <Row title="Action Thrillers" movies={actionMovies} />
            {showSecondaryRows && (
              <>
             <section id="my-list" className="scroll-m-20">
            {list.length > 0 && <Row title="My List" movies={list} />}
             </section>
            <Row title="Comedies" movies={comedyMovies} />
            <Row title="Scary Movies" movies={horrorMovies} />
            <Row title="Romance Movies" movies={romanceMovies} />
            <Row title="Documentaries" movies={documentaries} />
              </>
            )}
          </section>
        </main>
        {isOpen && <TrailerModal />}
      </div>
    </div>
  );
}
