import { eq } from "drizzle-orm";
import { db } from "@/lib/db";

// Schema
import { categories } from "@/lib/db/schema";

export const findProducts = async (id: string) => {
  const category = await db.query.categories.findFirst({
    where: eq(categories.id, id),
    with: {
      products: true,
    },
  });

  return category;
};
