import { z } from "zod";

const priceSchema = z
  .string()
  .trim()
  .refine((val) => !isNaN(Number(val)), {
    message: "Price must be a valid number",
  })
  .refine((val) => /^\d+(\.\d{1,2})?$/.test(val), {
    message: "Price must have at most two decimal places",
  });

export const getProductSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid ID"),
  }),
});

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1).max(255),
    description: z.string().trim().min(1).max(255),
    price: priceSchema,
    stock: z.number().int().nonnegative(),
  }),
});

export const updateProductSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid ID"),
  }),
  body: z
    .object({
      name: z.string().trim().min(1).max(255),
      description: z.string().trim().min(1).max(255),
      price: priceSchema,
      stock: z.number().int().nonnegative(),
    })
    .partial(),
});

export type GetProductDTO = z.infer<typeof getProductSchema>;
export type CreateProductDTO = z.infer<typeof createProductSchema>;
export type UpdateProductDTO = z.infer<typeof updateProductSchema>;
