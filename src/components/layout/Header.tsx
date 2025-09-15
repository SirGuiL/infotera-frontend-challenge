"use client";

import { usePathname } from "next/navigation";

import { HeaderHome } from "./HeaderHome";
import { HeaderSecondary } from "./HeaderSecondary";
import { useBookingStore } from "@/stores/bookingStore";

export function Header() {
  const bookingStore = useBookingStore();
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (bookingStore.isFinishedCheckout) {
    return;
  }

  if (isHome) {
    return <HeaderHome />;
  }

  return <HeaderSecondary />;
}
