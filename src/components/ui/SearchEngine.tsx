"use client";

import { useState } from "react";
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
import { useRouter } from "next/navigation";

export function SearchEngine() {
  const searchStore = useSearchStore();
  const router = useRouter();

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
    router.push(`/search?destination=${searchStore.destination}`);
  }

  return (
    <div className="flex justify-between items-center w-full bg-white pl-4 pr-2.5 py-2.5 drop-shadow-search rounded-xl">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <div className="stroke-primary w-[13px] h-3.5">
            <LocationIcon />
          </div>

          <span className="text-caption text-xs leading-[1.625rem]">
            Destino
          </span>
        </div>

        <input
          type="text"
          className="text-default-text font-semibold text-xs leading-[1.625rem] ring-0 outline-0 border-0"
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
        className="flex flex-col"
        onClick={() => setIsCheckinCalendarOpen(true)}
      >
        <div className="flex items-center gap-2">
          <div className="stroke-primary w-[13px] h-3.5">
            <LocationIcon />
          </div>

          <span className="text-caption text-xs leading-[1.625rem]">
            Entrada
          </span>
        </div>

        <span className="text-default-text font-semibold text-xs leading-[1.625rem]">
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
        className="flex flex-col"
        onClick={() => setIsCheckoutCalendarOpen(true)}
      >
        <div className="flex items-center gap-2">
          <div className="stroke-primary w-[13px] h-3.5">
            <LocationIcon />
          </div>

          <span className="text-caption text-xs leading-[1.625rem]">Saída</span>
        </div>

        <span className="text-default-text font-semibold text-xs leading-[1.625rem]">
          {format(searchStore.checkoutDate, "dd/MM/yyyy", {
            locale: ptBR,
          })}
        </span>

        <Menu isOpen={isCheckoutCalendarOpen}>
          <Calendar
            selectedDate={searchStore.checkoutDate}
            setSelectedDate={searchStore.setCheckoutDate}
            handleCloseCalendar={() => setIsCheckoutCalendarOpen(false)}
          />
        </Menu>
      </div>

      <div className="flex flex-col" onClick={() => setIsGuestsMenuOpen(true)}>
        <div className="flex items-center gap-2">
          <div className="stroke-primary w-[13px] h-3.5">
            <LocationIcon />
          </div>

          <span className="text-caption text-xs leading-[1.625rem]">
            Hóspedes
          </span>
        </div>

        <span className="text-default-text font-semibold text-xs leading-[1.625rem]">
          {searchStore.adultGuests} Adultos, {searchStore.childGuests} Quarto
        </span>

        <Menu isOpen={isGuestsMenuOpen}>
          <GuestsMenu
            handleCloseGuestsMenu={() =>
              setTimeout(() => setIsGuestsMenuOpen(false), 10)
            }
          />
        </Menu>
      </div>

      <Button variant="primary" onClick={() => handleSearch()}>
        <span className="text-xs font-normal">Pesquisar</span>
      </Button>
    </div>
  );
}
