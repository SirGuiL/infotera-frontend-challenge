import { differenceInCalendarDays } from "date-fns";

import { useBookingStore } from "@/stores/bookingStore";
import { useSearchStore } from "@/stores/searchStore";

import { Button } from "@/components/ui/Button";
import { SummaryCardSkeleton } from "@/components/checkout/SummaryCardSkeleton";
import { CancellationType } from "../ui/CancellationType";

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
    return <SummaryCardSkeleton />;
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

          <CancellationType
            refundable={
              bookingStore.selectedRoom?.cancellationPolicies.refundable
            }
          />
        </div>

        <hr className="border-t border-[#E4E4E4]" />

        <div className="flex flex-col gap-2.5">
          <div className="flex justify-between">
            <span className="text-checkout-label text-[13px] leading-4">
              Impostos e taxas
            </span>

            <span className="text-checkout-label text-[13px] leading-4 font-semibold">
              {tax.toLocaleString("pt-BR", {
                style: "currency",
                currency: bookingStore.selectedRoom?.price.currency || "BRL",
              })}
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
