import { db } from "@/lib/db";

export const findAll = async () => {
  const carts = await db.query.carts.findMany({});

  return carts;
};
