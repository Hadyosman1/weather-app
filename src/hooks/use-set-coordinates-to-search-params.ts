import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getGeolocation } from "@/lib/geolocation";
import { useToast } from "@/hooks/use-toast";

const useSetCoordinatesToSearchParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    if (!searchParams.get("q")?.length) {
      const newSearchParams = new URLSearchParams(searchParams);
      let geolocation = "";

      getGeolocation(
        (pos) => {
          geolocation = `${pos.coords.latitude},${pos.coords.longitude}`;
          newSearchParams.set("q", geolocation);

          router.push(`/?${newSearchParams.toString()}`);
        },
        () => {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to get your location",
          });
        },
      );
    }
  }, [searchParams, router, toast]);
};

export default useSetCoordinatesToSearchParams;
