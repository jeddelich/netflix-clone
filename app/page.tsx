import requests from "@/utils/requests";
import HomeClient from "@/components/ui/HomeClient";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { Product } from "@/typings";


export default async function Home() {

  const productsSnap = await getDocs(collection(db, "products")).catch(() => null);

  const products: Product[] = [];
  if (productsSnap) {
    for (const doc of productsSnap.docs) {
      const pricesSnap = await getDocs(collection(db, "products", doc.id, "prices")).catch(() => null);
      const prices = pricesSnap
        ? pricesSnap.docs.map((p) => ({ id: p.id, ...p.data() }))
        : [];
      products.push({ id: doc.id, ...doc.data(), prices } as Product);
    }
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
    <HomeClient
      netflixOriginals={netflixOriginals.results}
      trendingNow={trendingNow.results}
      topRated={topRated.results}
      actionMovies={actionMovies.results}
      comedyMovies={comedyMovies.results}
      horrorMovies={horrorMovies.results}
      romanceMovies={romanceMovies.results}
      documentaries={documentaries.results}
      products={products}
    />
  );
}
