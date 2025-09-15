import { Skeleton } from "@/components/ui/Skeleton";

export function ContactFormSkeleton() {
  return (
    <div className="flex flex-col gap-3.5 bg-white p-5 rounded-[14px] drop-shadow-checkout-form">
      <Skeleton className="h-4 w-1/4" />

      <div className="mt-[1px] w-full grid grid-cols-2 md:flex gap-[15px]">
        <div className="flex col-span-1 flex-col gap-[5px]">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-7 w-full md:w-[205px]" />
        </div>

        <div className="flex col-span-1 flex-col gap-[5px]">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-7 w-full md:w-[205px]" />
        </div>

        <div className="flex col-span-1 flex-col gap-[5px]">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-7 w-full md:w-[205px]" />
        </div>
      </div>

      <div className="flex flex-col gap-[5px]">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="w-full h-21" />
      </div>
    </div>
  );
}
