import { create } from "zustand";

import { Room } from "@/dto/HotelResponseDTO";

interface BookingState {
  selectedRoom: Room | null;
  setSelectedRoom: (room: Room) => void;
  clearRoom: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  selectedRoom: null,
  setSelectedRoom: (room: Room) => set({ selectedRoom: room }),
  clearRoom: () => set({ selectedRoom: null }),
}));
