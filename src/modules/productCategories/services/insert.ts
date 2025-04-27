import { db } from "@/lib/db";

// Schema
import { productCategories } from "@/lib/db/schema";

export const insert = async (
  array: { product_id: string; category_id: string }[],
) => {
  const insertedProducts = await db
    .insert(productCategories)
    .values(array)
    .returning();

  return insertedProducts;
};
