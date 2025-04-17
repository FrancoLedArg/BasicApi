import { eq } from "drizzle-orm";
import { db } from "@/lib/db";

// Schema
import { categories } from "@/lib/db/schema";

// DTOs
import { UpdateCategoryDTO } from "@/lib/validation/categories";

export const update = async (
  id: string,
  changes: UpdateCategoryDTO["body"],
) => {
  const [updatedCategory] = await db
    .update(categories)
    .set({
      ...changes,
      updated_at: new Date(),
    })
    .where(eq(categories.id, id))
    .returning();

  return updatedCategory;
};
