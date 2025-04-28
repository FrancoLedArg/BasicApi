import { db } from "@/lib/db";
import { or } from "drizzle-orm";

// Types
import { ProductCategory } from "@/modules/productCategories/types/ProductCategory";

// Schema
import { productCategories } from "@/lib/db/schema";

// Services
import { findManyById } from "@/modules/productCategories/services";

// Utils
import { generateConditions } from "@/modules/productCategories/utils/generateConditions";

export const remove = async (relations: ProductCategory[]) => {
  const removedProductCategories = await db.transaction(async (tx) => {
    const existingRelations = await findManyById(relations);

    if (existingRelations.length !== relations.length) {
      throw new Error("One or more productCategories do not exist");
    }

    const conditions = generateConditions(existingRelations);

    const deletedRelations = await tx
      .delete(productCategories)
      .where(or(...conditions))
      .returning();

    if (deletedRelations.length !== existingRelations.length) {
      throw new Error("Missmatch in number of deleted productCategories");
    }

    return deletedRelations;
  });

  if (!removedProductCategories) {
    throw new Error("Error removing productCategories");
  }

  return removedProductCategories;
};
