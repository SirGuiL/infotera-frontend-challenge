import { motion } from "motion/react";

import { RangeSlider } from "@/components/ui/RangeSlider";

interface PriceSectionProps {
  showPriceFilter: boolean;
  minPrice: number;
  maxPrice: number;
  debounced: () => void;
}

export function PriceSection({
  showPriceFilter,
  maxPrice,
  minPrice,
  debounced,
}: PriceSectionProps) {
  return (
    <motion.div
      className="flex flex-col gap-[15px]"
      initial={{ height: 0, opacity: 0 }}
      animate={{
        height: showPriceFilter ? "auto" : 0,
        opacity: showPriceFilter ? 1 : 0,
        marginBottom: !showPriceFilter ? -15 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="grid grid-cols-3 items-center justify-between text-xs text-gray-800">
        <span>
          {minPrice.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>

        <span className="text-center">―</span>

        <span>
          {maxPrice.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>

      <div>
        <RangeSlider onChange={() => debounced()} />
      </div>
    </motion.div>
  );
}
