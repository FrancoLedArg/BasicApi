import { eq } from "drizzle-orm";
import { db } from "@/lib/db";

// Schema
import { users } from "@/lib/db/schema";

export const update = async (
  id: string,
  changes: { email?: string; password?: string },
) => {
  const [updatedUser] = await db
    .update(users)
    .set({
      ...changes,
      updated_at: new Date(),
    })
    .where(eq(users.id, id))
    .returning();

  return updatedUser;
};
