import { create } from "zustand";

import { HotelResponseDTO, Room } from "@/dto/HotelResponseDTO";

interface BookingState {
  selectedRoom: Room | null;
  selectedHotel: HotelResponseDTO | null;
  setSelectedRoom: (room: Room) => void;
  setSelectedHotel: (hotel: HotelResponseDTO) => void;
  clearRoom: () => void;
  clearHotel: () => void;
  isFinishedCheckout: boolean;
  setIsFinishedCheckout: (finishedCheckout: boolean) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  selectedRoom: null,
  selectedHotel: null,
  setSelectedRoom: (room: Room) => set({ selectedRoom: room }),
  setSelectedHotel: (hotel: HotelResponseDTO) => set({ selectedHotel: hotel }),
  clearRoom: () => set({ selectedRoom: null }),
  clearHotel: () => set({ selectedHotel: null }),
  isFinishedCheckout: false,
  setIsFinishedCheckout: (isFinishedCheckout: boolean) =>
    set({ isFinishedCheckout }),
}));
