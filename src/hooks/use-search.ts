import { useToast } from "@/hooks/use-toast";
import { search, SearchLocation } from "@/services/search";
import { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { debounce } from "@/lib/utils";

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

  const handleSetFocusToResultsOption = useCallback((e: KeyboardEvent) => {
    const activeElement = document.activeElement as HTMLElement;

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
    router.push(`/?q=${result.lat},${result.lon}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };

  const handleInputFocus = () => {
    setShowResults(true);
    document.addEventListener("keydown", handleSetFocusToResultsOption);
  };

  const handleInputBlur = () => {
    setShowResults(false);
    document.removeEventListener("keydown", handleSetFocusToResultsOption);
  };

  return {
    val,
    setVal,
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
