"use client";

import { useBookingStore } from "@/store/bookingStore";
import { useEffect } from "react";

export function FinishedCheckout() {
  const setIsFinishedCheckout = useBookingStore(
    (state) => state.setIsFinishedCheckout
  );

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
          <b className="font-bold">Hotel:</b> Stadshotel Steegoversloot
          <br />
          <br />
          <b className="font-bold">Hospede:</b>
          <br />
          Nome: Jose Silva
          <br />
          <br />
          <b className="font-bold">Contato:</b>
          <br />
          Nome: Maria SIlva
          <br />
          E-mail: teste@teste.com
        </p>
      </div>
    </div>
  );
}
