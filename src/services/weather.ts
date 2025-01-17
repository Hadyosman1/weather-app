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
  us_epa_index: number;
  gb_defra_index: number;
}

export interface CurrentWeather {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  air_quality?: AirQuality;
}

interface GetCurrentApiResponse {
  location: Location;
  current: CurrentWeather;
}

export const getCurrentWeather = async (
  q: string,
  airQuality: boolean = false,
) => {
  const airQualityQuery = airQuality ? "yes" : "no";

  const res = await fetch(
    `${WEATHER_API_BASE_URL}/current.json?key=${WEATHER_API_KEY}&q=${q || "Cairo"}&aqi=${airQualityQuery}`,
  );

  const data: GetCurrentApiResponse = await res.json();

  return data;
};
