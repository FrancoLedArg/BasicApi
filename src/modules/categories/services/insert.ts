import { db } from "@/lib/db";

// Schema
import { categories } from "@/lib/db/schema";

// DTOs
import { CreateCategoryDTO } from "@/lib/validation/categories";

export const insert = async (category: CreateCategoryDTO["body"]) => {
  const { name, description } = category;

  const [newCategory] = await db
    .insert(categories)
    .values({
      name,
      description,
    })
    .returning();

  if (!newCategory) {
    throw new Error("Error creating category");
  }

  return newCategory;
};
