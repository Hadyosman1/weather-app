import { WEATHER_API_BASE_URL, WEATHER_API_KEY } from "@/constants";

export interface SearchLocation {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

export const search = async (q: string): Promise<SearchLocation[]> => {
  console.log("fire SearchFn");
  const res = await fetch(
    `${WEATHER_API_BASE_URL}/search.json?key=${WEATHER_API_KEY}&q=${q ?? ""}`,
  );

  const data: SearchLocation[] = await res.json();

  return data ?? [];
};
