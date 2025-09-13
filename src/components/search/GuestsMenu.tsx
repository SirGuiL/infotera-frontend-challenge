"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";

import { useClickOutside } from "@/hooks/useClickOutside";
import { useSearchStore } from "@/store/searchStore";

interface GuestsMenuProps {
  handleCloseGuestsMenu: () => void;
}

export function GuestsMenu({ handleCloseGuestsMenu }: GuestsMenuProps) {
  const ref = useClickOutside(handleCloseGuestsMenu);
  const searchStore = useSearchStore();

  const [adultGuests, setAdultGuests] = useState(searchStore.adultGuests);
  const [childGuests, setChildGuests] = useState(searchStore.childGuests);

  function handleRemoveAdult() {
    if (adultGuests == 0) return;

    setAdultGuests(adultGuests - 1);
  }

  function handleRemoveChild() {
    if (childGuests == 0) return;

    setChildGuests(childGuests - 1);
  }

  function handleApplyGuests() {
    searchStore.setAdultGuests(adultGuests);
    searchStore.setChildGuests(childGuests);
    handleCloseGuestsMenu();
  }

  return (
    <div
      className="w-[177px] rounded-lg overflow-hidden inset-shadow-menu"
      ref={ref}
    >
      <div className="flex flex-col overflow-auto bg-white pt-0.5 pb-2.5 px-2.5">
        <div className="flex flex-col gap-[5px]">
          <span className="text-default-text font-semibold text-[10px] leading-[1.625rem]">
            Adultos
          </span>

          <div className="flex justify-between items-center">
            <button
              className="flex items-center justify-center h-[15px] w-[15px] bg-light-gray rounded-full cursor-pointer"
              onClick={handleRemoveAdult}
            >
              <span className="text-[8px] font-semibold">-</span>
            </button>

            <span className="text-[0.5rem]"> {adultGuests} </span>

            <button
              className="flex items-center justify-center h-[15px] w-[15px] bg-light-gray rounded-full cursor-pointer"
              onClick={() => setAdultGuests(adultGuests + 1)}
            >
              <span className="text-[8px] font-semibold">+</span>
            </button>
          </div>

          <Separator className="border-light-gray mt-2" />
        </div>

        <div className="flex flex-col gap-[5px]">
          <span className="text-default-text font-semibold text-[10px] leading-[1.625rem]">
            Crianças
          </span>

          <div className="flex justify-between items-center">
            <button
              className="flex items-center justify-center h-[15px] w-[15px] bg-light-gray rounded-full cursor-pointer"
              onClick={handleRemoveChild}
            >
              <span className="text-[8px] font-semibold">-</span>
            </button>

            <span className="text-[0.5rem]"> {childGuests} </span>

            <button
              className="flex items-center justify-center h-[15px] w-[15px] bg-light-gray rounded-full cursor-pointer"
              onClick={() => setChildGuests(childGuests + 1)}
            >
              <span className="text-[8px] font-semibold">+</span>
            </button>
          </div>

          <Separator className="border-light-gray mt-2" />
        </div>

        <Button
          variant="secondary"
          className="flex items-center justify-center min-h-[19px] max-h-[19px] w-15 pl-0 pr-0 py-0 max-w-15 mt-[13px] self-end"
          onClick={handleApplyGuests}
        >
          <span className="text-primary text-[0.5rem] ">Aplicar</span>
        </Button>
      </div>
    </div>
  );
}
