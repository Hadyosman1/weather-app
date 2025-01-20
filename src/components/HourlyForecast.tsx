"use client";

import { type HourlyForecast } from "@/types/weather";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { formatTemperature, TempFormat } from "@/lib/format";
import ToggleFormatTemp from "./ToggleFormatTemp";

interface HourlyForecastProps {
  hourlyForecast: HourlyForecast[];
}

const HourlyForecast = ({ hourlyForecast }: HourlyForecastProps) => {
  const scrollableListRef = useRef<HTMLUListElement>(null);
  const [tempFormat, setTempFormat] = useState<TempFormat>("c");

  return (
    <>
      <ToggleFormatTemp
        tempFormat={tempFormat}
        setTempFormat={setTempFormat}
        className="flex justify-end"
      />
      <div className="relative">
        <ul
          ref={scrollableListRef}
          className="flex snap-x snap-proximity gap-4 overflow-x-auto scroll-smooth whitespace-nowrap px-16 py-5 transition-all duration-300 [scrollbar-width:none;]"
        >
          {hourlyForecast.map((hourForecast) => (
            <li key={hourForecast.time} className="snap-center">
              <HourForecastCard
                hourForecast={hourForecast}
                tempFormat={tempFormat}
              />
            </li>
          ))}
        </ul>
        <div className="hourly-forecast-gradient absolute inset-0" />
        <Button
          onClick={() =>
            scrollableListRef.current?.scrollBy({
              left: -160,
              behavior: "smooth",
            })
          }
          size="icon"
          className="absolute top-1/2 -translate-y-1/2 rounded-full"
        >
          <ArrowLeft />
          <span className="sr-only">Prev</span>
        </Button>
        <Button
          onClick={() =>
            scrollableListRef.current?.scrollBy({
              left: 160,
              behavior: "smooth",
            })
          }
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full"
        >
          <ArrowRight />
          <span className="sr-only">Next</span>
        </Button>
      </div>
    </>
  );
};

export default HourlyForecast;

interface HourForecastCardProps {
  hourForecast: HourlyForecast;
  tempFormat: TempFormat;
}

const HourForecastCard = ({
  hourForecast: {
    condition: { text, icon },
    time,
    temp_c,
    temp_f,
    feelslike_c,
    feelslike_f,
  },
  tempFormat,
}: HourForecastCardProps) => {
  return (
    <Card className="min-w-40">
      <CardHeader className="pb-2 text-center">
        <CardTitle className="border-b pb-2">{time.split(" ")[1]}</CardTitle>
        <CardDescription>{text}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-3">
        <Image
          src={`https:${icon}`}
          alt={text}
          width={64}
          height={64}
          className="aspect-square w-16 max-w-16 object-contain"
        />
        <div className="text-center">
          <p className="text-xl font-bold">
            {tempFormat === "c"
              ? formatTemperature(temp_c, tempFormat)
              : formatTemperature(temp_f, tempFormat)}
          </p>
          <span className="text-sm text-muted-foreground">
            Feels like{" "}
            {tempFormat === "c"
              ? formatTemperature(feelslike_c, tempFormat)
              : formatTemperature(feelslike_f, tempFormat)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
