import { db } from "@/lib/db";
import { or } from "drizzle-orm";

// Types
import { ProductCategory } from "@/modules/productCategories/types/ProductCategory";

// Utils
import { generateConditions } from "@/modules/productCategories/utils/generateConditions";

export const findManyById = async (relations: ProductCategory[]) => {
  const conditions = generateConditions(relations);

  const productCategory = await db.query.productCategories.findMany({
    where: or(...conditions),
  });

  return productCategory;
};
