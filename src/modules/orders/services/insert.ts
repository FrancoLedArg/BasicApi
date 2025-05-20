import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

// Schema
import { users, orders, orderProducts } from "@/lib/db/schema";

export const insert = async (userId: string) => {
  const newOrder = await db.transaction(async (tx) => {
    // Does the user exist? Does it have a cart?
    const existingUser = await tx.query.users.findFirst({
      where: eq(users.id, userId),
      with: {
        cart: {
          with: {
            products: true,
          },
        },
      },
    });

    if (!existingUser) {
      throw new Error("User does not exist");
    }
    if (!existingUser.cart || existingUser.cart.products.length === 0) {
      throw new Error("Cart is empty");
    }

    const total = existingUser.cart.products;

    const [newOrder] = await tx
      .insert(orders)
      .values({
        user_id: existingUser.id,
        total: "0",
        status: "pending",
      })
      .returning();

    if (!newOrder) {
      throw new Error("Error creating order");
    }

    const productsArray = existingUser.cart.products.map(
      (item: { product_id: string; quantity: number }) => ({
        product_id: item.product_id,
        order_id: newOrder.id,
        quantity: item.quantity,
      }),
    );

    const newRelations = await tx
      .insert(orderProducts)
      .values(productsArray)
      .returning();

    if (!newRelations) {
      throw new Error("Database Error");
    }

    return newOrder;
  });

  if (!newOrder) {
    throw new Error("Database Error");
  }

  // Returns the new order with the products
  return newOrder;
};
