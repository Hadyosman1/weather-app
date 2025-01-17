"use client";

import { cn } from "@/lib/utils";
import { Loader, MapPin, Search, XIcon } from "lucide-react";
import { Input } from "./ui/input";
import useSearch from "@/hooks/use-search";

const SearchInput = () => {
  const {
    val,
    setVal,
    results,
    isLoading,
    showResults,
    handleInputChange,
    handleInputFocus,
    handleInputBlur,
    handleResultClick,
  } = useSearch();

  return (
    <div className="relative max-w-96 transition-all duration-500 *:transition-all *:duration-500 has-[input:focus]:grow has-[input:not(:placeholder-shown)]:grow">
      <Input
        autoComplete="off"
        type="text"
        id="search-input"
        placeholder="Search for city..."
        className="peer px-8"
        value={val}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />

      <label
        className="pointer-events-none invisible absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer self-stretch opacity-0 hover:text-foreground/50 peer-placeholder-shown:pointer-events-auto peer-placeholder-shown:visible peer-placeholder-shown:opacity-100"
        htmlFor="search-input"
      >
        <Search size={20} />
        <span className="sr-only">Search</span>
      </label>

      <button
        onClick={() => setVal("")}
        className="visible absolute left-2 top-1/2 -translate-y-1/2 self-stretch opacity-100 peer-placeholder-shown:pointer-events-none peer-placeholder-shown:invisible peer-placeholder-shown:opacity-0"
      >
        <XIcon size={20} />
        <span className="sr-only">clear</span>
      </button>

      {isLoading && (
        <span className="absolute right-2 top-1/2 -translate-y-1/2 self-stretch">
          <Loader className="animate-spin" size={20} />
          <span className="sr-only">Loading</span>
        </span>
      )}

      {showResults && (
        <div
          className={cn(
            "absolute left-0 right-0 top-full z-50 mt-1 flex max-h-60 w-full flex-col overflow-y-auto rounded-md bg-background text-sm shadow-md duration-300",
            (results.length || (val && !isLoading && results.length === 0)) &&
              "border p-2 animate-in fade-in-0 slide-in-from-top-1",
          )}
        >
          {val && !isLoading && results.length === 0 && (
            <span className="flex items-center gap-2 rounded-md p-2">
              <span>No results found</span>
            </span>
          )}

          {results.map((result, idx) => (
            <button
              key={result.id}
              data-search-result={idx}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  handleResultClick(result);
                }
              }}
              onPointerDown={() => handleResultClick(result)}
              className="flex cursor-pointer items-center gap-2 rounded-md p-2 transition-all duration-300 hover:bg-accent hover:text-primary focus:text-primary"
            >
              <MapPin className="shrink-0" size={20} />
              <span>{result.name}</span>
              <span className="text-muted-foreground">
                {result.region}, {result.country}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
