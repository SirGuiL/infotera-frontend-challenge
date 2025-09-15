import { useFormContext } from "react-hook-form";

import { useBookingStore } from "@/store/bookingStore";
import { CheckoutFormData } from "@/schemas/checkoutSchema";

import { FormField } from "@/components/ui/FormField";
import { Skeleton } from "@/components/ui/Skeleton";

export function GuestInfoForm() {
  const bookingStore = useBookingStore();
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormData>();

  if (!bookingStore.isHydrated) {
    return (
      <div className="flex flex-col gap-2 bg-white p-5 rounded-[14px] drop-shadow-checkout-form">
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
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 bg-white p-5 rounded-[14px] drop-shadow-checkout-form">
      <span className="text-default-text text-base leading-4 font-bold">
        Hotel: {bookingStore.selectedHotel?.hotel.name}
      </span>

      <div className="mt-[1px] grid grid-cols-2 md:flex gap-[15px]">
        <FormField<CheckoutFormData>
          name="name"
          label="Nome (Hóspede)"
          placeholder="Primeiro nome do hóspede"
          register={register}
          errors={errors}
        />

        <FormField<CheckoutFormData>
          name="lastName"
          label="Sobrenome"
          placeholder="Sobrenome do hóspede"
          register={register}
          errors={errors}
        />
      </div>
    </div>
  );
}
