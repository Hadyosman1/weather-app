import { WEATHER_API_BASE_URL, WEATHER_API_KEY } from "@/constants";
import { SearchLocation } from "@/types/weather";

export const search = async (q: string): Promise<SearchLocation[]> => {
  const res = await fetch(
    `${WEATHER_API_BASE_URL}/search.json?key=${WEATHER_API_KEY}&q=${q ?? ""}`,
  );

  const data: SearchLocation[] = await res.json();

  if (!res.ok) return [];

  return data ?? [];
};
