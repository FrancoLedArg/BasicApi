import { db } from "@/lib/db";
import { eq, and } from "drizzle-orm";

// Schemas
import { products, carts, cartProducts } from "@/lib/db/schema";

export const insertRelation = async (
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

    if (existingRelation) throw new Error("Product already added to the cart");

    const [newRelation] = await tx
      .insert(cartProducts)
      .values({ product_id: productId, cart_id: cartId, quantity })
      .returning();

    if (!newRelation) {
      throw new Error("Couldn't add product to cart");
    }

    return newRelation;
  });

  if (!relation) throw new Error("Couldn't add product to cart");

  return relation;
};
