import { WEATHER_API_BASE_URL, WEATHER_API_KEY } from "@/constants";

export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export interface Condition {
  text: string;
  icon: string;
  code: number;
}

export interface AirQuality {
  co: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  "us-epa-index": number;
  "gb-defra-index": number;
}

export interface CurrentWeather {
  last_updated_epoch: number;
  last_updated: string;

  temp_c: number;
  temp_f: number;
  feelslike_c: number;
  feelslike_f: number;

  precip_mm: number;

  wind_kph: number;
  wind_degree: number;
  wind_dir: string;

  pressure_mb: number;
  vis_km: number;
  uv: number;

  humidity: number;
  cloud: number;
  is_day: number;
  condition: Condition;
  air_quality?: AirQuality;
}

export interface CurrentWeatherApiResponse {
  location: Location;
  current: CurrentWeather;
}

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

export const getCurrentWeather = async (
  q: string,
  airQuality: boolean = false,
) => {
  const airQualityQuery = airQuality ? "yes" : "no";

  const res = await fetch(
    `${WEATHER_API_BASE_URL}/current.json?key=${WEATHER_API_KEY}&q=${q || "Cairo"}&aqi=${airQualityQuery}`,
  );

  const data: CurrentWeatherApiResponse = await res.json();

  if (!res.ok) return null;

  return data;
};
