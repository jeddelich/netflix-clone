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
  statusMessage?: string;
  statusType?: "success" | "error";
  onEmailChange?: (value: string) => void;
}

function ForgotPasswordForm({
  register,
  handleSubmit,
  onSubmit,
  errors,
  onSignIn,
  onSignUp,
  statusMessage,
  statusType = "success",
  onEmailChange,
}: ForgotPasswordFormProps) {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative mt-24 space-y-8 rounded-md bg-black/80 py-7 lg:py-10 md:mt-0 min-w-80 sm:min-w-100 w-1/2 md:max-w-md px-10 lg:px-14"
    >
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
        Reset Password
      </h1>
      <div className="space-y-4">
        <label className="inline-block w-full">
          <input
            type="email"
            placeholder="Email"
            className={`input ${statusType === "error" ? "border-orange-500! focus:border-orange-500!" : ""}`}
            {...register("email", {
              required: true,
              onChange: (event) => onEmailChange?.(event.target.value),
            })}
          />
          {errors.email && (
            <p className="p-1 text-[13px] font-light text-orange-500">
              Please enter a valid email.
            </p>
          )}
          {!errors.email && statusMessage &&
            (statusType === "success" ? (
              <p className="p-1 text-[13px] font-light text-gray-300 max-w-60">
                {statusMessage}
              </p>
            ) : (
              <p className="p-1 text-[13px] font-light text-orange-500 max-w-60">
                {statusMessage}
              </p>
            ))}
        </label>
      </div>

      <button
        type="submit"
        className="w-full rounded bg-[#d81f26] py-3 font-semibold hover:bg-[#f6121d] cursor-pointer active:scale-95 transition duration-150"
      >
        Send Reset Link
      </button>

      <div className="text-sm text-gray-400 flex flex-col gap-2">
        <button
          type="button"
          className="w-fit text-sm text-left text-gray-400 hover:underline cursor-pointer"
          onClick={onSignIn}
        >
          Remember your password?
        </button>

        <button
          type="button"
          className="text-white text-left text-base hover:underline cursor-pointer"
          onClick={onSignUp}
        >
          Create Your Netflix Account
        </button>
      </div>
    </form>
  );
}

export default ForgotPasswordForm;
