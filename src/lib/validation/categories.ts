import { z } from "zod";

export const categorySchema = z.object({
  id: z.string().uuid("Invalid ID"),
  name: z.string().email("Invalid email").max(255),
  description: z.string().min(8).max(255),
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date()),
});

export const getCategorySchema = categorySchema.pick({ id: true });

export const createCategorySchema = categorySchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const updateCategorySchema = createCategorySchema.partial();

export type GetUserDTO = z.infer<typeof getCategorySchema>;
export type CreateUserDTO = z.infer<typeof createCategorySchema>;
export type UpdateUserDTO = z.infer<typeof updateCategorySchema>;
