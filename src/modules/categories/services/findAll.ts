import { db } from "@/lib/db";

export const findAll = async () => {
  const categories = await db.query.categories.findMany();

  return categories;
};
