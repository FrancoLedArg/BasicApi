import { db } from "@/lib/db";

export const findAll = async () => {
  const products = await db.query.products.findMany();
  if (!products) {
    throw new Error("Database Error");
  }

  return products;
};
