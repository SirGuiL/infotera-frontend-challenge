import { RefObject, useState } from "react";

import { LocationIcon } from "@/components/icons/Location";
import { Menu } from "@/components/ui/Menu";
import { SuggestionsMenu } from "@/components/search/menus/SuggestionsMenu";
import { useSearchStore } from "@/stores/searchStore";
import { sleep } from "@/utils/sleep";

interface DestinationInputProps {
  inputRef: RefObject<HTMLInputElement | null>;
}

export function DestinationInput({ inputRef }: DestinationInputProps) {
  const searchStore = useSearchStore();

  const [isSuggestionsMenuOpen, setIsSuggestionsMenuOpen] =
    useState<boolean>(false);

  function openDestinationMenu() {
    sleep(100);
    setIsSuggestionsMenuOpen(true);
  }

  return (
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
          setIsSuggestionsMenuOpen(false);
        }}
        ref={inputRef}
      />

      <Menu isOpen={isSuggestionsMenuOpen} marginTop="top-3">
        <SuggestionsMenu />
      </Menu>
    </div>
  );
}
