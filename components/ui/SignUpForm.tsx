import { Dispatch, SetStateAction } from "react";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface Inputs {
  email: string;
  password: string;
}

interface SignUpFormProps {
  register: UseFormRegister<Inputs>;
  handleSubmit: UseFormHandleSubmit<Inputs>;
  onSubmit: SubmitHandler<Inputs>;
  errors: FieldErrors<Inputs>;
  passwordValue?: string;
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  onSignIn: () => void;
}

function SignUpForm({
  register,
  handleSubmit,
  onSubmit,
  errors,
  passwordValue,
  showPassword,
  setShowPassword,
  onSignIn,
}: SignUpFormProps) {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative mt-24 space-y-8 rounded-md bg-black/80 py-7 lg:py-10 md:mt-0 min-w-80 sm:min-w-100 w-1/2 md:max-w-md px-10 lg:px-14"
    >
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
        Create Your Account
      </h1>
      <div className="space-y-4">
        <label className="inline-block w-full">
          <input
            type="email"
            placeholder="Email"
            className="input"
            {...register("email", { required: true })}
          />
          {errors.email && (
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
            {...register("password", { required: true })}
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
          {errors.password && (
            <p className="p-1 text-[13px] font-light  text-orange-500">
              Your password must contain between 4 and 60 characters.
            </p>
          )}
        </label>
      </div>

      <button
        type="submit"
        className="w-full rounded bg-[#d81f26] py-3 font-semibold hover:bg-[#f6121d] cursor-pointer active:scale-95 transition duration-150"
      >
        Sign Up
      </button>

      <div className="text-sm text-gray-400">
        Already have an account?
        <button
          type="button"
          className="text-white hover:underline ml-2 cursor-pointer"
          onClick={onSignIn}
        >
          Sign in
        </button>
      </div>
    </form>
  );
}

export default SignUpForm;
