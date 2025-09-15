import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().min(1, "O primeiro nome é obrigatório"),
  lastName: z.string().min(1, "O sobrenome é obrigatório"),
  contactName: z.string().min(1, "O nome de contato é obrigatório"),
  contactEmail: z.string().email("E-mail inválido"),
  contactPhone: z.string().min(14, "Telefone inválido"),
  observations: z.string().optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
