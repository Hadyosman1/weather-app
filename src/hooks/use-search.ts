import { useToast } from "@/hooks/use-toast";
import { search } from "@/services/search";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";

import { useRouter } from "next/navigation";
import { debounce } from "@/lib/utils";
import { SearchLocation } from "@/types/weather";

const getSearchResults = async (q: string) => {
  const results = await search(q);
  return results;
};

const DELAY = 1000;

const debouncedSearchFn = debounce(getSearchResults, DELAY);

const useSearch = () => {
  const [val, setVal] = useState("");
  const [results, setResults] = useState<SearchLocation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const router = useRouter();
  const { toast } = useToast();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (val) {
      setIsLoading(true);

      debouncedSearchFn(val)
        .then((result) => {
          setResults(result);
        })
        .catch(() => {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to get search results",
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setResults([]);
    }
  }, [val, toast]);

  useEffect(() => {
    const contentWrapper = document.querySelector("[data-main-content]");

    if (isPending) {
      contentWrapper?.classList?.add("loading");
    } else {
      contentWrapper?.classList?.remove("loading");
      setShowResults(false);
    }
  }, [isPending]);

  const handleSetFocusToResultsOption = useCallback((e: KeyboardEvent) => {
    const activeElement = document.activeElement as HTMLElement;
    console.log(e.code);

    if (e.code === "ArrowDown") {
      if (activeElement.matches("[data-search-result]")) {
        const nextElementSibling = activeElement.nextElementSibling;
        if (
          nextElementSibling &&
          nextElementSibling.matches("[data-search-result]")
        ) {
          (nextElementSibling as HTMLButtonElement)?.focus();
        }
      } else {
        (
          document.querySelector(`[data-search-result]`) as HTMLButtonElement
        )?.focus();
      }
    } else if (e.code === "ArrowUp") {
      if (activeElement.matches("[data-search-result]")) {
        if (activeElement.dataset.searchResult === "0") {
          searchInputRef.current?.focus();
        }

        const previousElementSibling = activeElement.previousElementSibling;

        if (
          previousElementSibling &&
          previousElementSibling.matches("[data-search-result]")
        ) {
          (previousElementSibling as HTMLButtonElement)?.focus();
        }
      } else {
        (
          document.querySelector(`[data-search-result]`) as HTMLButtonElement
        )?.focus();
      }
    }
  }, []);

  const handleResultClick = (result: SearchLocation) => {
    setShowResults(false);
    setVal("");
    startTransition(() => {
      router.push(`/?q=${result.lat},${result.lon}`);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };

  const handleInputFocus = () => {
    setShowResults(true);
    document.documentElement.style.overflow = "hidden";
    document.addEventListener("keydown", handleSetFocusToResultsOption);
  };

  const handleInputBlur = () => {
    setShowResults(false);
    document.documentElement.style.overflow = "auto";
    document.removeEventListener("keydown", handleSetFocusToResultsOption);
  };

  return {
    val,
    setVal,
    searchInputRef,
    results,
    isLoading,
    showResults,
    handleInputChange,
    handleInputFocus,
    handleInputBlur,
    handleResultClick,
  };
};

export default useSearch;
