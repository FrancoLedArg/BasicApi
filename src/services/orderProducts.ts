import { eq, and } from "drizzle-orm";
import { db } from "@/lib/db";

// Schema
import { products, orders, orderProducts } from "@/lib/db/schema";

export const insert = async (data: any) => {
  const { product_id, order_id, quantity } = data;

  const [newOrderProduct] = await db
    .insert(orderProducts)
    .values({
      product_id,
      order_id,
      quantity,
    })
    .returning();

  if (!newOrderProduct) {
    throw new Error("Database Error");
  }
};

export const update = async (order_id: string, item_id: string, data: any) => {
  const [updatedOrderProduct] = await db
    .update(orderProducts)
    .set(data)
    .where(and(eq(orders.id, order_id), eq(products.id, item_id)))
    .returning();

  if (!updatedOrderProduct) {
    throw new Error("Database Error");
  }

  return updatedOrderProduct;
};

export const remove = async (order_id: string, item_id: string) => {
  const deletedOrderProduct = await db
    .delete(orderProducts)
    .where(and(eq(orders.id, order_id), eq(products.id, item_id)))
    .returning();

  if (!deletedOrderProduct) {
    throw new Error("Database Error");
  }

  return deletedOrderProduct;
};
