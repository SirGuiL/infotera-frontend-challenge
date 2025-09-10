import { Skeleton } from "@/components/ui/Skeleton";

export function HotelDetailsSkeleton() {
  return (
    <div className="flex flex-col gap-[41.49px] pt-4 pl-4 pb-[19px] pr-[25px] bg-white rounded-[14px]">
      <div className="flex gap-4">
        <div className="min-w-[447px] max-w-[447px] h-[312px] rounded-xl bg-gray-200 animate-pulse"></div>

        <div className="w-full">
          <Skeleton className="h-[1.625rem] w-3/4" />
          <Skeleton className="h-[1.625rem] w-2/4" />

          <div className="mt-[7px]">
            <Skeleton className="h-4 w-1/4" />
          </div>

          <div className="mt-[13px] flex flex-col gap-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-1/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[13px]">
        <h3 className="font-semibold text-default-text text-xl leading-[1.625rem]">
          Quartos disponíveis
        </h3>

        {Array.from({ length: 2 }).map((_, index) => (
          <Skeleton className="w-full h-22 rounded-[14px]" key={index} />
        ))}
      </div>
    </div>
  );
}
