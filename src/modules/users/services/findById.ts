import { eq } from "drizzle-orm";
import { db } from "@/lib/db";

// Schema
import { users } from "@/lib/db/schema";

export const findById = async (id: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
    with: {
      cart: true,
    },
  });

  return user;
};
