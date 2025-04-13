import { eq } from "drizzle-orm";
import { db } from "@/lib/db";

// Schema
import { orders, orderProducts } from "@/lib/db/schema";

export const findAll = async (limit: number, offset: number) => {
  const orders = await db.query.orders.findMany({
    limit,
    offset,
    with: {
      products: true,
    },
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

export const insert = async (user_id: string, products: any) => {
  const newOrder = await db.transaction(async (tx) => {
    // Creates a tx order
    const [txOrder] = await tx
      .insert(orders)
      .values({
        user_id,
        total: "0",
        status: "pending",
      })
      .returning();

    if (!txOrder) {
      throw new Error("Database Error");
    }

    // Asign all order products the id of the tx order
    const productsArray = products.map(
      (item: { product_id: string; quantity: number }) => ({
        product_id: item.product_id,
        order_id: txOrder.id,
        quantity: item.quantity,
      }),
    );

    // Inserts them into the tx order
    const txOrderItems = await tx.insert(orderProducts).values(productsArray);

    if (!txOrderItems) {
      throw new Error("Database Error");
    }

    // Returns the order
    return txOrder;
  });

  if (!newOrder) {
    throw new Error("Database Error");
  }

  // Returns the new order with the products
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
