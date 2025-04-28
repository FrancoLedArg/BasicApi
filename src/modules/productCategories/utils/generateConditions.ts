import { and, eq } from "drizzle-orm";

// Types
import { ProductCategory } from "@/modules/productCategories/types/ProductCategory";

// Schema
import { productCategories } from "@/lib/db/schema";

export const generateConditions = (relationsArray: ProductCategory[]) => {
  const conditions = relationsArray.map((item) =>
    and(
      eq(productCategories.product_id, item.product_id),
      eq(productCategories.category_id, item.category_id),
    ),
  );

  return conditions;
};
