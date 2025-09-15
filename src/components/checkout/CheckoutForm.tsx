import { useFormContext } from "react-hook-form";

import { CheckoutFormData } from "@/schemas/checkoutSchema";
import { useBookingStore } from "@/store/bookingStore";

import { GuestInfoForm } from "@/components/checkout/GuestInfoForm";
import { ContactForm } from "@/components/checkout/ContactForm";
import { SummaryCard } from "@/components/checkout/SummaryCard";

export function CheckoutForm() {
  const bookingStore = useBookingStore();
  const { handleSubmit } = useFormContext<CheckoutFormData>();

  function onSubmit() {
    bookingStore.setIsFinishedCheckout(true);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-[1px] flex flex-col md:flex-row gap-[21px]"
    >
      <div className="flex flex-col gap-5 flex-1">
        <GuestInfoForm />
        <ContactForm />
      </div>

      <SummaryCard />
    </form>
  );
}
