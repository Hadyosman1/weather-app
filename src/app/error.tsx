"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ reset }: ErrorPageProps) => {
  return (
    <main className="container">
      <div className="flex min-h-[80svh] flex-col items-center justify-center gap-2">
        <h1 className="text-xl font-bold md:text-3xl">Something went wrong.</h1>
        <p className="text-sm text-muted-foreground md:text-base">
          Please go to home page or try again.
        </p>
        <div className="flex gap-2">
          <Button onClick={reset}>Try again</Button>
          <Button asChild variant="outline">
            <Link href="/">Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
