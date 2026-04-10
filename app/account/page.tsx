"use client";

import useAuth from "@/contexts/AuthContext";
import useSubscription from "@/hooks/useSubscription";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "@/typings";

function AccountPage() {
  const { user, logout } = useAuth();
  const subscription = useSubscription(user);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const productsSnap = await getDocs(collection(db, "products")).catch(
        () => null,
      );

      if (!productsSnap) {
        setProducts([]);
        return;
      }

      const fetchedProducts: Product[] = [];

      for (const doc of productsSnap.docs) {
        const pricesSnap = await getDocs(
          collection(db, "products", doc.id, "prices"),
        ).catch(() => null);
        const prices = pricesSnap
          ? pricesSnap.docs.map((priceDoc) => ({
              id: priceDoc.id,
              ...priceDoc.data(),
            }))
          : [];

        fetchedProducts.push({ id: doc.id, ...doc.data(), prices } as Product);
      }

      setProducts(fetchedProducts);
    };

    void loadProducts();
  }, []);

  const memberSince = subscription?.created
    ? new Date(subscription.created.seconds * 1000).toLocaleDateString()
    : "-";
  const isSubscriptionLoading = Boolean(user) && subscription === undefined;
  const currentProduct = products.find(
    (product) =>
      product.id === subscription?.product ||
      product.metadata.role?.toLowerCase() ===
        subscription?.role?.toLowerCase(),
  );
  const planName = isSubscriptionLoading
    ? "Loading plan..."
    : (currentProduct?.name ?? subscription?.role ?? "No active plan");

  return (
    <div>
      <header className={`bg-[#141414]`}>
        <Link href="/">
          <Image
            alt="Netflix Logo"
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            width={100}
            height={100}
            className="cursor-pointer object-contain"
          />
        </Link>
        <Link href="/account">
          <Image
            src="https://occ-0-1190-2774.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
            alt="User Avatar"
            width={32}
            height={32}
            className="cursor-pointer rounded"
          />
        </Link>
      </header>

      <main className="pt-24 mx-auto max-w-6xl px-5 pb-12 transition-all md:px-10">
        <div className="flex flex-col gap-x-4 md:flex-row md:items-center">
          <h1 className="text-3xl md:text-4xl">Account</h1>
          <div className="-ml-0.5 flex items-center gap-x-1.5">
            <img src="https://rb.gy/4vfk4r" alt="Membership Icon" />
            <p className="text-xs font-semibold text-[#555]">
              Member since: {memberSince}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0">
          <h4>Plan Details</h4>
          <div>{planName}</div>
          <p className="cursor-pointer text-blue-500 hover:underline md:text-right">
            Change plan
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
          <h4 className="text-lg text-[gray]">Settings</h4>
          <p
            className="col-span-3 cursor-pointer text-blue-500 hover:underline"
            onClick={logout}
          >
            Sign out of all devices
          </p>
        </div>
      </main>
    </div>
  );
}

export default AccountPage;
