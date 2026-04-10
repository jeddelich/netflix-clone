import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
import { Subscription } from "@/typings";

function useSubscription(user: User | null) {

    const [subscription, setSubscription] = useState<Subscription | null | undefined>(undefined);

    useEffect(() => {
        if (!user) return;

        const unsubscribe = onSnapshot(
            collection(db, "customers", user.uid, "subscriptions"),
            (snapshot) => {
                const activeSubscription = snapshot.docs
                    .map((doc) => ({ id: doc.id, ...doc.data() } as Subscription))
                    .find(
                        (currentSubscription) =>
                            currentSubscription.status === "active" ||
                            currentSubscription.status === "trialing",
                    ) ?? null;

                setSubscription(activeSubscription);
            },
        );

        return unsubscribe;
    }, [user]);

    return user ? subscription : null;
}

export default useSubscription