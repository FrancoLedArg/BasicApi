import { eq, and } from "drizzle-orm";
import { db } from "@/lib/db";

// Schema
import { products, productCategories, categories } from "@/lib/db/schema";

export const remove = async (product_id: string, category_id: string) => {
  const deletedProductCategory = await db
    .delete(productCategories)
    .where(and(eq(products.id, product_id), eq(categories.id, category_id)))
    .returning();

  return deletedProductCategory;
};
