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

function ForgotPasswordForm({
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
        className="relative mt-24 space-y-8 rounded bg-gray-200 py-7 lg:py-10 md:mt-0 min-w-75 sm:min-w-100 w-1/2 md:max-w-md px-8 md:px-10 lg:px-14"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-black">Reset Password</h1>
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
        </div>
  
        <button
          type="submit"
          className="w-full rounded bg-[#e50914] py-3 font-semibold hover:bg-[#cc0812] cursor-pointer active:scale-95 transition duration-150"
        >
          Send Reset Link
        </button>
  
        <div className="text-black text-sm sm:text-base">
            <div>
            Have your password?
          <button
            type="button"
            className="text-black hover:underline ml-2 cursor-pointer active:scale-95"
            onClick={onSignIn}
            >
            Sign in
          </button>
              </div>
              <div>
            Don&apos;t have an account?
          <button
            type="button"
            className="text-black hover:underline ml-2 cursor-pointer active:scale-95"
            onClick={onSignIn}
            >
            Sign up
          </button>
              </div>
        </div>
      </form>
    );
}

export default ForgotPasswordForm