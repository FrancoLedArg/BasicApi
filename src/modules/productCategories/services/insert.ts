import { db } from "@/lib/db";

// Schema
import { productCategories } from "@/lib/db/schema";

export const insert = async (product_id: string, category_id: string) => {
  const newProductCategory = await db
    .insert(productCategories)
    .values({
      product_id,
      category_id,
    })
    .returning();

  return newProductCategory;
};
