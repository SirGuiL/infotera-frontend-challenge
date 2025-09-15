"use client";

import { useBookingStore } from "@/stores/bookingStore";

export function Footer() {
  const bookingStore = useBookingStore();

  if (bookingStore.isFinishedCheckout) {
    return;
  }

  return (
    <footer className="flex items-center justify-center bg-white w-full py-5 mt-auto">
      <span className="text-xs leading-[1.625rem]">
        © 2022 | Todos os direitos reservados
      </span>
    </footer>
  );
}
