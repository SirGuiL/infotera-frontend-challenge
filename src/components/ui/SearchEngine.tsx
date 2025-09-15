"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { WarningIcon } from "@/components/icons/Warning";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { DestinationInput } from "@/components/search/inputs/DestinationInput";
import { GuestsInput } from "@/components/search/inputs/GuestsInput";
import { DateInput } from "@/components/search/inputs/DateInput";

import { useSearchStore } from "@/stores/searchStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { sleep } from "@/utils/sleep";

export function SearchEngine() {
  const searchStore = useSearchStore();
  const router = useRouter();
  const isSmallScreen = useMediaQuery("(max-width: 767px)");

  const destinationRef = useRef<HTMLInputElement>(null);

  const [toastMessage, setToastMessage] = useState<string>("");

  async function handleSearch() {
    if (!searchStore.destination) {
      setToastMessage("");
      await sleep(1);
      setToastMessage("Selecione um destino  para continuar");
      await sleep(100);
      destinationRef.current?.focus();
      return;
    }

    const rawParams = {
      destination: searchStore.destination,
      region: searchStore.region,
      checkin: searchStore.checkinDate?.toString(),
      checkout: searchStore.checkoutDate?.toString(),
      adults: searchStore.adultGuests?.toString(),
      children: searchStore.childGuests?.toString(),
    };

    const cleanedParams = Object.fromEntries(
      Object.entries(rawParams).filter(([, v]) => v)
    );

    const params = new URLSearchParams(cleanedParams);

    router.push(`/search?${params.toString()}`);
  }

  return (
    <div className="grid grid-cols-2 md:flex gap-4 md:gap-0 justify-between items-center w-full bg-white pl-4 pr-4 md:pr-2.5 py-[9px] drop-shadow-search rounded-xl">
      <DestinationInput inputRef={destinationRef} />

      <DateInput
        label="Entrada"
        selectedDate={searchStore.checkinDate}
        setSelectedDate={searchStore.setCheckinDate}
      />

      <DateInput
        label="Saída"
        selectedDate={searchStore.checkoutDate}
        setSelectedDate={searchStore.setCheckoutDate}
        side={isSmallScreen ? "right" : "left"}
      />

      <GuestsInput />

      <div className="order-5 w-full md:w-auto col-span-2 md:col-span-1 group relative">
        <Button
          variant="primary"
          onClick={() => handleSearch()}
          className="order-5 w-full md:w-auto"
        >
          <span className="text-xs font-normal">Pesquisar</span>
        </Button>

        <Toast message={toastMessage} type="warning" icon={<WarningIcon />} />
      </div>
    </div>
  );
}
