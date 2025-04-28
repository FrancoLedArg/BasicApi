import { eq } from "drizzle-orm";
import { db } from "@/lib/db";

// Schema
import { products } from "@/lib/db/schema";

// DTOs
import { UpdateProductDTO } from "@/lib/validation/products";

// Services
import { findById } from "@/modules/products/services";
import { findManyById as findCategories } from "@/modules/categories/services/findManyById";
import {
  insert as insertProductCategory,
  remove as removeProductCategory,
} from "@/modules/productCategories/services";

export const update = async (id: string, changes: UpdateProductDTO["body"]) => {
  const updatedProduct = await db.transaction(async (tx) => {
    const { productData, productCategories } = changes;
    const { categoriesToAdd, categoriesToRemove } = productCategories;

    const existingProduct = await findById(id);

    if (!existingProduct) {
      throw new Error("Product not found");
    }

    const [updatedExistingProduct] = await tx
      .update(products)
      .set({ ...productData })
      .where(eq(products.id, id))
      .returning();

    if (!updatedExistingProduct) {
      throw new Error("Error updating product");
    }

    if (categoriesToAdd.length > 0) {
      const foundCategories = await findCategories(categoriesToAdd);

      if (foundCategories.length !== categoriesToAdd.length) {
        throw new Error("One or more products do not exist");
      }

      const relationsArray = foundCategories.map((category) => {
        return {
          product_id: id,
          category_id: category.id,
        };
      });

      await insertProductCategory(relationsArray);
    }

    if (categoriesToRemove.length > 0) {
      const foundCategories = await findCategories(categoriesToRemove);

      if (foundCategories.length !== categoriesToRemove.length) {
        throw new Error("One or more products do not exist");
      }

      const relationsArray = foundCategories.map((category) => {
        return {
          product_id: id,
          category_id: category.id,
        };
      });

      await removeProductCategory(relationsArray);
    }

    return updatedExistingProduct;
  });

  if (!updatedProduct) {
    throw new Error("Error updating product");
  }

  return updatedProduct;
};
