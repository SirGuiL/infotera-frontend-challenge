import { differenceInCalendarDays } from "date-fns";

import { useBookingStore } from "@/store/bookingStore";
import { useSearchStore } from "@/store/searchStore";

import { CheckCircleIcon } from "@/components/icons/CheckCircle";
import { XCircleIcon } from "@/components/icons/XCircle";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";

export function SummaryCard() {
  const bookingStore = useBookingStore();
  const searchStore = useSearchStore();

  const tax = 670.08;

  function calcTotalPrice() {
    const totalDays =
      differenceInCalendarDays(
        searchStore.checkoutDate,
        searchStore.checkinDate
      ) + 1;

    const price = bookingStore.selectedRoom?.price.amount as number;

    return totalDays * price + tax;
  }

  if (!bookingStore.isHydrated) {
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

  return (
    <div className="bg-white rounded-[14px] w-full md:w-auto drop-shadow-checkout-form p-4.5 flex flex-col gap-[33px] self-start">
      <div className="flex flex-col gap-2">
        <span className="font-bold text-primary text-base leading-4">
          Sua reserva
        </span>

        <hr className="border-t border-[#E4E4E4]" />

        <div className="flex flex-col gap-0.5">
          <span className="font-bold text-[15px] h-[23px] text-default-text">
            {bookingStore.selectedHotel?.hotel.name}
          </span>

          <span className="text-[13px] leading-4 text-caption">
            {bookingStore.selectedHotel?.hotel.address}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-default-text text-[13px] leading-[1.625rem]">
            {bookingStore.selectedRoom?.roomType.name}
          </span>

          <div className="flex items-center gap-2 -mt-[5px]">
            {bookingStore.selectedRoom?.cancellationPolicies.refundable ? (
              <div className="stroke-primary w-3 h-3">
                <CheckCircleIcon />
              </div>
            ) : (
              <div className="stroke-red-custom w-3 h-3">
                <XCircleIcon />
              </div>
            )}

            <span
              className={
                bookingStore.selectedRoom?.cancellationPolicies.refundable
                  ? "text-primary"
                  : "text-red-custom"
              }
            >
              {bookingStore.selectedRoom?.cancellationPolicies.refundable
                ? "Cancelamento gratuito"
                : "Multa de cancelamento"}
            </span>
          </div>
        </div>

        <hr className="border-t border-[#E4E4E4]" />

        <div className="flex flex-col gap-2.5">
          <div className="flex justify-between">
            <span className="text-checkout-label text-[13px] leading-4">
              Impostos e taxas
            </span>

            <span className="text-checkout-label text-[13px] leading-4 font-semibold">
              R$ 670,08
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-checkout-label text-[13px] leading-4">
              Total
            </span>

            <span className="text-primary text-xl leading-4 font-bold">
              {calcTotalPrice().toLocaleString("pt-BR", {
                style: "currency",
                currency: bookingStore.selectedRoom?.price.currency || "BRL",
              })}
            </span>
          </div>
        </div>
      </div>

      <Button type="submit">
        <span className="text-white font-bold text-xs leading-[1.625rem]">
          RESERVAR
        </span>
      </Button>
    </div>
  );
}
