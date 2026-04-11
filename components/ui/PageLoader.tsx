import Loader from "./Loader";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#141414] text-white">
      <div className="flex flex-col items-center gap-4">
        <Loader color="fill-red-500" size="h-12 w-12" />
      </div>
    </div>
  );
}