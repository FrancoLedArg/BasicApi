import { eq, and, inArray } from "drizzle-orm";
import { db } from "@/lib/db";

// Schema
import { categories, productCategories } from "@/lib/db/schema";

// DTOs
import { UpdateCategoryDTO } from "@/lib/validation/categories";

// Services
import { findById } from "@/modules/categories/services";
import { findManyById } from "@/modules/products/services";
import { findManyById as findProductCategory } from "@/modules/productCategories/services";

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
      const foundProducts = await findManyById(productsToAdd);

      if (foundProducts.length !== productsToAdd.length) {
        throw new Error("One or more products do not exist");
      }

      const relationsArray = foundProducts.map((product) => {
        return {
          product_id: product.id,
          category_id: id,
        };
      });

      const existingRelations = await findProductCategory(relationsArray);

      if (existingRelations.length > 0) {
        throw new Error(
          "One or more products are already added to the category",
        );
      }

      const newRelations = await tx
        .insert(productCategories)
        .values(relationsArray)
        .returning();

      if (!newRelations || newRelations.length !== relationsArray.length) {
        throw new Error("Error creating new ProductCategories");
      }
    }

    if (productsToRemove.length > 0) {
      const productsFound = await findManyById(productsToRemove);

      if (productsFound.length !== productsToRemove.length) {
        throw new Error("One or more products do not exist");
      }

      const relationsArray = productsFound.map((product) => {
        return {
          product_id: product.id,
          category_id: id,
        };
      });

      const existingRelations = await findProductCategory(relationsArray);

      if (existingRelations.length !== productsToRemove.length) {
        throw new Error("One or more products were not added to this category");
      }

      const deletedRelations = await tx
        .delete(productCategories)
        .where(
          and(
            eq(productCategories.category_id, id),
            inArray(productCategories.product_id, productsToRemove),
          ),
        )
        .returning();

      if (
        !deletedRelations ||
        deletedRelations.length !== relationsArray.length
      ) {
        throw new Error("Error deleting productCategories.");
      }
    }

    return updatedExistingCategory;
  });

  if (!updatedCategory) {
    throw new Error("Error updating category");
  }

  return updatedCategory;
};
