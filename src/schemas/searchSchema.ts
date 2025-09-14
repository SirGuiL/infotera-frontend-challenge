import { z } from "zod";

export const searchSchema = z.object({
  destination: z.string().min(1, "O destino é obrigatório"),
});

export type SearchFormData = z.infer<typeof searchSchema>;
