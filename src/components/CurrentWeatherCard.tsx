"use client";

import { formatTemperature, TempFormat } from "@/lib/format";
import { CurrentWeather } from "@/types/weather";
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
import WeatherDatails from "./WeatherDatails";

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
  currentWeather,
  minMaxTemp,
}: CurrentWeatherCardProps) => {
  const { last_updated, condition, temp_c, temp_f, feelslike_c, feelslike_f } =
    currentWeather;

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

          <WeatherDatails
            currentWeather={currentWeather}
            className="ms-auto sm:basis-1/2"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeatherCard;
