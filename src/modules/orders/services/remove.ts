import { eq } from "drizzle-orm";
import { db } from "@/lib/db";

// Schema
import { orders } from "@/lib/db/schema";

export const remove = async (id: string) => {
  const removedOrder = await db.transaction(async (tx) => {
    const existingOrder = await tx.query.orders.findFirst({
      where: eq(orders.id, id),
    });

    if (!existingOrder) {
      throw new Error("Order not found.");
    }

    const [removedExistingOrder] = await db
      .delete(orders)
      .where(eq(orders.id, id))
      .returning();

    if (!removedExistingOrder) {
      throw new Error("Couldn't remove order");
    }

    return removedExistingOrder;
  });

  if (!removedOrder) {
    throw new Error("Database Error");
  }

  return removedOrder;
};
