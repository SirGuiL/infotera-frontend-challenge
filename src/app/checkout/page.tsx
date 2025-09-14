"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { checkoutSchema, CheckoutFormData } from "@/schemas/checkoutSchema";
import { useBookingStore } from "@/store/bookingStore";

import { Button } from "@/components/ui/Button";
import { CheckCircleIcon } from "@/components/icons/CheckCircle";
import { XCircleIcon } from "@/components/icons/XCircle";
import { FinishedCheckout } from "@/components/checkout/FinishedCheckout";

export default function CheckoutPage() {
  const bookingStore = useBookingStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  function onSubmit() {
    bookingStore.setIsFinishedCheckout(true);
  }

  if (bookingStore.isFinishedCheckout) {
    return <FinishedCheckout />;
  }

  return (
    <div className="pt-6.5 pb-10 md:pb-0">
      <div className="flex flex-col gap-4 md:gap-2">
        <span className="font-bold text-default-text text-base leading-4">
          Finalize sua reserva!
        </span>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-[1px] flex flex-col md:flex-row gap-[21px]"
        >
          <div className="flex flex-col gap-5 flex-1">
            <div className="flex flex-col gap-2 bg-white p-5 rounded-[14px] drop-shadow-checkout-form">
              <span className="text-default-text text-base leading-4 font-bold">
                Hotel: {bookingStore.selectedHotel?.hotel.name}
              </span>

              <div className="mt-[1px] grid grid-cols-2 md:flex gap-[15px]">
                <div className="flex flex-col gap-[5px]">
                  <label
                    htmlFor="name"
                    className="font-semibold text-[13px] text-checkout-label leading-4 h-4"
                  >
                    Nome <span className="font-normal">(Hóspede)</span>
                  </label>

                  <input
                    {...register("name")}
                    className="border border-[#DEDEDE] rounded md:w-[205px] text-[13px] text-checkout-label leading-5 h-7 py-2 px-3 ring-0 focus:ring-0 focus:outline-none"
                    placeholder="Primeiro nome do hóspede"
                    id="name"
                  />

                  {errors.name && (
                    <p className="text-red-custom text-xs">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-[5px]">
                  <label
                    htmlFor="lastName"
                    className="font-semibold text-[13px] text-checkout-label leading-4 h-4"
                  >
                    Sobrenome
                  </label>

                  <input
                    {...register("lastName")}
                    className="border border-[#DEDEDE] rounded md:w-[205px] text-[13px] text-checkout-label leading-5 h-7 py-2 px-3 ring-0 focus:ring-0 focus:outline-none"
                    placeholder="Sobrenome do hóspede"
                    id="lastName"
                  />

                  {errors.lastName && (
                    <p className="text-red-custom text-xs">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3.5 bg-white p-5 rounded-[14px] drop-shadow-checkout-form">
              <span className="text-default-text text-base leading-4 font-bold">
                Contato da reserva
              </span>

              <div className="mt-[1px] grid grid-cols-2 md:flex gap-[15px]">
                <div className="flex col-span-2 flex-col gap-[5px]">
                  <label
                    htmlFor="contactName"
                    className="font-semibold text-[13px] text-checkout-label leading-4 h-4"
                  >
                    Nome
                  </label>

                  <input
                    {...register("contactName")}
                    className="border border-[#DEDEDE] rounded md:w-[205px] text-[13px] text-checkout-label leading-5 h-7 py-2 px-3 ring-0 focus:ring-0 focus:outline-none"
                    placeholder="Nome de contato"
                    id="contactName"
                  />

                  {errors.contactName && (
                    <p className="text-red-custom text-xs">
                      {errors.contactName.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-[5px]">
                  <label
                    htmlFor="contactEmail"
                    className="font-semibold text-[13px] text-checkout-label leading-4 h-4"
                  >
                    Email
                  </label>

                  <input
                    {...register("contactEmail")}
                    className="border border-[#DEDEDE] rounded md:w-[205px] text-[13px] text-checkout-label leading-5 h-7 py-2 px-3 ring-0 focus:ring-0 focus:outline-none"
                    placeholder="E-mail de contato"
                    id="contactEmail"
                  />

                  {errors.contactEmail && (
                    <p className="text-red-custom text-xs">
                      {errors.contactEmail.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-[5px]">
                  <label
                    htmlFor="contactPhone"
                    className="font-semibold text-[13px] text-checkout-label leading-4 h-4"
                  >
                    Telefone (WhatsApp)
                  </label>

                  <input
                    {...register("contactPhone")}
                    className="border border-[#DEDEDE] rounded md:w-[205px] text-[13px] text-checkout-label leading-5 h-7 py-2 px-3 ring-0 focus:ring-0 focus:outline-none"
                    placeholder="Telefone de contato"
                    id="contactPhone"
                  />

                  {errors.contactPhone && (
                    <p className="text-red-custom text-xs">
                      {errors.contactPhone.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-[5px]">
                <label
                  htmlFor="observations"
                  className="font-semibold text-[13px] text-checkout-label leading-4 h-4"
                >
                  Observações
                </label>

                <textarea
                  {...register("observations")}
                  className="border border-[#DEDEDE] rounded w-full min-h-21 max-h-21 text-[13px] text-checkout-label leading-5 py-2 px-3 ring-0 focus:ring-0 focus:outline-none resize-none"
                  placeholder="Observações do contato da reserva"
                  id="observations"
                />

                {errors.observations && (
                  <p className="text-red-custom text-xs">
                    {errors.observations.message}
                  </p>
                )}
              </div>
            </div>
          </div>

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
                  {bookingStore.selectedRoom?.cancellationPolicies
                    .refundable ? (
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
                    R$ 18.613,46
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
        </form>
      </div>
    </div>
  );
}
