import { db } from "@/lib/db";

export const findAll = async (limit: number, offset: number) => {
  const products = await db.query.products.findMany({
    limit,
    offset,
  });

  if (!products) {
    throw new Error("Database Error");
  }

  return products;
};
