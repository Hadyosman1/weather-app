import { Loader } from "lucide-react";

export const dynamic = "force-static";

const LoadingPage = () => {
  return (
    <div className="flex min-h-[80svh] w-full items-center justify-center">
      <Loader size={80} className="animate-spin text-primary" />
    </div>
  );
};

export default LoadingPage;
