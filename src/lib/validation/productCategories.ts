import { z } from "zod";

export const productCategorySchema = z.object({
  product_id: z.string().uuid("Invalid ID"),
  category_id: z.string().uuid("Invalid ID"),
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date()),
});

export const getProductCategorySchema = productCategorySchema.pick({
  product_id: true,
  category_id: true,
});

export type GetUserDTO = z.infer<typeof getProductCategorySchema>;
