import { db } from "@/lib/db";

export const findAll = async () => {
  const users = await db.query.users.findMany();

  return users;
};
