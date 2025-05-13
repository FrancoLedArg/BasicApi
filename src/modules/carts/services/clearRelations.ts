import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

// Schemas
import { carts, cartProducts } from "@/lib/db/schema";

export const clearRelations = async (cart_id: string) => {
  const relations = await db.transaction(async (tx) => {
    // Check if the cart exists
    const existingCart = await tx.query.carts.findFirst({
      where: eq(carts.id, cart_id),
    });

    if (!existingCart) throw new Error("Cart not found");

    // Check if there is any relations to remove
    const existingRelations = await tx.query.cartProducts.findMany({
      where: eq(cartProducts.cart_id, cart_id),
    });

    if (existingRelations.length === 0) {
      throw new Error("Cart is already empty");
    }

    // How can i remove the relations here if there is any relations?
    const removedRelations = await tx
      .delete(cartProducts)
      .where(eq(cartProducts.cart_id, cart_id))
      .returning();

    if (removedRelations.length < existingRelations.length) {
      throw new Error("Error removing one or multiple products from the cart");
    }

    return removedRelations;
  });

  if (relations.length === 0) {
    throw new Error("Couldn't remove product from the cart");
  }

  return relations;
};
