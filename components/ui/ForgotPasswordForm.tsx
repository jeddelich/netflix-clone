import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

interface Inputs {
  email: string;
}

interface ForgotPasswordFormProps {
  register: UseFormRegister<Inputs>;
  handleSubmit: UseFormHandleSubmit<Inputs>;
  onSubmit: SubmitHandler<Inputs>;
  errors: FieldErrors<Inputs>;
  onSignIn: () => void;
  onSignUp: () => void;
}

function ForgotPasswordForm({
  register,
  handleSubmit,
  onSubmit,
  errors,
  onSignIn,
  onSignUp,
}: ForgotPasswordFormProps) {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative mt-24 space-y-8 rounded bg-gray-200 py-7 lg:py-10 md:mt-0 min-w-75 sm:min-w-100 w-1/2 md:max-w-md px-8 md:px-10 lg:px-14"
    >
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-black">
        Reset Password
      </h1>
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

      <div className="text-black text-sm sm:text-base flex flex-col gap-2">
        <button
          type="button"
          className="text-sm text-left w-fit text-gray-500 hover:underline cursor-pointer active:scale-95"
          onClick={onSignIn}
        >
          Have your password now?
        </button>

        <div className="text-base">
          Need an account?
          <button
            type="button"
            className="text-black hover:underline ml-2 cursor-pointer active:scale-95"
            onClick={onSignUp}
          >
            Sign up
          </button>
        </div>
      </div>
    </form>
  );
}

export default ForgotPasswordForm;
