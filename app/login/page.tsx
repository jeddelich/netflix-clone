"use client";

import useAuth from "@/contexts/AuthContext";
import useModal, { AuthModal } from "@/contexts/ModalContext";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import SignInForm from "@/components/login/SignInForm";
import SignUpForm from "@/components/login/SignUpForm";
import ForgotPasswordForm from "@/components/login/ForgotPasswordForm";

interface Inputs {
  email: string;
  password: string;
}

interface ForgotPasswordInputs {
  email: string;
}

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [signInStatusMessage, setSignInStatusMessage] = useState("");
  const [signInStatusField, setSignInStatusField] = useState<"email" | "password">("password");
  const [forgotPasswordStatusMessage, setForgotPasswordStatusMessage] = useState("");
  const [forgotPasswordStatusType, setForgotPasswordStatusType] = useState<"success" | "error">("success");
  const { activeModal, setActiveModal } = useModal();
  const { signIn, signUp, resetPassword, checkEmailExists } = useAuth();
  
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

  const onSignInCredentialsChange = (value: string) => {
    if (!value.trim()) {
      setSignInStatusMessage("");
      setSignInStatusField("password");
      return;
    }

    if (signInStatusMessage) {
      setSignInStatusMessage("");
      setSignInStatusField("password");
    }
  };

  const switchModal = (modal: AuthModal) => {
    resetSignIn();
    resetSignUp();
    resetForgotPassword();
    setSignInStatusMessage("");
    setSignInStatusField("password");
    setForgotPasswordStatusMessage("");
    setShowPassword(false);
    setActiveModal(modal);
  };

  const onSignIn: SubmitHandler<Inputs> = async ({ email, password }) => {
    setSignInStatusMessage("");
    setSignInStatusField("password");

    try {
      await signIn(email, password);
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/wrong-password") {
          setSignInStatusField("password");
          setSignInStatusMessage("Incorrect password. Try again.");
          return;
        }

        if (error.code === "auth/user-not-found") {
          setSignInStatusField("email");
          setSignInStatusMessage("Email account doesn't exist. Try again.");
          return;
        }

        if (error.code === "auth/invalid-email") {
          setSignInStatusField("email");
          setSignInStatusMessage("Invalid email. Try again.");
          return;
        }

        if (error.code === "auth/invalid-credential") {
          setSignInStatusField("password");
          setSignInStatusMessage("Invalid email or password. Try again.");
          return;
        }
      }

      setSignInStatusField("password");
      setSignInStatusMessage("Unable to sign in. Please try again.");
    }
  };

  const onGuestLogin = async () => {
    await signIn("demo@guest.com", "preview123!");
  };

  const onSignUp: SubmitHandler<Inputs> = async ({ email, password }) => {
    await signUp(email, password);
  };

  const onForgotPassword: SubmitHandler<ForgotPasswordInputs> = async ({ email }) => {
    setForgotPasswordStatusMessage("");

    try {
      const emailExists = await checkEmailExists(email);

      if (!emailExists) {
        setForgotPasswordStatusType("error");
        setForgotPasswordStatusMessage("Email account doesn't exist. Try again.");
        return;
      }

      await resetPassword(email);
      setForgotPasswordStatusType("success");
      setForgotPasswordStatusMessage("Password reset email sent. Please check your inbox including spam.");
    } catch (error) {
      if (error instanceof FirebaseError && error.code === "auth/invalid-email") {
        setForgotPasswordStatusType("error");
        setForgotPasswordStatusMessage("Please enter a valid email.");
        return;
      }

      setForgotPasswordStatusType("error");
      setForgotPasswordStatusMessage("Unable to send reset email. Please try again.");
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
          statusMessage={signInStatusMessage}
          statusField={signInStatusField}
          passwordValue={signInPasswordValue}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          onCredentialsChange={onSignInCredentialsChange}
          onCreateAccount={() => switchModal("sign-up")}
          onForgotPassword={() => switchModal("forgot-password")}
          onGuestLogin={onGuestLogin}
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
