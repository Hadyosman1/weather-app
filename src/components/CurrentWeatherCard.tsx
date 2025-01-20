"use client";

import { formatTemperature, TempFormat } from "@/lib/format";
import { airQualityDescriptions } from "@/services/forecast";
import { CurrentWeather } from "@/types/weather";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ToggleFormatTemp from "./ToggleFormatTemp";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface CurrentWeatherCardProps {
  currentWeather: CurrentWeather;
  minMaxTemp: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
  };
}

const CurrentWeatherCard = ({
  currentWeather: {
    last_updated,
    condition,

    temp_c,
    temp_f,
    feelslike_c,
    feelslike_f,

    humidity,
    precip_mm,
    pressure_mb,
    vis_km,
    cloud,
    uv,

    wind_kph,
    wind_dir,
    wind_degree,

    air_quality: { "us-epa-index": us_ep_index },
  },
  minMaxTemp,
}: CurrentWeatherCardProps) => {
  const [tempFormat, setTempFormat] = useState<TempFormat>("c");

  return (
    <Card className="rounded border-0 ring-[1px] ring-primary/10">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <CardTitle>Current Weather</CardTitle>
          <ToggleFormatTemp
            tempFormat={tempFormat}
            setTempFormat={setTempFormat}
          />
        </div>
        <CardDescription>{last_updated}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Image
            priority
            src={`https:${condition.icon.replace("64x64", "128x128")}`} // Resize icon image
            alt={condition.text}
            width={128}
            height={128}
          />
          <div className="flex flex-wrap gap-7">
            <div className="grow space-y-0.5 max-sm:text-center">
              <p className="text-xl font-semibold">{condition.text}</p>
              <p className="text-2xl font-bold">
                {formatTemperature(
                  tempFormat === "c" ? temp_c : temp_f,
                  tempFormat,
                )}
              </p>
              <p className="text-muted-foreground">
                Feels like{" "}
                {formatTemperature(
                  tempFormat === "c" ? feelslike_c : feelslike_f,
                  tempFormat,
                )}
              </p>
            </div>
            <div className="grow space-y-0.5 max-sm:text-center">
              <p>
                Min:
                <span className="ms-1 text-[larger]">
                  {formatTemperature(
                    tempFormat === "c"
                      ? minMaxTemp.mintemp_c
                      : minMaxTemp.mintemp_f,
                    tempFormat,
                  )}
                </span>
              </p>
              <p>
                Max:
                <span className="ms-1 text-[larger]">
                  {formatTemperature(
                    tempFormat === "c"
                      ? minMaxTemp.maxtemp_c
                      : minMaxTemp.maxtemp_f,
                    tempFormat,
                  )}
                </span>
              </p>
            </div>
          </div>
          <div className="ms-auto flex w-full flex-wrap gap-x-5 gap-y-2 self-stretch rounded sm:basis-1/2">
            <ul className="grow space-y-2 text-muted-foreground">
              <li className="flex items-center justify-between gap-2">
                <span>Rainfall:</span>
                <span className="text-foreground">{precip_mm} mm</span>
              </li>
              <li className="flex items-center justify-between gap-2">
                <span>Humidity:</span>
                <span className="text-foreground">{humidity}%</span>
              </li>
              <li className="flex items-center justify-between gap-2">
                <span>Wind speed:</span>
                <span className="text-foreground">{wind_kph} kph</span>
              </li>
              <li className="flex items-center justify-between gap-2">
                <span>Wind dir:</span>
                <div className="flex items-center gap-1 text-foreground">
                  {wind_dir}
                  <ArrowRight
                    size={25}
                    style={{ transform: `rotate(${wind_degree}deg)` }}
                  />
                </div>
              </li>
              <li className="flex items-center justify-between gap-2">
                <span>Air quality:</span>
                <span className="flex items-center gap-1.5 text-foreground">
                  {airQualityDescriptions[us_ep_index].text}
                  <span
                    className="block aspect-square size-4 rounded-full"
                    style={{
                      background: `${airQualityDescriptions[us_ep_index].color}`,
                    }}
                  />
                </span>
              </li>
            </ul>
            <ul className="grow space-y-2 text-muted-foreground">
              <li className="flex items-center justify-between gap-2">
                <span>Pressure:</span>
                <span className="text-foreground">{pressure_mb} mb</span>
              </li>
              <li className="flex items-center justify-between gap-2">
                <span>Visibility:</span>
                <span className="text-foreground">{vis_km} km</span>
              </li>
              <li className="flex items-center justify-between gap-2">
                <span>Cloud Cover:</span>
                <span className="text-foreground">{cloud}%</span>
              </li>
              <li className="flex items-center justify-between gap-2">
                <span>UV Index:</span>
                <span className="text-foreground">{uv}</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeatherCard;
