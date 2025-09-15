import { motion } from "motion/react";

import { Checkbox } from "@/components/ui/Checkbox";
import { useFilterStore } from "@/stores/filterStore";

interface RatingSectionProps {
  showStarsFilter: boolean;
  starsFilter: number[];
  handleSelectStars: (stars: number) => void;
  debounced: () => void;
}

export function RatingSection({
  starsFilter,
  showStarsFilter,
  handleSelectStars,
  debounced,
}: RatingSectionProps) {
  const filterStore = useFilterStore();

  const RATING_OPTIONS = [
    { value: 1, label: "1 estrela", count: filterStore.quantityOfStars[1] },
    { value: 2, label: "2 estrelas", count: filterStore.quantityOfStars[2] },
    { value: 3, label: "3 estrelas", count: filterStore.quantityOfStars[3] },
    { value: 4, label: "4 estrelas", count: filterStore.quantityOfStars[4] },
    { value: 5, label: "5 estrelas", count: filterStore.quantityOfStars[5] },
    {
      value: 0,
      label: "Não classificado",
      count: filterStore.quantityOfStars[0],
    },
  ];

  return (
    <motion.div
      className="flex flex-col gap-2.5"
      initial={{ height: 0, opacity: 0 }}
      animate={{
        height: showStarsFilter ? "auto" : 0,
        opacity: showStarsFilter ? 1 : 0,
        marginBottom: !showStarsFilter ? -15 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {RATING_OPTIONS.map((item, index) => (
        <div className="flex items-center gap-[5px]" key={index}>
          <Checkbox
            checked={starsFilter.includes(item.value)}
            onChange={() => {
              handleSelectStars(item.value);
              debounced();
            }}
            id={item.value.toString()}
            label={item.label}
          />

          <label
            htmlFor={item.value.toString()}
            className="text-[0.8125rem] leading-4 flex-1 text-gray-800"
          >
            {item.label}
          </label>

          <label
            htmlFor={item.value.toString()}
            className="text-xs leading-4 font-semibold text-gray-800"
          >
            {item.count || 0}
          </label>
        </div>
      ))}
    </motion.div>
  );
}
