"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type AuthModal = "sign-in" | "sign-up" | "forgot-password";

interface ModalContextValue {
	activeModal: AuthModal;
	setActiveModal: (modal: AuthModal) => void;
	openSignIn: () => void;
	openSignUp: () => void;
	openForgotPassword: () => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

interface ModalProviderProps {
	children: React.ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
	const [activeModal, setActiveModal] = useState<AuthModal>("sign-in");

	const value = useMemo(
		() => ({
			activeModal,
			setActiveModal,
			openSignIn: () => setActiveModal("sign-in"),
			openSignUp: () => setActiveModal("sign-up"),
			openForgotPassword: () => setActiveModal("forgot-password"),
		}),
		[activeModal],
	);

	return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export default function useModal() {
	const context = useContext(ModalContext);

	if (!context) {
		throw new Error("useModal must be used within a ModalProvider");
	}

	return context;
}

