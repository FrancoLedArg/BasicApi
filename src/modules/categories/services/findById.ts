import { eq } from "drizzle-orm";
import { db } from "@/lib/db";

// Schema
import { categories } from "@/lib/db/schema";

export const findById = async (id: string) => {
  const category = await db.query.categories.findFirst({
    where: eq(categories.id, id),
    with: {
      products: {
        with: {
          product: true,
        },
      },
    },
  });

  if (!category) return undefined;

  return {
    ...category,
    products: category.products.map(({ product }) => product),
  };
};
