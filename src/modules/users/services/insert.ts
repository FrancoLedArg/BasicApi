import { db } from "@/lib/db";

// Schema
import { users } from "@/lib/db/schema";

// Utils
import { hashPassword } from "@/utils/hashPassword";

export const insert = async (email: string, password: string) => {
  const hash = await hashPassword(password);

  const [newUser] = await db
    .insert(users)
    .values({
      email,
      password: hash,
    })
    .returning();

  // I need to figure out a better way to remove the password from here so i can return this safely

  // @ts-ignore
  delete newUser.password;

  return newUser;
};
