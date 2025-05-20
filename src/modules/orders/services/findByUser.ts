import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

// Schema
import { users, orders } from "@/lib/db/schema";

export const findByUser = async (userId: string) => {
  const userOrders = await db.transaction(async (tx) => {
    const existingUser = await tx.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!existingUser) {
      throw new Error("User not found.");
    }

    const existingOrders = await db.query.orders.findMany({
      where: eq(orders.user_id, userId),
      with: {
        products: true,
      },
    });

    if (!existingOrders) {
      throw new Error("Error searching for orders");
    }

    return existingOrders;
  });

  if (!userOrders) {
    throw new Error("Couldn't find orders");
  }

  return userOrders;
};
