"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";

interface BottomBarProps {
  isOpen: boolean;
  children: ReactNode;
}

export function BottomBar({ children, isOpen }: BottomBarProps) {
  return (
    <motion.div
      className="h-screen w-screen fixed bg-black/50 z-50"
      style={{
        top: 0,
        left: 0,
        right: 0,
        display: isOpen ? "block" : "none",
      }}
    >
      <motion.div
        className="absolute rounded-t-2xl overflow-hidden"
        style={{
          bottom: isOpen ? 0 : -1000,
          left: 0,
          right: 0,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
