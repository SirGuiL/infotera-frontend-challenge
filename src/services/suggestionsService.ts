import { SuggestionsResponseDTO } from "@/dto/SuggestionsResponseDTO";

interface fetchSuggestionsParams {
  query: string;
}

async function fetchSuggestions({ query }: fetchSuggestionsParams) {
  const res = await fetch(`http://localhost:3333/suggestions?q=${query}`);

  return (await res.json()) as SuggestionsResponseDTO[];
}

export { fetchSuggestions };
