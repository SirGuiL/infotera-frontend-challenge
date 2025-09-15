import { useFilterStore } from "@/stores/filterStore";
import { useState, useRef, useEffect, useCallback } from "react";

interface RangeSliderProps {
  onChange: () => void;
}

export function RangeSlider({ onChange }: RangeSliderProps) {
  const filterStore = useFilterStore();

  const sliderRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<"min" | "max" | null>(null);

  const { setMinPrice, setMaxPrice, minPrice, maxPrice } = useFilterStore();

  const min = 0;
  const max = 1200;

  const getPercent = (value: number) => ((value - min) / (max - min)) * 100;

  const handleChange = useCallback(() => {
    onChange();
  }, [onChange]);

  useEffect(() => {
    if (!dragging) return;

    const handleMove = (clientX: number) => {
      if (!sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percent = Math.min(Math.max(x / rect.width, 0), 1);
      const value = Math.round(percent * (max - min) + min);

      if (dragging === "min") {
        setMinPrice(Math.min(value, maxPrice - 1));
      } else {
        setMaxPrice(Math.max(value, minPrice + 1));
      }
    };

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);

    const handleEnd = () => {
      handleChange();
      setDragging(null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragging]);

  return (
    <div className="w-full px-4 h-4 flex items-center">
      <div
        ref={sliderRef}
        className="relative h-[3px] bg-gray-200 rounded-full w-full"
      >
        <div
          className="absolute h-[3px] bg-primary rounded-full"
          style={{
            left: `${getPercent(filterStore.minPrice)}%`,
            width: `${
              getPercent(filterStore.maxPrice) -
              getPercent(filterStore.minPrice)
            }%`,
          }}
        ></div>

        <div
          className="absolute w-4 h-4 border-0 bg-primary rounded-full -top-1.5 cursor-pointer shadow"
          style={{ left: `calc(${getPercent(filterStore.minPrice)}% - 12px)` }}
          onMouseDown={() => setDragging("min")}
          onTouchStart={() => setDragging("min")}
          data-cy="min-price-slider"
        ></div>

        <div
          className="absolute w-4 h-4 border-0 bg-primary rounded-full -top-1.5 cursor-pointer shadow"
          style={{ left: `calc(${getPercent(filterStore.maxPrice)}% - 12px)` }}
          onMouseDown={() => setDragging("max")}
          onTouchStart={() => setDragging("max")}
        ></div>
      </div>
    </div>
  );
}
