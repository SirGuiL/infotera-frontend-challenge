import { create } from "zustand";
import { persist } from "zustand/middleware";

import { HotelResponseDTO, Room } from "@/dto/HotelResponseDTO";

interface BookingState {
  selectedRoom: Room | null;
  setSelectedRoom: (room: Room) => void;

  selectedHotel: HotelResponseDTO | null;
  setSelectedHotel: (hotel: HotelResponseDTO) => void;

  clearRoom: () => void;
  clearHotel: () => void;

  isFinishedCheckout: boolean;
  setIsFinishedCheckout: (finishedCheckout: boolean) => void;

  isHydrated: boolean;
  setHydrated: (hydrated: boolean) => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      selectedRoom: null,
      setSelectedRoom: (room: Room) => set({ selectedRoom: room }),

      selectedHotel: null,
      setSelectedHotel: (hotel: HotelResponseDTO) =>
        set({ selectedHotel: hotel }),

      clearRoom: () => set({ selectedRoom: null }),
      clearHotel: () => set({ selectedHotel: null }),

      isFinishedCheckout: false,
      setIsFinishedCheckout: (isFinishedCheckout: boolean) =>
        set({ isFinishedCheckout }),

      isHydrated: false,
      setHydrated: (hydrated: boolean) => set({ isHydrated: hydrated }),
    }),
    {
      name: "@infotravel:booking-store",
      partialize: (state) => ({
        selectedRoom: state.selectedRoom,
        selectedHotel: state.selectedHotel,
        isFinishedCheckout: state.isFinishedCheckout,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated(true);
          state.setIsFinishedCheckout(false);
        }
      },
    }
  )
);
