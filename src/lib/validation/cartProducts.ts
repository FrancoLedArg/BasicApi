import { z } from "zod";

export const cartProductSchema = z.object({
  product_id: z.string().uuid("Invalid ID"),
  cart_id: z.string().uuid("Invalid ID"),
  quantity: z.number().int().nonnegative(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const getCartProductSchema = cartProductSchema.pick({
  product_id: true,
  cart_id: true,
});

export const createCartProductSchema = cartProductSchema
  .pick({
    product_id: true,
    cart_id: true,
    quantity: true,
  })
  .partial({
    quantity: true,
  });

export const updateCartProductSchema = createCartProductSchema.partial();

export type CreateUserDTO = z.infer<typeof createCartProductSchema>;
export type UpdateUserDTO = z.infer<typeof updateCartProductSchema>;
