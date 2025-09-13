import { AnimatePresence, motion } from "motion/react";
import { ReactNode, useState } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary";
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

type Ripple = {
  x: number;
  y: number;
  id: number;
};

export function Button({
  children,
  variant = "primary",
  className = "",
  onClick,
  ...props
}: ButtonProps) {
  const baseClasses =
    "cursor-pointer rounded-full px-7 relative overflow-hidden";

  const variantClasses = {
    primary: "bg-primary text-white h-9.5 inset-shadow-button",
    secondary: "bg-transparent text-primary border border-primary",
  };

  const [ripples, setRipples] = useState<Ripple[]>([]);

  const addRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={(e) => {
        addRipple(e);
        onClick?.(e);
      }}
      {...props}
    >
      {children}

      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: ripple.y,
              left: ripple.x,
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.4)",
              pointerEvents: "none",
            }}
          />
        ))}
      </AnimatePresence>
    </motion.button>
  );
}
