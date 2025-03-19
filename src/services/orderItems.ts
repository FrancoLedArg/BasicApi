import { eq, and } from "drizzle-orm";
import { db } from "@/lib/db";

// Schema
import { products, orders, orderItems } from "@/lib/db/schema";

export const insert = async (data: any) => {
  const { order_id, item_id, quantity } = data;

  const [newItem] = await db
    .insert(orderItems)
    .values({
      order_id,
      item_id,
      quantity,
    })
    .returning();

  if (!newItem) {
    throw new Error("Database Error");
  }
};

export const update = async (order_id: string, item_id: string, data: any) => {
  const [updatedItem] = await db
    .update(orderItems)
    .set(data)
    .where(and(eq(orders.id, order_id), eq(products.id, item_id)))
    .returning();

  if (!updatedItem) {
    throw new Error("Database Error");
  }

  return updatedItem;
};

export const remove = async (order_id: string, item_id: string) => {
  const deletedItem = await db
    .delete(orderItems)
    .where(and(eq(orders.id, order_id), eq(products.id, item_id)))
    .returning();

  if (!deletedItem) {
    throw new Error("Database Error");
  }

  return deletedItem;
};
