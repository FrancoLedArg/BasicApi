import { eq } from "drizzle-orm";
import { db } from "@/lib/db";

// Schema
import { carts } from "@/lib/db/schema";

export const findAll = async (limit: number, offset: number) => {
  const carts = await db.query.carts.findMany({
    limit,
    offset,
    with: {
      products: true,
    },
  });

  if (!carts) {
    throw new Error("Database Error");
  }

  return carts;
};

export const findById = async (id: string) => {
  const cart = await db.query.carts.findFirst({
    where: eq(carts.id, id),
  });

  if (!cart) {
    throw new Error("Cart not found.");
  }

  return cart;
};

export const insert = async (data: any) => {
  const { user_id, total } = data;

  const newCart = await db
    .insert(carts)
    .values({
      user_id,
      total,
    })
    .returning();

  if (!newCart) {
    throw new Error("Database Error");
  }

  return newCart;
};

export const update = async (id: string, data: any) => {
  const [updatedCart] = await db
    .update(carts)
    .set(data)
    .where(eq(carts.id, id))
    .returning();

  if (!updatedCart) {
    throw new Error("Database Error");
  }

  return updatedCart;
};

export const remove = async (id: string) => {
  const deletedCart = await db
    .delete(carts)
    .where(eq(carts.id, id))
    .returning();

  if (!deletedCart) {
    throw new Error("Database Error");
  }

  return deletedCart;
};
