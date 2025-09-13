"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useSearchStore } from "@/store/searchStore";
import { SuggestionsResponseDTO } from "@/dto/SuggestionsResponseDTO";

import { SuggestionMenuItem } from "@/components/search/SuggestionMenuItem";
import { SuggestionMenuError } from "@/components/search/SuggestionMenuError";
import { SuggestionMenuLoading } from "@/components/search/SuggestionMenuLoading";

export function SuggestionsMenu() {
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const searchStore = useSearchStore();

  async function fetchSuggestions() {
    const res = await fetch(
      `http://localhost:3333/suggestions?q=${debouncedQuery}`
    );

    return (await res.json()) as SuggestionsResponseDTO[];
  }

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["suggestions", debouncedQuery],
    queryFn: fetchSuggestions,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchStore.destination);
    }, 1500);

    return () => clearTimeout(handler);
  }, [searchStore.destination]);

  useEffect(() => {
    refetch();
  }, [debouncedQuery, refetch]);

  if (isLoading || searchStore.destination !== debouncedQuery) {
    return <SuggestionMenuLoading />;
  }

  if (error) {
    return <SuggestionMenuError />;
  }

  return (
    <div className="w-[313px] rounded-lg overflow-hidden inset-shadow-menu hidden md:block">
      <div className="flex flex-col overflow-auto max-h-60 bg-white">
        {data?.map((suggestion) => (
          <SuggestionMenuItem
            key={suggestion.id}
            name={suggestion.name}
            region={suggestion.region}
            highlight={searchStore.destination}
            onClick={() => {
              searchStore.setDestination(suggestion.name);
              searchStore.setRegion(suggestion.region);
            }}
          />
        ))}
      </div>
    </div>
  );
}
