import { z } from "zod";

export const productCategorySchema = z.object({
  product_id: z.string().uuid("Invalid ID"),
  category_id: z.string().uuid("Invalid ID"),
});

export type ProductCategoryDTO = z.infer<typeof productCategorySchema>;
