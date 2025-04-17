import { eq } from "drizzle-orm";
import { db } from "@/lib/db";

// Schema
import { categories } from "@/lib/db/schema";

export const remove = async (id: string) => {
  const deletedCategory = await db
    .delete(categories)
    .where(eq(categories.id, id))
    .returning();

  return deletedCategory;
};
