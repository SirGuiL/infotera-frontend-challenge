import { MouseEvent } from "react";
import { motion } from "motion/react";

import { ArrowDownIcon } from "@/components/icons/ArrowDown";

interface OrderMenuItemProps {
  label: string;
  arrowDirection?: "asc" | "desc";
  showArrow?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function OrderMenuItem({
  arrowDirection,
  label,
  showArrow,
  ...props
}: OrderMenuItemProps) {
  return (
    <motion.button
      className="flex items-center justify-between cursor-pointer"
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <span>{label}</span>

      <motion.div
        className="fill-gray-800 w-4 h-4"
        animate={{
          rotate: arrowDirection === "asc" ? "0deg" : "180deg",
          opacity: showArrow ? 1 : 0,
        }}
      >
        <ArrowDownIcon />
      </motion.div>
    </motion.button>
  );
}
