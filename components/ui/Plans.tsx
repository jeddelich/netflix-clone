"use client";

import Image from "next/image";
import Link from "next/link";
import useAuth from "@/contexts/AuthContext";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Product } from "@/typings";
import Table from "./Table";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { loadCheckout } from "@/lib/Stripe";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

function Plans() {
  const { logout, user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Product | null>(null);
  const [isPlansLoading, setIsPlansLoading] = useState(true);
  const [isBillingLoading, setIsBillingLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      const productsSnap = await getDocs(collection(db, "products")).catch(
        () => null,
      );

      if (!productsSnap) {
        if (isMounted) {
          setProducts([]);
          setIsPlansLoading(false);
        }
        return;
      }

      const fetchedProducts = await Promise.all(
        productsSnap.docs.map(async (productDoc) => {
          const pricesSnap = await getDocs(
            collection(db, "products", productDoc.id, "prices"),
          ).catch(() => null);

          const prices = pricesSnap
            ? pricesSnap.docs.map((priceDoc) => ({
                id: priceDoc.id,
                ...priceDoc.data(),
              }))
            : [];

          return {
            id: productDoc.id,
            ...productDoc.data(),
            prices,
          } as Product;
        }),
      );

      if (isMounted) {
        setProducts(fetchedProducts);
        setSelectedPlan(fetchedProducts[0] ?? null);
        setIsPlansLoading(false);
      }
    };

    void loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const subscribeToPlan = async () => {
    if (!user || !selectedPlan) return;
    const priceId = selectedPlan.prices[0]?.id;
    if (!priceId) return;

    setIsBillingLoading(true);
    await loadCheckout(user.uid, priceId);
  };

  return (
    <div>
      <header className="border-b border-white/10 bg-[#141414]">
        <Link href="/">
          <Image
            alt="Netflix Logo"
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            width={100}
            height={100}
            className="cursor-pointer object-contain"
          />
        </Link>
        <button
          className="text-lg font-medium hover:underline cursor-pointer"
          onClick={logout}
        >
          Sign Out
        </button>
      </header>

      <main className="pt-28 max-w-5xl px-5 pb-12 transition-all md:px-10 ">
        <h1 className="mb-3 text-3xl font-medium">
          Choose the plan that&apos;s right for you
        </h1>
        <ul>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="w-7 h-7 text-[#E50914]" />
            Watch all you want. Ad-free.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="w-7 h-7 text-[#E50914]" />
            Recommendations just for you.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="w-7 h-7 text-[#E50914]" />
            Change or cancel your plan anytime.
          </li>
        </ul>

        <div className="mt-4 flex flex-col space-y-4">
          <div className="flex w-full items-center justify-end self-end md:w-3/5">
            {products.map((product) => (
              <div
                key={product.id}
                className={`planBox ${selectedPlan?.id === product.id ? "opacity-100" : "opacity-60"} `}
                onClick={() => setSelectedPlan(product)}
              >
                {product.name}
              </div>
            ))}
          </div>

          {isPlansLoading ? (
            <div className="w-full py-6 flex justify-center">
              <Loader color="dark:fill-gray-300" />
            </div>
          ) : (
            <Table products={products} selectedPlan={selectedPlan} />
          )}

          <button
            disabled={!selectedPlan || isBillingLoading || isPlansLoading}
            className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#F6121D] md:w-105 ${isBillingLoading ? "opacity-60" : ""}`}
            onClick={subscribeToPlan}
          >
            {isBillingLoading ? (
              <Loader color="dark:fill-gray-300" />
            ) : (
              "Subscribe"
            )}
          </button>
        </div>
      </main>
    </div>
  );
}

export default Plans;
