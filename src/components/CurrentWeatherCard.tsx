"use client";

import {
  airQualityDescriptions,
  CurrentWeatherApiResponse,
} from "@/services/weather";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { formatTemperature } from "@/lib/format";
import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

interface CurrentWeatherCardProps {
  currentWeather: CurrentWeatherApiResponse;
}

const CurrentWeatherCard = ({
  currentWeather: {
    current: {
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

      air_quality,
    },
  },
}: CurrentWeatherCardProps) => {
  const [formatTmp, setFormatTmp] = useState<"c" | "f">("c");

  return (
    <Card className="rounded border-0 ring-[1px] ring-primary/10">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <CardTitle>Current Weather</CardTitle>
          <div>
            <Button
              onClick={() => setFormatTmp("c")}
              className="rounded-e-none"
              variant={formatTmp === "c" ? "default" : "secondary"}
              size="sm"
            >
              C
            </Button>
            <Button
              onClick={() => setFormatTmp("f")}
              className="rounded-s-none"
              variant={formatTmp === "f" ? "default" : "secondary"}
              size="sm"
            >
              F
            </Button>
          </div>
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
          <div className="space-y-0.5 max-sm:text-center">
            <p className="text-xl font-semibold">{condition.text}</p>
            <p className="text-2xl font-bold">
              {formatTemperature(
                formatTmp === "c" ? temp_c : temp_f,
                formatTmp,
              )}
            </p>
            <p className="text-muted-foreground">
              Feels like{" "}
              {formatTemperature(
                formatTmp === "c" ? feelslike_c : feelslike_f,
                formatTmp,
              )}
            </p>
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
              {air_quality && (
                <li className="flex items-center justify-between gap-2">
                  <span>Air quality:</span>
                  <span className="flex items-center gap-1.5 text-foreground">
                    {airQualityDescriptions[air_quality["us-epa-index"]].text}
                    <span
                      className="block aspect-square size-4 rounded-full"
                      style={{
                        background: `${airQualityDescriptions[air_quality["us-epa-index"]].color}`,
                      }}
                    />
                  </span>
                </li>
              )}
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
