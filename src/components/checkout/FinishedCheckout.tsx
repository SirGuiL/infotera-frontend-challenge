"use client";

import { CheckoutFormData } from "@/schemas/checkoutSchema";
import { useBookingStore } from "@/store/bookingStore";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export function FinishedCheckout() {
  const { getValues } = useFormContext<CheckoutFormData>();

  const bookingStore = useBookingStore();
  const { setIsFinishedCheckout, selectedHotel } = bookingStore;

  const formData = getValues();

  useEffect(() => {
    setIsFinishedCheckout(true);

    return () => {
      setIsFinishedCheckout(false);
    };
  }, [setIsFinishedCheckout]);

  return (
    <div className="bg-overlay flex justify-center items-center absolute h-full w-full left-0 top-0">
      <div className="flex flex-col gap-0.5">
        <h1 className="font-medium text-lg md:text-[32px] md:leading-16 text-white">
          Reserva realizada com sucesso!
        </h1>

        <p className="text-white text-sm md:text-xl md:leading-8">
          <b className="font-bold">Hotel:</b> {selectedHotel?.hotel.name}
          <br />
          <br />
          <b className="font-bold">Hospede:</b>
          <br />
          Nome: {formData.name} {formData.lastName}
          <br />
          <br />
          <b className="font-bold">Contato:</b>
          <br />
          Nome: {formData.contactName}
          <br />
          E-mail: {formData.contactEmail}
        </p>
      </div>
    </div>
  );
}
