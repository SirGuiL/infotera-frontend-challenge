"use client";

import { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

interface MenuProps {
  isOpen: boolean;
  children: ReactNode;
  side?: "left" | "right";
  marginRight?: string;
  marginTop?: string;
}

export function Menu({
  isOpen,
  children,
  side = "left",
  marginRight,
  marginTop,
}: MenuProps) {
  return (
    <div className="relative inline-block text-left z-30">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`absolute ${
              side === "right"
                ? `${marginRight ? marginRight : "right-0"}`
                : "left-0"
            } ${marginTop ? marginTop : `top-0`} mt-2`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <div
              className={`absolute ${
                side === "right" ? "right-7" : "left-2"
              } -top-2 w-0 h-0 
                          border-l-8 border-r-8 border-b-8 
                          border-l-transparent border-r-transparent border-b-white`}
            ></div>

            <div>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
