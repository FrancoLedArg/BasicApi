import { db } from "@/lib/db";
import { eq, and } from "drizzle-orm";

// Schemas
import { products, carts, cartProducts } from "@/lib/db/schema";

export const removeRelation = async (cartId: string, productId: string) => {
  const relation = await db.transaction(async (tx) => {
    const [existingCart, existingProduct] = await Promise.all([
      tx.query.carts.findFirst({ where: eq(carts.id, cartId) }),
      tx.query.products.findFirst({ where: eq(products.id, productId) }),
    ]);

    if (!existingCart) throw new Error("Cart not found");
    if (!existingProduct) throw new Error("Product not found");

    const existingRelation = await tx.query.cartProducts.findFirst({
      where: and(
        eq(cartProducts.product_id, productId),
        eq(cartProducts.cart_id, cartId),
      ),
    });

    if (!existingRelation) throw new Error("Relation not found");

    const [removedRelation] = await tx
      .delete(cartProducts)
      .where(
        and(
          eq(cartProducts.product_id, productId),
          eq(cartProducts.cart_id, cartId),
        ),
      )
      .returning();

    if (!removedRelation) {
      throw new Error("Couldn't remove product from the cart");
    }

    return removedRelation;
  });

  if (!relation) throw new Error("Couldn't remove product from the cart");

  return relation;
};
