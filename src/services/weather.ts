// TODO: Maybe i will delete this file in the future because it's not used and i can get current weather from forecast api

import { WEATHER_API_BASE_URL, WEATHER_API_KEY } from "@/constants";
import { CurrentWeather } from "@/types/weather";

export interface CurrentWeatherApiResponse {
  location: Location;
  current: CurrentWeather;
}

export const getCurrentWeather = async (q: string) => {
  const res = await fetch(
    `${WEATHER_API_BASE_URL}/current.json?key=${WEATHER_API_KEY}&q=${q || "Cairo"}&aqi=yes`,
  );

  const data: CurrentWeatherApiResponse = await res.json();

  if (!res.ok) return null;

  return data;
};
