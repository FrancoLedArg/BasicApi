import { db } from "@/lib/db";
import { eq, and } from "drizzle-orm";

// Schemas
import { products, carts, cartProducts } from "@/lib/db/schema";

export const updateRelation = async (
  cartId: string,
  productId: string,
  quantity: number,
) => {
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

    if (!existingRelation) throw new Error("Product was not added to the cart");

    const [updatedRelation] = await tx
      .update(cartProducts)
      .set({ quantity })
      .where(
        and(
          eq(cartProducts.product_id, existingRelation.product_id),
          eq(cartProducts.cart_id, existingRelation.cart_id),
        ),
      )
      .returning();

    if (!updatedRelation) {
      throw new Error("Couldn't update quantity");
    }

    return updatedRelation;
  });

  if (!relation) throw new Error("Issue updating relation");

  return relation;
};
