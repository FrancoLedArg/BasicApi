import { db } from "@/lib/db";
import { productCategories } from "@/lib/db/schema";
import { and, eq, or } from "drizzle-orm";

export const findManyById = async (
  productCategoriesArray: { product_id: string; category_id: string }[],
) => {
  const conditions = productCategoriesArray.map((item) =>
    and(
      eq(productCategories.product_id, item.product_id),
      eq(productCategories.category_id, item.category_id),
    ),
  );

  const productCategory = await db.query.productCategories.findMany({
    where: or(...conditions),
  });

  return productCategory;
};
