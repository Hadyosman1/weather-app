import CurrentWeatherCard from "@/components/CurrentWeatherCard";
import Navbar from "@/components/layout/Navbar";
import { getCurrentWeather } from "@/services/weather";
import { notFound } from "next/navigation";

interface HomePageProps {
  searchParams: Promise<{ q?: string }>;
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const q = (await searchParams).q;

  const data = await getCurrentWeather(q ?? "", true);

  // console.log(data);

  if (!data) notFound();

  return (
    <>
      <Navbar location={data.location} />

      <main className="has-[>.loading]:animate-pulse">
        <div data-main-content className="container py-8">
          <CurrentWeatherCard currentWeather={data} />
        </div>
      </main>
    </>
  );
};

export default HomePage;
