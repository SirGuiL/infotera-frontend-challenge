"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useSearchStore } from "@/stores/searchStore";
import { fetchSuggestions } from "@/services/suggestionsService";

import { SuggestionMenuItem } from "@/components/search/menus/SuggestionMenuItem";
import { SuggestionMenuError } from "@/components/search/menus/SuggestionMenuError";
import { SuggestionMenuLoading } from "@/components/search/menus/SuggestionMenuLoading";

export function SuggestionsMenu() {
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const searchStore = useSearchStore();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["suggestions", debouncedQuery],
    queryFn: () =>
      fetchSuggestions({
        query: debouncedQuery,
      }),
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
    <div className="w-[313px] rounded-lg overflow-hidden inset-shadow-menu block">
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
