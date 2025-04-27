import { db } from "@/lib/db";
import { and, eq } from "drizzle-orm";

// Schema
import { productCategories } from "@/lib/db/schema";

export const remove = async (product_id: string, category_id: string) => {
  const removedProducts = await db
    .delete(productCategories)
    .where(
      and(
        eq(productCategories.product_id, product_id),
        eq(productCategories.category_id, category_id),
      ),
    )
    .returning();

  return removedProducts;
};
