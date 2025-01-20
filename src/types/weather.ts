interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

interface SearchLocation {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

interface Condition {
  text: string;
  icon: string;
  code: number;
}

interface AirQuality {
  co: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  "us-epa-index": number;
  "gb-defra-index": number;
}

interface CurrentWeather {
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
  air_quality: AirQuality;
}

interface HourlyForecast {
  time_epoch: number;
  time: string;

  temp_c: number;
  temp_f: number;
  feelslike_c: number;
  feelslike_f: number;

  wind_kph: number;
  wind_degree: number;
  wind_dir: string;

  pressure_mb: number;
  vis_km: number;
  uv: number;

  humidity: number;
  cloud: number;
  will_it_rain: number;
  chance_of_rain: number;
  will_it_snow: number;
  chance_of_snow: number;

  condition: Condition;
  air_quality: AirQuality;
}

interface Astro {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: string;
}

interface DailyForecast {
  date: string;
  date_epoch: number;

  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;

    maxwind_kph: number;

    totalprecip_mm: number; //
    totalsnow_cm: number;

    avgvis_km: number;
    avghumidity: number;

    condition: Condition;

    uv: number;
  };

  astro: Astro;

  hour: HourlyForecast[];
}

export type {
  Location,
  SearchLocation,
  Condition,
  AirQuality,
  CurrentWeather,
  HourlyForecast,
  Astro,
  DailyForecast,
};
