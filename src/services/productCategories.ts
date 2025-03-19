import { eq, and } from "drizzle-orm";
import { db } from "@/lib/db";

// Schema
import { products, productCategories, categories } from "@/lib/db/schema";

export const insert = async (data: any) => {
  const { product_id, category_id } = data;

  const newProductCategory = await db
    .insert(productCategories)
    .values({
      product_id,
      category_id,
    })
    .returning();

  if (!newProductCategory) {
    throw new Error("Database Error");
  }

  return newProductCategory;
};

export const remove = async (product_id: string, category_id: string) => {
  const deletedProductCategory = await db
    .delete(productCategories)
    .where(and(eq(products.id, product_id), eq(categories.id, category_id)))
    .returning();

  if (!deletedProductCategory) {
    throw new Error("Database Error");
  }

  return deletedProductCategory;
};
