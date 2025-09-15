"use client";

import { AnimatePresence, motion } from "motion/react";

import { useDebounce } from "@/hooks/useDebounce";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useFilterStore } from "@/stores/filterStore";

import { DeleteIcon } from "@/components/icons/Delete";
import { Separator } from "@/components/ui/Separator";
import { PriceSection } from "@/components/search/menus/filters/PriceSection";
import { RatingSection } from "@/components/search/menus/filters/RatingSection";
import { OrderMenuItem } from "@/components/search/menus/OrderMenuItem";

interface FiltersMenuProps {
  handleCloseFiltersMenu: () => void;
  handleRefetch: () => void;
}

export function FiltersMenu({
  handleCloseFiltersMenu,
  handleRefetch,
}: FiltersMenuProps) {
  const filterStore = useFilterStore();

  const { debounced } = useDebounce(handleRefetch, 500);
  const ref = useClickOutside(handleCloseFiltersMenu);

  function handleSelectStars(stars: number) {
    if (filterStore.starsFilter.includes(stars)) {
      return filterStore.setStarsFilter(
        filterStore.starsFilter.filter((star) => star !== stars)
      );
    }

    return filterStore.setStarsFilter([...filterStore.starsFilter, stars]);
  }

  return (
    <div
      className="bg-white flex flex-col gap-[5px] w-58.5 rounded-lg overflow-hidden inset-shadow-menu py-3.5 px-4"
      ref={ref}
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold text-base leading-6 text-gray-800">
          Filtros
        </span>

        <motion.button
          className="flex items-center gap-[5px] cursor-pointer"
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            filterStore.resetFilters();
            debounced();
          }}
        >
          <div className="fill-blue-500 w-4 h-4">
            <DeleteIcon />
          </div>

          <span className="font-semibold text-[13px] leading-4 text-blue-500">
            Limpar filtros
          </span>
        </motion.button>
      </div>

      <AnimatePresence initial={false}>
        <div className="flex flex-col gap-[15px]">
          <div>
            <label
              htmlFor="hotelName"
              className="font-semibold text-[0.8125rem] text-gray-800"
            >
              Hotel
            </label>

            <input
              type="text"
              id="hotelName"
              value={filterStore.hotelName}
              onChange={(e) => {
                filterStore.setHotelName(e.target.value);
                debounced();
              }}
              className="border border-[#DEDEDE] rounded w-[205px] text-xs text-checkout-label leading-[15px] h-8 py-2 px-3 ring-0 focus:ring-0 focus:outline-none"
              data-cy="filter-hotel-name"
            />
          </div>

          <div className="flex flex-col gap-[15px]">
            <div className="flex flex-col gap-2.5">
              <Separator className="border-gray-300" />

              <OrderMenuItem
                label="Preço"
                arrowDirection={filterStore.showPriceFilter ? "asc" : "desc"}
                onClick={() =>
                  filterStore.setShowPriceFilter(!filterStore.showPriceFilter)
                }
                showArrow
              />
            </div>

            <PriceSection
              debounced={debounced}
              maxPrice={filterStore.maxPrice}
              minPrice={filterStore.minPrice}
              showPriceFilter={filterStore.showPriceFilter}
            />
          </div>

          <div className="flex flex-col gap-[15px]">
            <div className="flex flex-col gap-2.5">
              <Separator className="border-gray-300" />

              <OrderMenuItem
                label="Estrelas"
                arrowDirection={filterStore.showStarsFilter ? "asc" : "desc"}
                onClick={() =>
                  filterStore.setShowStarsFilter(!filterStore.showStarsFilter)
                }
                showArrow
              />
            </div>

            <RatingSection
              debounced={debounced}
              handleSelectStars={handleSelectStars}
              showStarsFilter={filterStore.showStarsFilter}
              starsFilter={filterStore.starsFilter}
            />
          </div>
        </div>
      </AnimatePresence>
    </div>
  );
}
