import { eq } from "drizzle-orm";
import { db } from "@/lib/db";

// Schema
import { products } from "@/lib/db/schema";

export const remove = async (id: string) => {
  const deletedProduct = await db
    .delete(products)
    .where(eq(products.id, id))
    .returning();

  return deletedProduct;
};
