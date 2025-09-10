import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses = "cursor-pointer rounded-full px-7";

  const variantClasses = {
    primary: "bg-primary text-white h-9.5 inset-shadow-button",
    secondary: "bg-white text-primary border border-primary",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
