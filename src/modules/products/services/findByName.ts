import { eq } from "drizzle-orm";
import { db } from "@/lib/db";

// Schema
import { products } from "@/lib/db/schema";

export const findByName = async (name: string) => {
  const product = await db.query.products.findFirst({
    where: eq(products.name, name),
    with: {
      categories: true,
    },
  });

  return product;
};
