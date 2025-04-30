import { db } from "@/lib/db";

// Schema
import { carts } from "@/lib/db/schema";

export const insert = async (user_id: string) => {
  const newCart = await db
    .insert(carts)
    .values({
      user_id,
      total: "0",
    })
    .returning();

  if (!newCart) {
    throw new Error("Error creating the cart");
  }

  return newCart;
};
