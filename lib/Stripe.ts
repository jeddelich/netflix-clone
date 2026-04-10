import { addDoc, collection, onSnapshot } from "firebase/firestore";
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

export { loadCheckout };