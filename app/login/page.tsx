"use client";

import useAuth from "@/hooks/useAuth";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface Inputs {
  email: string;
  password: string;
}

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginModal, setLoginModal] = useState(true);
  const {signIn, signUp} = useAuth() 
  
  const {
    register: registerSignIn,
    handleSubmit: handleSubmitSignIn,
    watch: watchSignIn,
    reset: resetSignIn,
    formState: { errors: signInErrors },
  } = useForm<Inputs>();

  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    watch: watchSignUp,
    reset: resetSignUp,
    formState: { errors: signUpErrors },
  } = useForm<Inputs>();

  const signInPasswordValue = watchSignIn("password");
  const signUpPasswordValue = watchSignUp("password");

  const onSignIn: SubmitHandler<Inputs> = async ({ email, password }) => {
    await signIn(email, password);
  };

  const onSignUp: SubmitHandler<Inputs> = async ({ email, password }) => {
    await signUp(email, password);
  };

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
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

      <img
        src="https://rb.gy/ulxxee"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
      />

{
        loginModal ? (
      <form
        onSubmit={handleSubmitSignIn(onSignIn)}
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className="input"
              {...registerSignIn("email", { required: true })}
            />
            {signInErrors.email && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className="inline-block w-full relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input"
              {...registerSignIn("password", { required: true })}
            />
            {
              signInPasswordValue && (
                showPassword ? (
                  <FaRegEyeSlash className="opacity-75 absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer hover:scale-95" onClick={() => setShowPassword(false)}/>
                ) : (
                  <FaRegEye className="opacity-75 absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer hover:scale-95" onClick={() => setShowPassword(true)} />
                )
              )
            } 
            {signInErrors.password && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>

        <button 
          type="submit"
          className="w-full rounded bg-[#e50914] py-3 font-semibold hover:bg-[#f6121d] cursor-pointer active:scale-95 transition duration-150" 
        >
          Sign In
        </button>

        <div>
          New to Netflix?
          <button type="button" className="text-white hover:underline ml-2 cursor-pointer active:scale-95" onClick={() => { setLoginModal(false); resetSignUp(); }}>
            Create an account
          </button>
        </div>
      </form>
        ) : (
          <form
        onSubmit={handleSubmitSignUp(onSignUp)}
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold">Create Your Account</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className="input"
              {...registerSignUp("email", { required: true })}
            />
            {signUpErrors.email && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className="inline-block w-full relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input"
              {...registerSignUp("password", { required: true })}
            />
            {
              signUpPasswordValue && (
                showPassword ? (
                  <FaRegEyeSlash className="opacity-75 absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer hover:scale-95" onClick={() => setShowPassword(false)}/>
                ) : (
                  <FaRegEye className="opacity-75 absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer hover:scale-95" onClick={() => setShowPassword(true)} />
                )
              )
            } 
            {signUpErrors.password && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>

        <button 
         type="submit"
          className="w-full rounded bg-[#e50914] py-3 font-semibold hover:bg-[#f6121d] cursor-pointer active:scale-95 transition duration-150" 
        >
          Sign Up
        </button>

        <div>
          Already have an account?
          <button type="button" className="text-white hover:underline ml-2 cursor-pointer active:scale-95" onClick={() => { setLoginModal(true); resetSignIn(); }}>
            Sign in
          </button>
        </div>
      </form>
        )
        }
    </div>
  );
}

export default Login;
