import { z } from "zod";

export const orderSchema = z.object({
  id: z.string().uuid("Invalid ID"),
  user_id: z.string().uuid("Invalid ID"),
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date()),
});

export const getOrderSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid ID"),
  }),
});

export const createOrderSchema = orderSchema.pick({ user_id: true });

export const updateOrderSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid ID"),
  }),
  body: z.object({
    status: z.enum(["Pending", "Paid", "Shipped", "Delivered"]),
  }),
});

export type GetOrderDTO = z.infer<typeof getOrderSchema>;
export type CreateOrderDTO = z.infer<typeof createOrderSchema>;
export type UpdateOrderDTO = z.infer<typeof updateOrderSchema>;
