import { useFilterStore } from "@/store/filterStore";
import { useState, useRef, useEffect } from "react";

export default function RangeSlider() {
  const filterStore = useFilterStore();

  const sliderRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<"min" | "max" | null>(null);

  const min = 0;
  const max = 1200;

  const getPercent = (value: number) => ((value - min) / (max - min)) * 100;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sliderRef.current || !dragging) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = Math.min(Math.max(x / rect.width, 0), 1);
      const value = Math.round(percent * (max - min) + min);

      if (dragging === "min") {
        filterStore.setMinPrice(Math.min(value, filterStore.maxPrice - 1));
        return;
      }

      filterStore.setMaxPrice(Math.max(value, filterStore.minPrice + 1));
    };

    const handleMouseUp = () => setDragging(null);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, filterStore]);

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
        ></div>

        <div
          className="absolute w-4 h-4 border-0 bg-primary rounded-full -top-1.5 cursor-pointer shadow"
          style={{ left: `calc(${getPercent(filterStore.maxPrice)}% - 12px)` }}
          onMouseDown={() => setDragging("max")}
        ></div>
      </div>
    </div>
  );
}
