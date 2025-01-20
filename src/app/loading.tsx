import { Loader } from "lucide-react";


const LoadingPage = () => {
  return (
    <div className="flex min-h-[80svh] w-full items-center justify-center">
      <Loader size={100} className="animate-spin text-primary" />
    </div>
  );
};

export default LoadingPage;
