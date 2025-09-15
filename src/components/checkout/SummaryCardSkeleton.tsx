import { Skeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";

export function SummaryCardSkeleton() {
  return (
    <div className="bg-white rounded-[14px] w-full md:w-auto drop-shadow-checkout-form p-4.5 flex flex-col gap-[33px] self-start">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-1/4" />

        <hr className="border-t border-[#E4E4E4]" />

        <div className="flex flex-col gap-0.5">
          <Skeleton className="h-[23px] w-1/3" />

          <Skeleton className="h-4 w-80" />
        </div>

        <div className="flex flex-col">
          <Skeleton className="h-6.5 w-1/2" />
          <Skeleton className="h-6 w-2/3" />
        </div>

        <hr className="border-t border-[#E4E4E4]" />

        <div className="flex flex-col gap-2.5">
          <div className="flex justify-between">
            <span className="text-checkout-label text-[13px] leading-4">
              Impostos e taxas
            </span>

            <Skeleton className="h-4 w-16" />
          </div>

          <div className="flex justify-between">
            <span className="text-checkout-label text-[13px] leading-4">
              Total
            </span>

            <Skeleton className="h-4 w-28" />
          </div>
        </div>
      </div>

      <Button type="submit" disabled>
        <span className="text-white font-bold text-xs leading-[1.625rem]">
          RESERVAR
        </span>
      </Button>
    </div>
  );
}
