import { cn } from "@/lib/utils";
import { airQualityDescriptions } from "@/services/forecast";
import { CurrentWeather } from "@/types/weather";
import { ArrowRight } from "lucide-react";

interface WeatherDatailsProps {
  currentWeather: CurrentWeather;
  className?: string;
}

const WeatherDatails = ({ currentWeather, className }: WeatherDatailsProps) => {
  return (
    <div className={cn("flex w-full flex-wrap gap-x-5 gap-y-2", className)}>
      <ul className="grow space-y-2 text-muted-foreground">
        <li className="flex items-center justify-between gap-2">
          <span>Rainfall:</span>
          <span className="text-foreground">{currentWeather.precip_mm} mm</span>
        </li>
        <li className="flex items-center justify-between gap-2">
          <span>Humidity:</span>
          <span className="text-foreground">{currentWeather.humidity}%</span>
        </li>
        <li className="flex items-center justify-between gap-2">
          <span>Wind speed:</span>
          <span className="text-foreground">{currentWeather.wind_kph} kph</span>
        </li>
        <li className="flex items-center justify-between gap-2">
          <span>Wind dir:</span>
          <div className="flex items-center gap-1 text-foreground">
            {currentWeather.wind_dir}
            <ArrowRight
              size={25}
              style={{ transform: `rotate(${currentWeather.wind_degree}deg)` }}
            />
          </div>
        </li>
        <li className="flex items-center justify-between gap-2">
          <span>Air quality:</span>
          <span className="flex items-center gap-1.5 text-foreground">
            {
              airQualityDescriptions[currentWeather.air_quality["us-epa-index"]]
                .text
            }
            <span
              className="block aspect-square size-4 rounded-full"
              style={{
                background: `${airQualityDescriptions[currentWeather.air_quality["us-epa-index"]].color}`,
              }}
            />
          </span>
        </li>
      </ul>
      <ul className="grow space-y-2 text-muted-foreground">
        <li className="flex items-center justify-between gap-2">
          <span>Pressure:</span>
          <span className="text-foreground">
            {currentWeather.pressure_mb} mb
          </span>
        </li>
        <li className="flex items-center justify-between gap-2">
          <span>Visibility:</span>
          <span className="text-foreground">{currentWeather.vis_km} km</span>
        </li>
        <li className="flex items-center justify-between gap-2">
          <span>Cloud Cover:</span>
          <span className="text-foreground">{currentWeather.cloud}%</span>
        </li>
        <li className="flex items-center justify-between gap-2">
          <span>UV Index:</span>
          <span className="text-foreground">{currentWeather.uv}</span>
        </li>
      </ul>
    </div>
  );
};

export default WeatherDatails;
