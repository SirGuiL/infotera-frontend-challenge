import { create } from "zustand";

export interface SearchState {
  destination: string;
  setDestination: (destination: string) => void;

  region: string;
  setRegion: (region: string) => void;

  adultGuests: number;
  setAdultGuests: (adultGuests: number) => void;

  childGuests: number;
  setChildGuests: (childGuests: number) => void;

  checkoutDate: Date;
  setCheckoutDate: (date: Date) => void;
  checkinDate: Date;
  setCheckinDate: (date: Date) => void;

  syncWithParams: (params: URLSearchParams) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  destination: "",
  setDestination: (destination: string) => set({ destination }),

  region: "",
  setRegion: (region: string) => set({ region }),

  adultGuests: 1,
  setAdultGuests: (adultGuests: number) => set({ adultGuests }),

  childGuests: 0,
  setChildGuests: (childGuests: number) => set({ childGuests }),

  checkinDate: new Date(),
  setCheckinDate: (date: Date) => set({ checkinDate: date }),

  checkoutDate: new Date(),
  setCheckoutDate: (date: Date) => set({ checkoutDate: date }),

  syncWithParams: (params) => {
    const destination = params.get("destination");
    const region = params.get("region");
    const checkin = params.get("checkin");
    const checkout = params.get("checkout");
    const adults = params.get("adults");
    const children = params.get("children");

    if (destination) set({ destination });
    if (region) set({ region });
    if (checkin) set({ checkinDate: new Date(checkin) });
    if (checkout) set({ checkoutDate: new Date(checkout) });
    if (adults) set({ adultGuests: parseInt(adults, 10) });
    if (children) set({ childGuests: parseInt(children, 10) });
  },
}));
