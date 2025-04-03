import { z } from "zod";

export const productFilterSchema = z
  .object({
    limit: z
      .string()
      .default("0")
      .refine((val) => !isNaN(Number(val)), { message: "Invalid limit value" })
      .transform((val) => Number(val))
      .pipe(z.number().int().nonnegative()),
    offset: z
      .string()
      .default("10")
      .refine((val) => !isNaN(Number(val)), { message: "Invalid offset value" })
      .transform((val) => Number(val))
      .pipe(z.number().int().nonnegative()),
  })
  .strict();

export const productSchema = z.object({
  id: z.string().uuid("Invalid ID"),
  name: z.string().trim().min(1).max(255),
  description: z.string().trim().min(1).max(255),
  price: z
    .string()
    .trim()
    .refine((val) => !isNaN(Number(val)), {
      message: "Price must be a valid number",
    })
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val), {
      message: "Price must have at most two decimal places",
    }),
  stock: z.number().int().nonnegative(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const getProductSchema = productSchema.pick({ id: true });

export const createProductSchema = productSchema.omit({
  id: true,
  stock: true,
  created_at: true,
  updated_at: true,
});

export const updateProductSchema = createProductSchema.partial();

export type ProductFilterDTO = z.infer<typeof productFilterSchema>;
export type GetProductDTO = z.infer<typeof getProductSchema>;
export type CreateProductDTO = z.infer<typeof createProductSchema>;
export type UpdateProductDTO = z.infer<typeof updateProductSchema>;
