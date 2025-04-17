import { eq } from "drizzle-orm";
import { db } from "@/lib/db";

// Schema
import { users } from "@/lib/db/schema";

// DTOs
import { UpdateUserDTO } from "@/lib/validation/users";

export const update = async (id: string, changes: UpdateUserDTO["body"]) => {
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
