import { db } from "@/lib/db";
import { and, eq, inArray } from "drizzle-orm";

// Schema
import { productCategories } from "@/lib/db/schema";

export const removeProducts = async (
  categoryId: string,
  products: string[],
) => {
  if (products.length === 0) return;

  const removedProducts = await db
    .delete(productCategories)
    .where(
      and(
        eq(productCategories.category_id, categoryId),
        inArray(productCategories.product_id, products),
      ),
    )
    .returning();

  return removedProducts;
};
