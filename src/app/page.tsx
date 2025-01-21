import CurrentWeatherCard from "@/components/CurrentWeatherCard";
import DailyForecast from "@/components/DailyForecast";
import HourlyForecast from "@/components/HourlyForecast";
import Navbar from "@/components/layout/Navbar";
import { getDayName } from "@/lib/utils";
import { getCurrentWeatherWithForecast } from "@/services/forecast";

import { notFound } from "next/navigation";

interface HomePageProps {
  searchParams: Promise<{ q?: string }>;
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const q = (await searchParams).q;

  const data = await getCurrentWeatherWithForecast(q ?? "");

  if (!data) notFound();

  const { location, current, forecast } = data;

  const currentDate = new Date(forecast.forecastday[0].date);

  return (
    <>
      <Navbar location={location} />

      <main className="has-[>.loading]:animate-pulse">
        <div data-main-content className="container space-y-8 py-8">
          <CurrentWeatherCard
            currentWeather={current}
            minMaxTemp={forecast.forecastday[0].day}
          />
          <section>
            <div className="flex flex-wrap items-center gap-3 font-bold max-md:mb-4">
              <h2 className="text-xl md:text-2xl">Today hourly forecast</h2>
              <span className="text-sm text-primary">
                {forecast.forecastday[0].date} {getDayName(currentDate)}
              </span>
            </div>

            <HourlyForecast hourlyForecast={forecast.forecastday[0].hour} />

            <h2 className="mb-3 mt-2 text-xl font-bold md:text-2xl">
              Daily forecast
            </h2>

            <DailyForecast dailyyForecast={forecast.forecastday.slice(1)} />
          </section>
        </div>
      </main>
    </>
  );
};

export default HomePage;
