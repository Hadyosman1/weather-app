import CurrentWeatherCard from "@/components/CurrentWeatherCard";
import Navbar from "@/components/layout/Navbar";
import { getCurrentWeather } from "@/services/weather";

interface HomePageProps {
  searchParams: Promise<{ q?: string }>;
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const q = (await searchParams).q;

  const data = await getCurrentWeather(q ?? "", true);

  console.log("data");

  return (
    <>
      <Navbar location={data.location} />

      <main>
        <div className="container py-8">
          <CurrentWeatherCard />
        </div>
      </main>
    </>
  );
};

export default HomePage;
