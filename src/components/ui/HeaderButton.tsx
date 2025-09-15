import { ReactNode } from "react";
import { motion } from "motion/react";

interface HeaderButtonProps {
  icon: ReactNode;
  text: string;
  onClick?: () => void;
}

export function HeaderButton({ icon, text, onClick }: HeaderButtonProps) {
  return (
    <motion.button
      className="flex items-center cursor-pointer gap-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      <div className="stroke-caption h-3 w-3">{icon}</div>

      <span className="font-medium text-caption text-sm">{text}</span>
    </motion.button>
  );
}
