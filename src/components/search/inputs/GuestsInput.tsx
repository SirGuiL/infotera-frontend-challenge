import { useState } from "react";
import { useSearchStore } from "@/stores/searchStore";

import { PeopleIcon } from "@/components/icons/People";
import { Menu } from "@/components/ui/Menu";
import { GuestsMenu } from "@/components/search/menus/GuestsMenu";

export function GuestsInput() {
  const searchStore = useSearchStore();

  const [isGuestsMenuOpen, setIsGuestsMenuOpen] = useState<boolean>(false);

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
    <div
      className="flex flex-col flex-1 order-1 md:order-4 border-0 md:border-l border-default-border border-[#E3E6E9] md:pl-3.5"
      onClick={() => setIsGuestsMenuOpen(true)}
    >
      <div className="flex items-center gap-2">
        <div className="stroke-primary w-[13px] h-3.5">
          <PeopleIcon />
        </div>

        <span className="text-caption text-xs leading-6">Hóspedes</span>
      </div>

      <span className="text-default-text font-semibold text-xs leading-[1.625rem] -mt-0.5 whitespace-nowrap">
        {formatRoomsLabel()}
      </span>

      <Menu isOpen={isGuestsMenuOpen} marginTop="top-3">
        <GuestsMenu
          handleCloseGuestsMenu={() =>
            setTimeout(() => setIsGuestsMenuOpen(false), 10)
          }
        />
      </Menu>
    </div>
  );
}
