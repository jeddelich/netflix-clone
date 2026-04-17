import requests from "@/utils/requests";
import HomeClient from "@/components/ui/HomeClient";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { Product } from "@/typings";

const TMDB_REVALIDATE_SECONDS = 60 * 60;

async function fetchJson(url: string) {
  const response = await fetch(url, {
    next: { revalidate: TMDB_REVALIDATE_SECONDS },
  });

  if (!response.ok) return null;
  return response.json();
}

export default async function Home() {

  const productsSnap = await getDocs(collection(db, "products")).catch(() => null);

  const products: Product[] = [];
  if (productsSnap) {
    const productsWithPrices = await Promise.all(
      productsSnap.docs.map(async (doc) => {
        const pricesSnap = await getDocs(collection(db, "products", doc.id, "prices")).catch(() => null);
        const prices = pricesSnap
          ? pricesSnap.docs.map((p) => ({ id: p.id, ...p.data() }))
          : [];

        return { id: doc.id, ...doc.data(), prices } as Product;
      }),
    );

    products.push(...productsWithPrices);
  }

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
    fetchJson(requests.fetchNetflixOriginals),
    fetchJson(requests.fetchTrending),
    fetchJson(requests.fetchTopRated),
    fetchJson(requests.fetchActionMovies),
    fetchJson(requests.fetchComedyMovies),
    fetchJson(requests.fetchHorrorMovies),
    fetchJson(requests.fetchRomanceMovies),
    fetchJson(requests.fetchDocumentaries),
  ]);

  return (
    <HomeClient
      netflixOriginals={netflixOriginals?.results ?? []}
      trendingNow={trendingNow?.results ?? []}
      topRated={topRated?.results ?? []}
      actionMovies={actionMovies?.results ?? []}
      comedyMovies={comedyMovies?.results ?? []}
      horrorMovies={horrorMovies?.results ?? []}
      romanceMovies={romanceMovies?.results ?? []}
      documentaries={documentaries?.results ?? []}
      products={products}
    />
  );
}
