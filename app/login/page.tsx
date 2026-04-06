"use client";

import useAuth from "@/contexts/AuthContext";
import useModal, { AuthModal } from "@/contexts/ModalContext";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
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

  const switchModal = (modal: AuthModal) => {
    resetSignIn();
    resetSignUp();
    resetForgotPassword();
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
    await resetPassword(email);
  };

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black items-center md:justify-center md:bg-transparent overflow-x-hidden">
      <Head>
        <title>Home - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="https://assets.nflxext.com/ffe/siteui/vlv3/d0982892-13ac-4702-b9fa-87a410c1f2da/519e3d3a-1c8c-4fdb-8f8a-7eabdbe87056/AE-en-20220321-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        fill
        className="-z-10 hidden! opacity-60 sm:inline!"
        objectFit="cover"
        alt=""
      />

      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix logo"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
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
        />
      )}
    </div>
  );
}

export default Login;
