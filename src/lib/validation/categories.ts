import { z } from "zod";

export const getCategorySchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid ID"),
  }),
});

export const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(255, "Name too long")
      .regex(/^[a-zA-Z0-9\s\-]+$/, "Invalid characters in name"),
    description: z
      .string()
      .min(1, "Description is required")
      .max(255, "Description too long")
      .regex(/^[a-zA-Z0-9\s.,!?()-]+$/, "Invalid characters in description"),
  }),
});

export const updateCategorySchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid ID"),
  }),
  body: z
    .object({
      name: z
        .string()
        .min(1, "Name is required")
        .max(255, "Name too long")
        .regex(/^[a-zA-Z0-9\s\-]+$/, "Invalid characters in name"),
      description: z
        .string()
        .min(1, "Description is required")
        .max(255, "Description too long")
        .regex(/^[a-zA-Z0-9\s.,!?()-]+$/, "Invalid characters in description"),
      productsToAdd: z.array(z.string().uuid("Invalid ID")),
      productsToRemove: z.array(z.string().uuid("Invalid ID")),
    })
    .partial(),
});

export type GetCategoryDTO = z.infer<typeof getCategorySchema>;
export type CreateCategoryDTO = z.infer<typeof createCategorySchema>;
export type UpdateCategoryDTO = z.infer<typeof updateCategorySchema>;
