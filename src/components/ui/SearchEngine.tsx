"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { LocationIcon } from "@/components/icons/Location";
import { Button } from "@/components/ui/Button";
import { Menu } from "@/components/ui/Menu";
import { Calendar } from "@/components/ui/Calendar";
import { SuggestionsMenu } from "@/components/search/SuggestionsMenu";
import { GuestsMenu } from "@/components/search/GuestsMenu";

import { useSearchStore } from "@/store/searchStore";
import { sleep } from "@/utils/sleep";
import { Tooltip } from "./Tooltip";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function SearchEngine() {
  const searchStore = useSearchStore();
  const router = useRouter();
  const isSmallScreen = useMediaQuery("(max-width: 767px)");

  const [isCheckinCalendarOpen, setIsCheckinCalendarOpen] =
    useState<boolean>(false);
  const [isCheckoutCalendarOpen, setIsCheckoutCalendarOpen] =
    useState<boolean>(false);
  const [isGuestsMenuOpen, setIsGuestsMenuOpen] = useState<boolean>(false);
  const [isDestinationMenuOpen, setIsDestinationMenuOpen] =
    useState<boolean>(false);

  function openDestinationMenu() {
    sleep(100);
    setIsDestinationMenuOpen(true);
  }

  function handleSearch() {
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

  function formatRoomsLabel() {
    const capacityPerRoom = 2;
    const total = searchStore.adultGuests + searchStore.childGuests;

    const rooms = Math.ceil(total / capacityPerRoom);

    const adultsLabel = `${searchStore.adultGuests} ${
      searchStore.adultGuests === 1 ? "Adulto" : "Adultos"
    }`;
    const roomsLabel = `${rooms} ${rooms === 1 ? "Quarto" : "Quartos"}`;

    return `${adultsLabel}, ${roomsLabel}`;
  }

  return (
    <div className="grid grid-cols-2 md:flex gap-4 md:gap-0 justify-between items-center w-full bg-white pl-4 pr-4 md:pr-2.5 py-[9px] drop-shadow-search rounded-xl">
      <div className="flex flex-col flex-1 order-1">
        <div className="flex items-center gap-2">
          <div className="stroke-primary w-[13px] h-3.5">
            <LocationIcon />
          </div>

          <span className="text-caption text-xs leading-6">Destino</span>
        </div>

        <input
          type="text"
          className="text-default-text font-semibold text-xs leading-[1.625rem] -mt-0.5 ring-0 outline-0 border-0 w-1/2 md:w-full"
          value={searchStore.destination}
          onChange={(e) => searchStore.setDestination(e.target.value)}
          onFocus={() => openDestinationMenu()}
          onBlur={async () => {
            await sleep(100);
            setIsDestinationMenuOpen(false);
          }}
        />

        <Menu isOpen={isDestinationMenuOpen}>
          <SuggestionsMenu />
        </Menu>
      </div>

      <div
        className="flex flex-col flex-1 order-2 border-0 md:border-l border-default-border border-[#E3E6E9] md:pl-3.5"
        onClick={() => setIsCheckinCalendarOpen(true)}
      >
        <div className="flex items-center gap-2">
          <div className="stroke-primary w-[13px] h-3.5">
            <LocationIcon />
          </div>

          <span className="text-caption text-xs leading-6">Entrada</span>
        </div>

        <span className="text-default-text font-semibold text-xs leading-[1.625rem] -mt-0.5">
          {format(searchStore.checkinDate, "dd/MM/yyyy", {
            locale: ptBR,
          })}
        </span>

        <Menu isOpen={isCheckinCalendarOpen}>
          <Calendar
            selectedDate={searchStore.checkinDate}
            setSelectedDate={searchStore.setCheckinDate}
            handleCloseCalendar={() => setIsCheckinCalendarOpen(false)}
          />
        </Menu>
      </div>

      <div
        className="flex flex-col md:flex-1 order-3 border-0 md:border-l border-default-border border-[#E3E6E9] md:pl-3.5"
        onClick={() => setIsCheckoutCalendarOpen(true)}
      >
        <div className="flex items-center gap-2">
          <div className="stroke-primary w-[13px] h-3.5">
            <LocationIcon />
          </div>

          <span className="text-caption text-xs leading-6">Saída</span>
        </div>

        <span className="text-default-text font-semibold text-xs leading-[1.625rem] -mt-0.5">
          {format(searchStore.checkoutDate, "dd/MM/yyyy", {
            locale: ptBR,
          })}
        </span>

        <Menu
          isOpen={isCheckoutCalendarOpen}
          side={isSmallScreen ? "right" : "left"}
        >
          <Calendar
            selectedDate={searchStore.checkoutDate}
            setSelectedDate={searchStore.setCheckoutDate}
            handleCloseCalendar={() => setIsCheckoutCalendarOpen(false)}
          />
        </Menu>
      </div>

      <div
        className="flex flex-col flex-1 order-1 md:order-4 border-0 md:border-l border-default-border border-[#E3E6E9] md:pl-3.5"
        onClick={() => setIsGuestsMenuOpen(true)}
      >
        <div className="flex items-center gap-2">
          <div className="stroke-primary w-[13px] h-3.5">
            <LocationIcon />
          </div>

          <span className="text-caption text-xs leading-6">Hóspedes</span>
        </div>

        <span className="text-default-text font-semibold text-xs leading-[1.625rem] -mt-0.5 whitespace-nowrap">
          {formatRoomsLabel()}
        </span>

        <Menu isOpen={isGuestsMenuOpen}>
          <GuestsMenu
            handleCloseGuestsMenu={() =>
              setTimeout(() => setIsGuestsMenuOpen(false), 10)
            }
          />
        </Menu>
      </div>

      <div className="order-5 w-full md:w-auto col-span-2 md:col-span-1 group relative">
        <Button
          variant="primary"
          onClick={() => handleSearch()}
          className="order-5 w-full md:w-auto"
          disabled={!searchStore.destination}
        >
          <span className="text-xs font-normal">Pesquisar</span>
        </Button>

        {!searchStore.destination && (
          <Tooltip
            text="Defina um destino antes de seguir com a busca"
            className="-bottom-12 md:-top-12 w-full"
          />
        )}
      </div>
    </div>
  );
}
