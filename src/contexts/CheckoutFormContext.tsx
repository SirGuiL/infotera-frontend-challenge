import { createContext, ReactNode } from "react";
import { useForm, FormProvider, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutFormData, checkoutSchema } from "@/schemas/checkoutSchema";

interface CheckoutFormProviderProps {
  children: ReactNode;
}

export const CheckoutFormContext =
  createContext<UseFormReturn<CheckoutFormData> | null>(null);

export function CheckoutFormProvider({ children }: CheckoutFormProviderProps) {
  const methods = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange",
  });

  return (
    <CheckoutFormContext.Provider value={methods}>
      <FormProvider {...methods}>{children}</FormProvider>
    </CheckoutFormContext.Provider>
  );
}
