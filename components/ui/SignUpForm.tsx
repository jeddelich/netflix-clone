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
      className="relative mt-24 space-y-8 rounded bg-gray-200 py-7 lg:py-10 md:mt-0 min-w-75 sm:min-w-100 w-1/2 md:max-w-md px-6 md:px-10 lg:px-14"
    >
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-black">Create Your Account</h1>
      <div className="space-y-4">
        <label className="inline-block w-full">
          <input
            type="email"
            placeholder="Email"
            className="inputSignUp"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="p-1 text-[13px] font-light  text-red-600">
              Please enter a valid email.
            </p>
          )}
        </label>
        <label className="inline-block w-full relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="inputSignUp"
            {...register("password", { required: true })}
          />
          {passwordValue &&
            (showPassword ? (
              <FaRegEyeSlash
                className="text-gray-600 opacity-75 absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer hover:scale-95"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaRegEye
                className="text-gray-600 opacity-75 absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer hover:scale-95"
                onClick={() => setShowPassword(true)}
              />
            ))}
          {errors.password && (
            <p className="p-1 text-[13px] font-light  text-red-600">
              Your password must contain between 4 and 60 characters.
            </p>
          )}
        </label>
      </div>

      <button
        type="submit"
        className="w-full rounded bg-[#e50914] py-3 font-semibold hover:bg-[#cc0812] cursor-pointer active:scale-95 transition duration-150"
      >
        Sign Up
      </button>

      <div className="text-black">
        Already have an account?
        <button
          type="button"
          className="text-black hover:underline ml-2 cursor-pointer active:scale-95"
          onClick={onSignIn}
        >
          Sign in
        </button>
      </div>
    </form>
  );
}

export default SignUpForm;
