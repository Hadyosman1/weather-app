"use client";
import type { DailyForecast } from "@/types/weather";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { getDayName } from "@/lib/utils";
import Image from "next/image";
import ToggleFormatTemp from "./ToggleFormatTemp";
import { useState } from "react";
import { formatTemperature, TempFormat } from "@/lib/format";

interface DailyForecastProps {
  dailyyForecast: DailyForecast[];
}

const DailyForecast = ({ dailyyForecast }: DailyForecastProps) => {
  const [tempFormat, setTempFormat] = useState<TempFormat>("c");

  return (
    <>
      <ToggleFormatTemp
        className="my-3 flex w-full justify-end"
        tempFormat={tempFormat}
        setTempFormat={setTempFormat}
      />

      <Accordion type="single" collapsible className="w-full space-y-3">
        {dailyyForecast.map((record) => {
          const {
            date,
            day: {
              condition,
              mintemp_c,
              maxtemp_c,
              mintemp_f,
              maxtemp_f,
              avghumidity,
              avgtemp_c,
              avgtemp_f,
              totalprecip_mm,
              uv,
              maxwind_kph,
              totalsnow_cm,
              avgvis_km,
            },
            astro: { sunrise, sunset },
          } = record;

          const currentDay = new Date(date);
          const day = getDayName(currentDay);

          return (
            <AccordionItem
              value={record.date}
              key={record.date}
              className="rounded-xl border-0 bg-secondary/20 px-2 ring-[1px] ring-border transition-all duration-300 hover:bg-secondary/50 sm:px-4"
            >
              <AccordionTrigger className="gap-3 py-2 hover:no-underline">
                <div className="flex grow items-center gap-3 max-sm:flex-col max-sm:items-start">
                  <div className="flex items-center gap-3">
                    <Image
                      src={`https:${condition.icon}`}
                      alt={condition.text}
                      width={40}
                      height={40}
                    />
                    <p className="font-semibold">{day}</p>
                  </div>
                  <div className="flex items-center justify-between gap-3 max-sm:w-full sm:ms-auto">
                    <p className="max-sm:text-sm">{condition.text}</p>
                    <p className="shrink-0 text-muted-foreground">
                      {formatTemperature(
                        tempFormat === "c" ? mintemp_c : mintemp_f,
                        tempFormat,
                      )}
                      {" / "}
                      {formatTemperature(
                        tempFormat === "c" ? maxtemp_c : maxtemp_f,
                        tempFormat,
                      )}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-wrap gap-x-5 gap-y-2 pt-3 max-sm:flex-col">
                <ul className="grow space-y-2">
                  <li className="flex items-center justify-between gap-2">
                    <p>Humidity Average:</p>
                    <span className="text-muted-foreground">
                      {avghumidity}%
                    </span>
                  </li>
                  <li className="flex items-center justify-between gap-2">
                    <p>Average Temperature:</p>
                    <span className="text-muted-foreground">
                      {formatTemperature(
                        tempFormat === "c" ? avgtemp_c : avgtemp_f,
                        tempFormat,
                      )}
                    </span>
                  </li>
                  <li className="flex items-center justify-between gap-2">
                    <p>Precipitation:</p>
                    <span className="text-muted-foreground">
                      {totalprecip_mm} mm
                    </span>
                  </li>
                  <li className="flex items-center justify-between gap-2">
                    <p>UV Index:</p>
                    <span className="text-muted-foreground">{uv}</span>
                  </li>
                  <li className="flex items-center justify-between gap-2">
                    <p>Max Wind Speed:</p>
                    <span className="text-muted-foreground">
                      {maxwind_kph} km/h
                    </span>
                  </li>
                </ul>

                <ul className="grow space-y-2">
                  <li className="flex items-center justify-between gap-2">
                    <p>Snow:</p>
                    <span className="text-muted-foreground">
                      {totalsnow_cm} cm
                    </span>
                  </li>
                  <li className="flex items-center justify-between gap-2">
                    <div>
                      <p className="flex items-center gap-2">
                        Sunrise
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 2v8M4.93 10.93l1.41 1.41M2 18h20M20.65 10.93l-1.41 1.41M12 4l-2 3h4l-2-3zM12 14l-2 3h4l-2-3z" />
                        </svg>
                        :
                      </p>
                    </div>
                    <span className="text-muted-foreground">{sunrise}</span>
                  </li>
                  <li className="flex items-center justify-between gap-2">
                    <div>
                      <p className="flex items-center gap-2">
                        Sunset
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 10v8M4.93 13.07l1.41-1.41M2 18h20M20.65 13.07l-1.41-1.41M12 16l-2-3h4l-2 3zM12 6l-2-3h4l-2 3z" />
                        </svg>
                        :
                      </p>
                    </div>
                    <span className="text-muted-foreground">{sunset}</span>
                  </li>
                  <li className="flex items-center justify-between gap-2">
                    <p>Visibility:</p>
                    <span className="text-muted-foreground">
                      {avgvis_km} km
                    </span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};

export default DailyForecast;
