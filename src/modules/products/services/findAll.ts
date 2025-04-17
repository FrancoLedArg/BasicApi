import { db } from "@/lib/db";

export const findAll = async () => {
  const products = await db.query.products.findMany();

  return products;
};
