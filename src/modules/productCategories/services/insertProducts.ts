import { db } from "@/lib/db";

// Schema
import { productCategories } from "@/lib/db/schema";

export const insertProducts = async (
  categoryId: string,
  products: string[],
) => {
  if (products.length === 0) return;

  const data = products.map((product) => ({
    product_id: product,
    category_id: categoryId,
  }));

  const insertedProducts = await db
    .insert(productCategories)
    .values(data)
    .returning();

  return insertedProducts;
};
