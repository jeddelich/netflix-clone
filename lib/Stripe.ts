import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import app from "@/firebase";
import { db } from "@/firebase";

const loadCheckout = async (userId: string, priceId: string) => {
  const checkoutSessionRef = await addDoc(
    collection(db, "customers", userId, "checkout_sessions"),
    {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    },
  );
  onSnapshot(checkoutSessionRef, (snap) => {
    const data = snap.data();
    if (!data) return;

    if (data.error) {
      console.error(data.error.message);
      return;
    }

    if (data.url) {
      window.location.assign(data.url);
    }
  });
};

const loadPortal = async () => {
  const functions = getFunctions(app, "us-central1");
  const createPortalLink = httpsCallable<
    { returnUrl: string },
    { url: string }
  >(functions, "ext-firestore-stripe-payments-createPortalLink");

  const { data } = await createPortalLink({
    returnUrl: window.location.origin,
  });

  if (data?.url) {
    window.location.assign(data.url);
    return;
  }

  throw new Error("Unable to create billing portal link.");
};

export { loadCheckout, loadPortal };