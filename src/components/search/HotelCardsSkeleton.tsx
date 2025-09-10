import { Skeleton } from "@/components/ui/Skeleton";

export function HotelCardsSkeleton() {
  return (
    <div
      className="grid grid-flow-row auto-rows-max gap-y-[53px] gap-x-8"
      style={{
        gridTemplateColumns: "repeat(auto-fill, 397px)",
        justifyContent: "space-between",
      }}
    >
      {Array.from({ length: 9 }).map((_, index) => (
        <Skeleton
          className="rounded-[14px] h-[357px] w-[397px] bg-gray-300"
          key={index}
        />
      ))}
    </div>
  );
}
