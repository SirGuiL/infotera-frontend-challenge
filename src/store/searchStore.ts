import { create } from "zustand";

interface SearchState {
  destination: string;
  setDestination: (destination: string) => void;

  adultGuests: number;
  setAdultGuests: (adultGuests: number) => void;

  childGuests: number;
  setChildGuests: (childGuests: number) => void;

  checkoutDate: Date;
  setCheckoutDate: (date: Date) => void;
  checkinDate: Date;
  setCheckinDate: (date: Date) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  destination: "",
  setDestination: (destination: string) => set({ destination }),
  adultGuests: 1,
  setAdultGuests: (adultGuests: number) => set({ adultGuests }),
  childGuests: 0,
  setChildGuests: (childGuests: number) => set({ childGuests }),
  checkinDate: new Date(),
  setCheckinDate: (date: Date) => set({ checkinDate: date }),
  checkoutDate: new Date(),
  setCheckoutDate: (date: Date) => set({ checkoutDate: date }),
}));
