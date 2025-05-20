import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

// Schema
import { orders } from "@/lib/db/schema";

export const findById = async (id: string) => {
  const foundOrder = await db.query.orders.findMany({
    where: eq(orders.id, id),
    with: {
      products: true,
    },
  });

  return foundOrder;
};
