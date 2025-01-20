import CurrentWeatherCard from "@/components/CurrentWeatherCard";
import HourlyForecast from "@/components/HourlyForecast";
import Navbar from "@/components/layout/Navbar";
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
            <h2 className="flex items-center gap-3 text-xl font-bold md:text-2xl">
              Today hourly forecast
              <span className="text-sm text-primary">
                {forecast.forecastday[0].date}{" "}
                {currentDate.toDateString().split(" ")[0]}
              </span>
            </h2>
            <HourlyForecast hourlyForecast={forecast.forecastday[0].hour} />
          </section>
        </div>
      </main>
    </>
  );
};

export default HomePage;
