import { WEATHER_API_BASE_URL, WEATHER_API_KEY } from "@/constants";
import { AirQuality, CurrentWeather, DailyForecast, Location } from "@/types/weather";

export const airQualityDescriptions: Record<
  AirQuality["us-epa-index"],
  { text: string; color: string }
> = {
  1: { text: "Good", color: "green" },
  2: { text: "Fair", color: "lightgreen" },
  3: { text: "Moderate", color: "yellow" },
  4: { text: "Unhealthy", color: "orange" },
  5: { text: "Very Unhealthy", color: "red" },
  6: { text: "Hazardous", color: "darkred" },
};

export interface GetCurrentWeatherWithForecastApiResponse {
  location: Location;
  current: CurrentWeather;
  forecast: {
    forecastday: DailyForecast[];
  };
}

export const getCurrentWeatherWithForecast = async (q: string) => {
  const res = await fetch(
    `${WEATHER_API_BASE_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${q || "cairo"}&days=10&aqi=yes&alerts=yes`,
  );

  if (!res.ok) return null;

  const data: GetCurrentWeatherWithForecastApiResponse = await res.json();

  return data;
};
