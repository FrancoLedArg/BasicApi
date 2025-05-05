import { z } from "zod";

export const addProductSchema = z.object({
  body: z.object({
    product_id: z.string().uuid("Invalid ID"),
    quantity: z.number().nonnegative("Must be positive"),
  }),
});

export const updateQuantitySchema = z.object({
  body: z.object({
    product_id: z.string().uuid("Invalid ID"),
    quantity: z.number().nonnegative("Must be positive"),
  }),
});

export const deleteProductSchema = z.object({
  body: z.object({
    product_id: z.string().uuid("Invalid ID"),
  }),
});

export type AddProductDTO = z.infer<typeof addProductSchema>;
export type UpdateQuantityDTO = z.infer<typeof updateQuantitySchema>;
export type RemoveProductDTO = z.infer<typeof deleteProductSchema>;
