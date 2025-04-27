import { eq, and, inArray } from "drizzle-orm";
import { db } from "@/lib/db";

// Schema
import { categories, productCategories } from "@/lib/db/schema";

// DTOs
import { UpdateCategoryDTO } from "@/lib/validation/categories";

export const update = async (
  id: string,
  changes: UpdateCategoryDTO["body"],
) => {
  const updatedCategory = await db.transaction(async (tx) => {
    const { name, description, productsToAdd, productsToRemove } = changes;

    // Update category fields if needed
    if (name || description) {
      await tx
        .update(categories)
        .set({
          ...(name && { name }),
          ...(description && { description }),
        })
        .where(eq(categories.id, id));
    }

    // Add product categories
    if (productsToAdd && productsToAdd.length > 0) {
      const newRelations = productsToAdd.map((productId) => ({
        category_id: id,
        product_id: productId,
      }));

      await tx.insert(productCategories).values(newRelations);
    }

    // Remove product categories
    if (productsToRemove && productsToRemove.length > 0) {
      await tx
        .delete(productCategories)
        .where(
          and(
            eq(productCategories.category_id, id),
            inArray(productCategories.product_id, productsToRemove),
          ),
        );
    }

    // 4. Return updated category (after changes)
    const [category] = await tx
      .select()
      .from(categories)
      .where(eq(categories.id, id));

    return category;
  });

  return updatedCategory;
};
