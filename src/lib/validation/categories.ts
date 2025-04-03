import { z } from "zod";

export const categorySchema = z.object({
  id: z.string().uuid("Invalid ID"),
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const getCategorySchema = categorySchema.pick({ id: true });

export const createCategorySchema = categorySchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const updateCategorySchema = createCategorySchema.partial();

export type GetCategoryDTO = z.infer<typeof getCategorySchema>;
export type CreateCategoryDTO = z.infer<typeof createCategorySchema>;
export type UpdateCategoryDTO = z.infer<typeof updateCategorySchema>;
