import { db } from "@/lib/db";

export const findMany = async () => {
  const products = await db.query.products.findMany();

  return products;
};
