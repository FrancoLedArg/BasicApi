import { db } from "@/lib/db";

// Types
import { ProductCategory } from "@/modules/productCategories/types/ProductCategory";

// Schema
import { productCategories } from "@/lib/db/schema";

// Services
import { findManyById } from "@/modules/productCategories/services/findManyById";

export const insert = async (relations: ProductCategory[]) => {
  const insertedProducts = await db.transaction(async (tx) => {
    const existingRelations = await findManyById(relations);

    if (existingRelations.length > 0) {
      throw new Error("One or more productCategories were already created");
    }

    const insertedRelations = await tx
      .insert(productCategories)
      .values(relations)
      .returning();

    if (insertedRelations.length !== relations.length) {
      throw new Error("Error creating all new productCategories");
    }

    return insertedRelations;
  });

  if (!insertedProducts) {
    throw new Error("Error creating new products");
  }

  return insertedProducts;
};
