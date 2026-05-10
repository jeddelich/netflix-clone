"use client";

import useAuth from "@/contexts/AuthContext";
import useModal, { AuthModal } from "@/contexts/ModalContext";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import SignInForm from "@/components/ui/SignInForm";
import SignUpForm from "@/components/ui/SignUpForm";
import ForgotPasswordForm from "@/components/ui/ForgotPasswordForm";

interface Inputs {
  email: string;
  password: string;
}

interface ForgotPasswordInputs {
  email: string;
}

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordStatusMessage, setForgotPasswordStatusMessage] = useState("");
  const [forgotPasswordStatusType, setForgotPasswordStatusType] = useState<"success" | "error">("success");
  const { activeModal, setActiveModal } = useModal();
  const { signIn, signUp, resetPassword } = useAuth();
  
  const {
    register: registerSignIn,
    handleSubmit: handleSubmitSignIn,
    control: controlSignIn,
    reset: resetSignIn,
    formState: { errors: signInErrors },
  } = useForm<Inputs>();

  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    control: controlSignUp,
    reset: resetSignUp,
    formState: { errors: signUpErrors },
  } = useForm<Inputs>();

  const {
    register: registerForgotPassword,
    handleSubmit: handleSubmitForgotPassword,
    reset: resetForgotPassword,
    formState: { errors: forgotPasswordErrors },
  } = useForm<ForgotPasswordInputs>();

  const signInPasswordValue = useWatch({ control: controlSignIn, name: "password" });
  const signUpPasswordValue = useWatch({ control: controlSignUp, name: "password" });

  const onForgotPasswordEmailChange = (value: string) => {
    if (!value.trim()) {
      setForgotPasswordStatusType("success");
      setForgotPasswordStatusMessage("");
    }
  };

  const switchModal = (modal: AuthModal) => {
    resetSignIn();
    resetSignUp();
    resetForgotPassword();
    setForgotPasswordStatusMessage("");
    setShowPassword(false);
    setActiveModal(modal);
  };

  const onSignIn: SubmitHandler<Inputs> = async ({ email, password }) => {
    await signIn(email, password);
  };

  const onSignUp: SubmitHandler<Inputs> = async ({ email, password }) => {
    await signUp(email, password);
  };

  const onForgotPassword: SubmitHandler<ForgotPasswordInputs> = async ({ email }) => {
    setForgotPasswordStatusMessage("");

    try {
      await resetPassword(email);
      setForgotPasswordStatusType("success");
      setForgotPasswordStatusMessage("If account exists, the reset link was sent. (Please check your inbox including spam)");
    } catch (error) {
      if (error instanceof FirebaseError && error.code === "auth/user-not-found") {
        setForgotPasswordStatusType("error");
        setForgotPasswordStatusMessage("No account associated with this email.");
        return;
      }

      setForgotPasswordStatusType("error");
      setForgotPasswordStatusMessage("Please enter a valid email.");
    }
  };

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black items-center md:justify-center md:bg-transparent overflow-x-hidden">
      <Head>
        <title>Home - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          as="image"
          href="/netflix-background.jpg"
          media="(min-width: 768px)"
        />
      </Head>
      <picture className="absolute inset-0 -z-10 hidden sm:block">
        <source media="(min-width: 768px)" srcSet="/netflix-background.jpg" />
        <img
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
          alt=""
          className="h-full w-full object-cover opacity-60"
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      <Image
        src="/netflix-logo.svg"
        alt="Netflix logo"
        className="absolute left-4 top-4 z-10 cursor-pointer object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.9)] lg:left-10 lg:top-6"
        width={150}
        height={150}
      />
      {activeModal === "sign-in" && (
        <SignInForm
          register={registerSignIn}
          handleSubmit={handleSubmitSignIn}
          onSubmit={onSignIn}
          errors={signInErrors}
          passwordValue={signInPasswordValue}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          onCreateAccount={() => switchModal("sign-up")}
          onForgotPassword={() => switchModal("forgot-password")}
        />
      )}

      {activeModal === "sign-up" && (
        <SignUpForm
          register={registerSignUp}
          handleSubmit={handleSubmitSignUp}
          onSubmit={onSignUp}
          errors={signUpErrors}
          passwordValue={signUpPasswordValue}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          onSignIn={() => switchModal("sign-in")}
        />
      )}

      {activeModal === "forgot-password" && (
        <ForgotPasswordForm
          register={registerForgotPassword}
          handleSubmit={handleSubmitForgotPassword}
          onSubmit={onForgotPassword}
          errors={forgotPasswordErrors}
          onSignIn={() => switchModal("sign-in")}
          onSignUp={() => switchModal("sign-up")}
          statusMessage={forgotPasswordStatusMessage}
          statusType={forgotPasswordStatusType}
          onEmailChange={onForgotPasswordEmailChange}
        />
      )}
    </div>
  );
}

export default Login;
