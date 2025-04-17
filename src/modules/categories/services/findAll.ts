import { db } from "@/lib/db";

export const findAll = async () => {
  const categories = await db.query.categories.findMany({
    with: {
      products: true,
    },
  });

  return categories;
};
