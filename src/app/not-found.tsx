import { Button } from "@/components/ui/button";
import Link from "next/link";

export const dynamic = "force-static";

const NotFoundPage = () => {
  return (
    <main className="container">
      <div className="flex min-h-[80svh] flex-col items-center justify-center gap-2">
        <h1 className="text-xl font-bold md:text-3xl">
          The Page You Are Looking For Not Found.
        </h1>
        <p className="text-sm text-muted-foreground md:text-base">
          Please go to home page and try again.
        </p>
        <Button asChild>
          <Link href="/">Home</Link>
        </Button>
      </div>
    </main>
  );
};

export default NotFoundPage;
