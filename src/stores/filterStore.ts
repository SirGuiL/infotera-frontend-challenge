import { create } from "zustand";

export type SortField = "price" | "rating" | "name";
type SortDirection = "asc" | "desc";

type SortBy = {
  field: SortField;
  direction: SortDirection;
};

type quantityOfStarsType = {
  [key: number]: number;
};

interface FilterState {
  hotelName: string;
  setHotelName: (hotelName: string) => void;

  minPrice: number;
  setMinPrice: (minPrice: number) => void;
  maxPrice: number;
  setMaxPrice: (maxPrice: number) => void;

  quantityOfStars: quantityOfStarsType;
  setQuantityOfStars: (quantityOfStars: quantityOfStarsType) => void;

  starsFilter: number[];
  setStarsFilter: (starsFilter: number[]) => void;

  showStarsFilter: boolean;
  setShowStarsFilter: (showStarsFilter: boolean) => void;
  showPriceFilter: boolean;
  setShowPriceFilter: (showPriceFilter: boolean) => void;

  sortBy: SortBy | null;
  setSortBy: (sortBy: SortBy) => void;

  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  hotelName: "",
  setHotelName: (hotelName: string) => set({ hotelName }),

  minPrice: 0,
  setMinPrice: (minPrice: number) => set({ minPrice }),
  maxPrice: 1200,
  setMaxPrice: (maxPrice: number) => set({ maxPrice }),

  quantityOfStars: {},
  setQuantityOfStars: (quantityOfStars: quantityOfStarsType) =>
    set({ quantityOfStars }),

  starsFilter: [],
  setStarsFilter: (starsFilter: number[]) => set({ starsFilter }),

  showStarsFilter: true,
  setShowStarsFilter: (showStarsFilter: boolean) => set({ showStarsFilter }),
  showPriceFilter: true,
  setShowPriceFilter: (showPriceFilter: boolean) => set({ showPriceFilter }),

  sortBy: null,
  setSortBy: (sortBy: SortBy) => set({ sortBy }),

  resetFilters: () =>
    set({ starsFilter: [], minPrice: 0, maxPrice: 1200, hotelName: "" }),
}));
