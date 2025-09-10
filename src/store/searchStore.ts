import { create } from "zustand";

interface SearchState {
  destination: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hotels: any[];
  setDestination: (destination: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setHotels: (hotels: any[]) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  destination: "",
  hotels: [],
  setDestination: (destination) => set({ destination }),
  setHotels: (hotels) => set({ hotels }),
  clearSearch: () => set({ destination: "", hotels: [] }),
}));
