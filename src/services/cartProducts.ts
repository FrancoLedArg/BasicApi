import { eq, and } from "drizzle-orm";
import { db } from "@/lib/db";

// Schema
import { products, carts, cartProducts } from "@/lib/db/schema";

export const insert = async (data: any) => {
  const { product_id, cart_id, quantity } = data;

  const [newCartProduct] = await db
    .insert(cartProducts)
    .values({
      product_id,
      cart_id,
      quantity,
    })
    .returning();

  if (!newCartProduct) {
    throw new Error("Database Error");
  }
};

export const update = async (
  product_id: string,
  cart_id: string,
  data: any,
) => {
  const [updatedCartProduct] = await db
    .update(cartProducts)
    .set(data)
    .where(and(eq(products.id, product_id), eq(carts.id, cart_id)))
    .returning();

  if (!updatedCartProduct) {
    throw new Error("Database Error");
  }

  return updatedCartProduct;
};

export const remove = async (product_id: string, cart_id: string) => {
  const deletedCartProduct = await db
    .delete(cartProducts)
    .where(and(eq(products.id, product_id), eq(carts.id, cart_id)))
    .returning();

  if (!deletedCartProduct) {
    throw new Error("Database Error");
  }

  return deletedCartProduct;
};
