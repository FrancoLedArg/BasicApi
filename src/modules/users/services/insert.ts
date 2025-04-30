import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

// Schema
import { users, carts } from "@/lib/db/schema";

// Utils
import { hashPassword } from "@/utils/hashPassword";

export const insert = async (email: string, password: string) => {
  const newUser = await db.transaction(async (tx) => {
    const existingUser = await tx.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      throw new Error("User already created");
    }

    const hash = await hashPassword(password);

    const [newUser] = await tx
      .insert(users)
      .values({
        email,
        password: hash,
      })
      .returning();

    if (!newUser) {
      throw new Error("Error creating user");
    }

    const newCart = await tx
      .insert(carts)
      .values({
        user_id: newUser.id,
        total: "0",
      })
      .returning();

    if (!newCart) {
      throw new Error("Error creating the cart");
    }

    return newUser;
  });

  if (!newUser) {
    throw new Error("Error creating new user");
  }

  return newUser;
};
