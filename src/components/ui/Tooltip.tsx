interface TooltipProps {
  text: string;
  className?: string;
}

export function Tooltip({ text, className }: TooltipProps) {
  return (
    <div
      className={`absolute right-0 
                    opacity-0 group-hover:opacity-100 
                    transition duration-200 whitespace-nowrap z-50 ${className}`}
    >
      <div className="relative bg-gray-800 px-3 py-1 rounded-md shadow-lg">
        <span className="text-white text-xs">{text}</span>

        <div
          className="absolute right-11 top-full -translate-x-1/2 
                     w-0 h-0 hidden md:block
                     border-l-6 border-r-6 border-t-6 
                     border-l-transparent border-r-transparent border-t-gray-800"
        />
      </div>
    </div>
  );
}
