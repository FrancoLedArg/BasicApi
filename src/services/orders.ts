import { eq } from "drizzle-orm";
import { db } from "@/lib/db";

// Schema
import { orders, orderItems } from "@/lib/db/schema";

export const findAll = async (limit: number, offset: number) => {
  const orders = await db.query.orders.findMany({
    limit,
    offset,
  });

  if (!orders) {
    throw new Error("Database Error");
  }

  return orders;
};

export const findById = async (id: string) => {
  const order = await db.query.orders.findFirst({
    where: eq(orders.id, id),
  });

  if (!order) {
    throw new Error("Database Error");
  }

  return order;
};

export const insert = async (data: any) => {
  const { user_id, order_items } = data;

  const newOrder = await db.transaction(async (tx) => {
    const txOrder = await tx
      .insert(orders)
      .values({
        user_id,
      })
      .returning();

    if (!txOrder) {
      throw new Error("Database Error");
    }

    const itemsArray = order_items.map((item: any) => ({
      // order_id: txOrder.id,
      item_id: item.id,
      quantity: item.quantity,
    }));

    const txOrderItems = await tx.insert(orderItems).values(itemsArray);

    if (!txOrderItems) {
      throw new Error("Database Error");
    }

    return txOrder;
  });

  if (!newOrder) {
    throw new Error("Database Error");
  }

  return newOrder;
};

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

export const remove = async (id: string) => {
  const deletedOrder = await db
    .delete(orders)
    .where(eq(orders.id, id))
    .returning();

  if (!deletedOrder) {
    throw new Error("Database Error");
  }

  return deletedOrder;
};
