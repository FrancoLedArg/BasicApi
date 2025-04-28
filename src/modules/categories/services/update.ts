import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

// Schema
import { categories } from "@/lib/db/schema";

// DTOs
import { UpdateCategoryDTO } from "@/lib/validation/categories";

// Services
import { findById } from "@/modules/categories/services";
import { findManyById as findProducts } from "@/modules/products/services";
import {
  insert as insertProductCategory,
  remove as removeProductCategory,
} from "@/modules/productCategories/services";

export const update = async (
  id: string,
  changes: UpdateCategoryDTO["body"],
) => {
  const updatedCategory = await db.transaction(async (tx) => {
    const { categoryData, categoryProducts } = changes;
    const { productsToAdd, productsToRemove } = categoryProducts;

    const existingCategory = await findById(id);

    if (!existingCategory) {
      throw new Error("Category not found");
    }

    const [updatedExistingCategory] = await tx
      .update(categories)
      .set({ ...categoryData })
      .where(eq(categories.id, id))
      .returning();

    if (!updatedExistingCategory) {
      throw new Error("Error updating category");
    }

    if (productsToAdd.length > 0) {
      const foundProducts = await findProducts(productsToAdd);

      if (foundProducts.length !== productsToAdd.length) {
        throw new Error("One or more products do not exist");
      }

      const relationsArray = foundProducts.map((product) => {
        return {
          product_id: product.id,
          category_id: id,
        };
      });

      await insertProductCategory(relationsArray);
    }

    if (productsToRemove.length > 0) {
      const productsFound = await findProducts(productsToRemove);

      if (productsFound.length !== productsToRemove.length) {
        throw new Error("One or more products do not exist");
      }

      const relationsArray = productsFound.map((product) => {
        return {
          product_id: product.id,
          category_id: id,
        };
      });

      await removeProductCategory(relationsArray);
    }

    return updatedExistingCategory;
  });

  if (!updatedCategory) {
    throw new Error("Error updating category");
  }

  return updatedCategory;
};
