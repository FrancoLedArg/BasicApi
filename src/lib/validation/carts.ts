import { z } from "zod";

export const cartSchema = z.object({
  id: z.string().uuid("Invalid ID"),
  user_id: z.string().uuid("Invalid ID"),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const getCartSchema = cartSchema.pick({ id: true });

export const createCartSchema = cartSchema.pick({ user_id: true });

export const updateCartSchema = createCartSchema.partial();

export type GetCartDTO = z.infer<typeof getCartSchema>;
export type CreateCartDTO = z.infer<typeof createCartSchema>;
export type UpdateCartDTO = z.infer<typeof updateCartSchema>;
