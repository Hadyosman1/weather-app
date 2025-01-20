"use client";

import useSetCoordinatesToSearchParams from "@/hooks/use-set-coordinates-to-search-params";
import { Location } from "@/services/weather";
import { MapPin } from "lucide-react";
import ThemeToggleButton from "../ThemeToggleButton";
import SearchInput from "../SearchInput";

interface NavbarProps {
  location: Location;
}

const Navbar = ({ location }: NavbarProps) => {
  useSetCoordinatesToSearchParams();

  return (
    <header className="shadow shadow-border">
      <div className="container flex flex-wrap items-center justify-center gap-3 py-3 md:justify-between">
        <h1 className="w-full py-2 text-center text-xl font-bold md:w-fit md:text-2xl">
          Weather App
        </h1>

        {!!location && (
          <span className="flex w-full items-center justify-center gap-1 text-xs md:text-sm md:w-fit">
            <MapPin size={16} />
            {location.name}, {location.region}, {location.country}
          </span>
        )}

        <div className="flex w-full items-center justify-center gap-2 md:ms-auto md:w-fit md:grow md:justify-end">
          <SearchInput />

          <ThemeToggleButton className="shrink-0" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
