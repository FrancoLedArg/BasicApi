import { eq, and } from "drizzle-orm";
import { db } from "@/lib/db";

// Schema
import { products, productCategories, categories } from "@/lib/db/schema";

// Services
import { findById as findProduct } from "./products";
import { findById as findCategory } from "./categories";

export const insert = async (product_id: string, category_id: string) => {
  const product = await findProduct(product_id);
  const category = await findCategory(category_id);

  const newProductCategory = await db
    .insert(productCategories)
    .values({
      product_id: product.id,
      category_id: category.id,
    })
    .returning();

  if (!newProductCategory) {
    throw new Error("Error creating product category.");
  }

  return newProductCategory;
};

export const remove = async (product_id: string, category_id: string) => {
  const product = await findProduct(product_id);
  const category = await findCategory(category_id);

  const deletedProductCategory = await db
    .delete(productCategories)
    .where(and(eq(products.id, product.id), eq(categories.id, category.id)))
    .returning();

  if (!deletedProductCategory) {
    throw new Error("Database Error");
  }

  return deletedProductCategory;
};
