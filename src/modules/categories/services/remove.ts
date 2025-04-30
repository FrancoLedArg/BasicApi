import { eq } from "drizzle-orm";
import { db } from "@/lib/db";

// Schema
import { categories } from "@/lib/db/schema";

// Services
import { findById } from "@/modules/categories/services";

export const remove = async (id: string) => {
  const deletedCategory = await db.transaction(async (tx) => {
    const existingCategory = await findById(id);

    if (!existingCategory) {
      throw new Error("Category not found");
    }

    const [deletedExistingCategory] = await tx
      .delete(categories)
      .where(eq(categories.id, id))
      .returning();

    if (!deletedExistingCategory) {
      throw new Error("Error deleting category");
    }

    return deletedExistingCategory;
  });

  return deletedCategory;
};
