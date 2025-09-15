"use client";

import { useBookingStore } from "@/stores/bookingStore";

import { FinishedCheckout } from "@/components/checkout/FinishedCheckout";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { CheckoutFormProvider } from "@/contexts/CheckoutFormContext";

export default function CheckoutPage() {
  const bookingStore = useBookingStore();

  if (bookingStore.isFinishedCheckout) {
    return (
      <CheckoutFormProvider>
        <FinishedCheckout />
      </CheckoutFormProvider>
    );
  }

  return (
    <CheckoutFormProvider>
      <div className="pt-6.5 pb-10 md:pb-0">
        <div className="flex flex-col gap-4 md:gap-2">
          <span className="font-bold text-default-text text-base leading-4">
            Finalize sua reserva!
          </span>

          <CheckoutForm />
        </div>
      </div>
    </CheckoutFormProvider>
  );
}
