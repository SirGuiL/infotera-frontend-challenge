import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

import { useClickOutside } from "@/hooks/useClickOutside";
import { useFilterStore } from "@/store/filterStore";

import { DeleteIcon } from "@/components/icons/Delete";
import { ArrowDownIcon } from "@/components/icons/ArrowDown";
import { Separator } from "@/components/ui/Separator";
import { RangeSlider } from "@/components/ui/RangeSlider";
import { Checkbox } from "@/components/ui/Checkbox";

import { useDebounce } from "@/hooks/useDebounce";

interface FiltersMenuProps {
  handleCloseFiltersMenu: () => void;
  handleRefetch: () => void;
}

export function FiltersMenu({
  handleCloseFiltersMenu,
  handleRefetch,
}: FiltersMenuProps) {
  const filterStore = useFilterStore();

  const { hotelName, maxPrice, minPrice, starsFilter } = filterStore;

  const { debounced } = useDebounce(handleRefetch, 1500);
  const ref = useClickOutside(handleCloseFiltersMenu);

  function handleSelectStars(stars: number) {
    if (filterStore.starsFilter.includes(stars)) {
      return filterStore.setStarsFilter(
        filterStore.starsFilter.filter((star) => star !== stars)
      );
    }

    return filterStore.setStarsFilter([...filterStore.starsFilter, stars]);
  }

  useEffect(
    () => debounced,
    [hotelName, maxPrice, minPrice, starsFilter, debounced]
  );

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
          onClick={() => filterStore.resetFilters()}
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
              onChange={(e) => filterStore.setHotelName(e.target.value)}
              className="border border-[#DEDEDE] rounded w-[205px] text-xs text-checkout-label leading-[15px] h-8 py-2 px-3 ring-0 focus:ring-0 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-[15px]">
            <div className="flex flex-col gap-2.5">
              <Separator className="border-gray-300" />

              <motion.button
                className="flex items-center justify-between cursor-pointer"
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  filterStore.setShowPriceFilter(!filterStore.showPriceFilter)
                }
              >
                <span>Preço</span>

                <motion.div
                  className="fill-gray-800 w-4 h-4"
                  animate={{
                    rotate: filterStore.showPriceFilter ? "0deg" : "180deg",
                  }}
                >
                  <ArrowDownIcon />
                </motion.div>
              </motion.button>
            </div>

            <motion.div
              className="flex flex-col gap-[15px]"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: filterStore.showPriceFilter ? "auto" : 0,
                opacity: filterStore.showPriceFilter ? 1 : 0,
                marginBottom: !filterStore.showPriceFilter ? -15 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="grid grid-cols-3 items-center justify-between text-xs text-gray-800">
                <span>
                  {filterStore.minPrice.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>

                <span className="text-center">―</span>

                <span>
                  {filterStore.maxPrice.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>

              <div>
                <RangeSlider />
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col gap-[15px]">
            <div className="flex flex-col gap-2.5">
              <Separator className="border-gray-300" />

              <motion.button
                className="flex items-center justify-between cursor-pointer"
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  filterStore.setShowStarsFilter(!filterStore.showStarsFilter)
                }
              >
                <span>Estrelas</span>

                <motion.div
                  className="fill-gray-800 w-4 h-4"
                  animate={{
                    rotate: filterStore.showStarsFilter ? "0deg" : "180deg",
                  }}
                >
                  <ArrowDownIcon />
                </motion.div>
              </motion.button>
            </div>

            <motion.div
              className="flex flex-col gap-2.5"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: filterStore.showStarsFilter ? "auto" : 0,
                opacity: filterStore.showStarsFilter ? 1 : 0,
                marginBottom: !filterStore.showStarsFilter ? -15 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-[5px]">
                <Checkbox
                  checked={filterStore.starsFilter.includes(1)}
                  onChange={() => handleSelectStars(1)}
                  id="1"
                  label="1 estrela"
                />

                <label
                  htmlFor="1"
                  className="text-[0.8125rem] leading-4 flex-1 text-gray-800"
                >
                  1 estrela
                </label>

                <label
                  htmlFor="1"
                  className="text-xs leading-4 font-semibold text-gray-800"
                >
                  28
                </label>
              </div>

              <div className="flex items-center gap-[5px]">
                <Checkbox
                  checked={filterStore.starsFilter.includes(2)}
                  onChange={() => handleSelectStars(2)}
                  id="2"
                  label="2 estrela"
                />

                <label
                  htmlFor="2"
                  className="text-[0.8125rem] leading-4 flex-1 text-gray-800"
                >
                  2 estrela
                </label>

                <label
                  htmlFor="2"
                  className="text-xs leading-4 font-semibold text-gray-800"
                >
                  28
                </label>
              </div>

              <div className="flex items-center gap-[5px]">
                <Checkbox
                  checked={filterStore.starsFilter.includes(3)}
                  onChange={() => handleSelectStars(3)}
                  id="3"
                  label="3 estrela"
                />

                <label
                  htmlFor="3"
                  className="text-[0.8125rem] leading-4 flex-1 text-gray-800"
                >
                  3 estrela
                </label>

                <label
                  htmlFor="3"
                  className="text-xs leading-4 font-semibold text-gray-800"
                >
                  28
                </label>
              </div>

              <div className="flex items-center gap-[5px]">
                <Checkbox
                  checked={filterStore.starsFilter.includes(4)}
                  onChange={() => handleSelectStars(4)}
                  id="4"
                  label="4 estrela"
                />

                <label
                  htmlFor="4"
                  className="text-[0.8125rem] leading-4 flex-1 text-gray-800"
                >
                  4 estrela
                </label>

                <label
                  htmlFor="4"
                  className="text-xs leading-4 font-semibold text-gray-800"
                >
                  28
                </label>
              </div>

              <div className="flex items-center gap-[5px]">
                <Checkbox
                  checked={filterStore.starsFilter.includes(5)}
                  onChange={() => handleSelectStars(5)}
                  id="5"
                  label="5 estrela"
                />

                <label
                  htmlFor="5"
                  className="text-[0.8125rem] leading-4 flex-1 text-gray-800"
                >
                  5 estrela
                </label>

                <label
                  htmlFor="5"
                  className="text-xs leading-4 font-semibold text-gray-800"
                >
                  28
                </label>
              </div>

              <div className="flex items-center gap-[5px]">
                <Checkbox
                  checked={filterStore.starsFilter.includes(0)}
                  onChange={() => handleSelectStars(0)}
                  id="0"
                  label="0 estrela"
                />

                <label
                  htmlFor="0"
                  className="text-[0.8125rem] leading-4 flex-1 text-gray-800"
                >
                  Não classificado
                </label>

                <label
                  htmlFor="0"
                  className="text-xs leading-4 font-semibold text-gray-800"
                >
                  28
                </label>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatePresence>
    </div>
  );
}
