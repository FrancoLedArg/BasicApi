import { db } from "@/lib/db";

export const findMany = async () => {
  const orders = await db.query.orders.findMany({
    with: {
      products: true,
    },
  });

  if (!orders) {
    throw new Error("Database Error");
  }

  return orders;
};
