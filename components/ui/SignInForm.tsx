import { Dispatch, SetStateAction } from "react";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { FaRegEye, FaRegEyeSlash, FaUserCircle } from "react-icons/fa";

interface Inputs {
  email: string;
  password: string;
}

interface SignInFormProps {
  register: UseFormRegister<Inputs>;
  handleSubmit: UseFormHandleSubmit<Inputs>;
  onSubmit: SubmitHandler<Inputs>;
  errors: FieldErrors<Inputs>;
  statusMessage?: string;
  statusField?: "email" | "password";
  passwordValue?: string;
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  onCredentialsChange?: (value: string) => void;
  onCreateAccount: () => void;
  onForgotPassword: () => void;
  onGuestLogin: () => void;
}

function SignInForm({
  register,
  handleSubmit,
  onSubmit,
  errors,
  statusMessage,
  statusField = "password",
  passwordValue,
  showPassword,
  setShowPassword,
  onCredentialsChange,
  onCreateAccount,
  onForgotPassword,
  onGuestLogin,
}: SignInFormProps) {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative mt-24 space-y-8 rounded-md bg-black/80 py-7 lg:py-10 md:mt-0 min-w-80 sm:min-w-100 w-1/2 md:max-w-md px-10 lg:px-14"
    >
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
        Sign In
      </h1>
      <div className="space-y-4">
        <label className="inline-block w-full">
          <input
            type="email"
            placeholder="Email"
            className="input"
            {...register("email", {
              required: true,
              onChange: (event) => onCredentialsChange?.(event.target.value),
            })}
          />
          {errors.email && (
            <p className="p-1 text-[13px] font-light  text-orange-500">
              Please enter a valid email address.
            </p>
          )}
          {!errors.email && statusMessage && statusField === "email" && (
            <p className="p-1 text-[13px] font-light text-orange-500 max-w-60">
              {statusMessage}
            </p>
          )}
        </label>
        <label className="inline-block w-full">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input"
              {...register("password", {
                required: true,
                onChange: (event) => onCredentialsChange?.(event.target.value),
              })}
            />
            {passwordValue &&
              (showPassword ? (
                <FaRegEyeSlash
                  className="opacity-75 absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer hover:scale-95"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaRegEye
                  className="opacity-75 absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer hover:scale-95"
                  onClick={() => setShowPassword(true)}
                />
              ))}
          </div>
          {errors.password && (
            <p className="p-1 text-[13px] font-light  text-orange-500">
              Your password must contain between 4 and 60 characters.
            </p>
          )}
          {!errors.password && statusMessage && statusField === "password" && (
            <p className="p-1 text-[13px] font-light text-orange-500 max-w-60">
              {statusMessage}
            </p>
          )}
        </label>
      </div>
          
      <button
        type="submit"
        className="w-full rounded bg-[#d81f26] py-3 font-semibold hover:bg-[#f6121d] cursor-pointer active:scale-95 transition duration-150"
      >
        Sign In
      </button>

      <div className="flex items-end justify-between gap-4">
        <div className="text-sm flex flex-col w-fit gap-2">
          <button
            type="button"
            className="w-fit text-sm text-left text-gray-400 hover:underline cursor-pointer"
            onClick={onForgotPassword}
          >
            Forgot your password?
          </button>

          <button
            type="button"
            className="text-white text-sm text-left sm:text-base hover:underline cursor-pointer"
            onClick={onCreateAccount}
          >
            Create Your Netflix Account
          </button>
        </div>

        <button
          type="button"
          className="group flex flex-col items-center gap-2 cursor-pointer"
          onClick={onGuestLogin}
          aria-label="Guest login"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2a4b8d] transition duration-150 group-hover:bg-[#3560b1] group-active:scale-95">
            <FaUserCircle className="text-2xl text-white" />
          </span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-[#9bb5e8]">
            Demo
          </span>
        </button>
      </div>
    </form>
  );
}

export default SignInForm;
