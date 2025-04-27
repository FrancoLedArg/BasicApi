import { db } from "@/lib/db";

export const findManyById = async (productsArray: string[]) => {
  const products = await db.query.products.findMany({
    where: (product, { inArray }) => inArray(product.id, productsArray),
  });

  return products;
};
