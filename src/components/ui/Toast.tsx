import { useState, useEffect, ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

interface ToastProps {
  message: string;
  duration?: number;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  type?: "success" | "error" | "info" | "warning";
  icon?: ReactNode;
}

export function Toast({
  message,
  duration = 3000,
  position = "top-right",
  type = "info",
  icon,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [displayMessage, setDisplayMessage] = useState("");

  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  };

  const typeClasses = {
    success: "bg-green-500 text-white fill-white",
    error: "bg-red-custom text-white fill-white",
    info: "bg-blue-500 text-white fill-white",
    warning: "bg-yellow-500 text-white fill-white",
  };

  useEffect(() => {
    if (!message) return;

    setDisplayMessage(message);
    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration]);

  return (
    <AnimatePresence initial={false}>
      {isVisible && (
        <motion.div
          className={`fixed px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 ${positionClasses[position]} ${typeClasses[type]}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="h-4.5 w-4.5">{icon}</div>

          <span className="text-base font-regular">{displayMessage}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
