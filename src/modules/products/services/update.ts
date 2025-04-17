import { eq } from "drizzle-orm";
import { db } from "@/lib/db";

// Schema
import { products } from "@/lib/db/schema";

// DTOs
import { UpdateProductDTO } from "@/lib/validation/products";

export const update = async (id: string, changes: UpdateProductDTO["body"]) => {
  const [updatedProduct] = await db
    .update(products)
    .set({ ...changes })
    .where(eq(products.id, id))
    .returning();

  return updatedProduct;
};
