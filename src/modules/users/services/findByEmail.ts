import { eq } from "drizzle-orm";
import { db } from "@/lib/db";

// Schema
import { users } from "@/lib/db/schema";

export const findByEmail = async (email: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  return user;
};
