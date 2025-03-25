import { z } from "zod";

export const productSchema = z.object({
  id: z.string().uuid("Invalid ID"),
  user_id: z.string().uuid("Invalid ID"),
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date()),
});

export const getProductSchema = productSchema.pick({ id: true });

export const createProductSchema = productSchema.pick({ user_id: true });

export const updateProductSchema = createProductSchema.partial();

export type GetUserDTO = z.infer<typeof getProductSchema>;
export type CreateUserDTO = z.infer<typeof createProductSchema>;
export type UpdateUserDTO = z.infer<typeof updateProductSchema>;
