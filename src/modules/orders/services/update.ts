import { eq } from "drizzle-orm";
import { db } from "@/lib/db";

// Schema
import { orders } from "@/lib/db/schema";

export const update = async (id: string, data: any) => {
  const [updatedOrder] = await db
    .update(orders)
    .set(data)
    .where(eq(orders.id, id))
    .returning();

  if (!updatedOrder) {
    throw new Error("Database Error");
  }

  return updatedOrder;
};
