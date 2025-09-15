import { useFormContext } from "react-hook-form";

import { FormField } from "@/components/ui/FormField";
import { Skeleton } from "@/components/ui/Skeleton";

import { CheckoutFormData } from "@/schemas/checkoutSchema";
import { formatPhone } from "@/utils/formatPhone";
import { useBookingStore } from "@/store/bookingStore";

export function ContactForm() {
  const bookingStore = useBookingStore();
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormData>();

  if (!bookingStore.isHydrated) {
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

  return (
    <div className="flex flex-col gap-3.5 bg-white p-5 rounded-[14px] drop-shadow-checkout-form">
      <span className="text-default-text text-base leading-4 font-bold">
        Contato da reserva
      </span>

      <div className="mt-[1px] grid grid-cols-2 md:flex gap-[15px]">
        <FormField<CheckoutFormData>
          name="contactName"
          label="Nome"
          placeholder="Nome de contato"
          colSpan="2"
          register={register}
          errors={errors}
        />

        <FormField<CheckoutFormData>
          name="contactEmail"
          label="Email"
          placeholder="jd@example.com"
          type="email"
          register={register}
          errors={errors}
        />

        <FormField<CheckoutFormData>
          name="contactPhone"
          label="Telefone (WhatsApp)"
          placeholder="(99) 99999-9999"
          type="tel"
          onChange={(e) => {
            e.target.value = formatPhone(e.target.value);
          }}
          register={register}
          errors={errors}
        />
      </div>

      <FormField<CheckoutFormData>
        name="observations"
        label="Observações"
        placeholder="Observações do contato da reserva"
        register={register}
        errors={errors}
        isTextarea
      />
    </div>
  );
}
