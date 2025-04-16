import { eq } from "drizzle-orm";
import { db } from "@/lib/db";

// Schema
import { users } from "@/lib/db/schema";

export const remove = async (id: string) => {
  const deletedUser = await db
    .delete(users)
    .where(eq(users.id, id))
    .returning();

  return deletedUser;
};
