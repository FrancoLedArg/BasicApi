import { z } from "zod";

export const productSchema = z.object({
  id: z.string().uuid("Invalid ID"),
  name: z.string().email("Invalid email").max(255),
  description: z.string().min(8).max(255),
  price: z.string().min(8).max(255),
  stock: z.string().min(8).max(255),
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date()),
});

export const getProductSchema = productSchema.pick({ id: true });

export const createProductSchema = productSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const updateProductSchema = createProductSchema.partial();

export type GetUserDTO = z.infer<typeof getProductSchema>;
export type CreateUserDTO = z.infer<typeof createProductSchema>;
export type UpdateUserDTO = z.infer<typeof updateProductSchema>;
