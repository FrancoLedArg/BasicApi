import { z } from "zod";

export const orderSchema = z.object({
  id: z.string().uuid("Invalid ID"),
  user_id: z.string().uuid("Invalid ID"),
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date()),
});

export const getOrderSchema = orderSchema.pick({ id: true });

export const createOrderSchema = orderSchema.pick({ user_id: true });

export const updateOrderSchema = createOrderSchema.partial();

export type GetUserDTO = z.infer<typeof getOrderSchema>;
export type CreateUserDTO = z.infer<typeof createOrderSchema>;
export type UpdateUserDTO = z.infer<typeof updateOrderSchema>;
