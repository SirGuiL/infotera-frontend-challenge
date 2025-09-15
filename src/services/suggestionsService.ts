import { SuggestionsResponseDTO } from "@/dto/SuggestionsResponseDTO";

interface fetchSuggestionsParams {
  query: string;
}

async function fetchSuggestions({ query }: fetchSuggestionsParams) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/suggestions?q=${query}`
  );

  return (await res.json()) as SuggestionsResponseDTO[];
}

export { fetchSuggestions };
